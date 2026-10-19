import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../users/user.model.js";
import sendEmail from "../../utils/sendEmail.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const DEPARTMENTS = [
  "CE",
  "IT",
  "AIDS",
  "AIML",
  "EXTC",
  "ME",
  "CIVIL",
  "EE",
  "MCA",
  "MBA",
  "OTHER",
];

const YEARS = ["FY", "SY", "TY", "Final"];

const signToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

const toSafeUser = (user) => {
  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse.verificationOTP;
  delete userResponse.verificationOTPExpires;
  return userResponse;
};

export const registerUser = async (userData) => {
  const {
    fullName,
    email,
    password,
    department,
    year,
    phone,
  } = userData;

  if (!fullName || !email || !password || !department || !year) {
    throw new Error("All fields are required.");
  }

  const normalizedEmail = String(email).toLowerCase().trim();

  if (!normalizedEmail.endsWith("@student.mes.ac.in")) {
    throw new Error("Only college students can register.");
  }

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email: normalizedEmail,
    password: hashedPassword,
    department,
    year,
    phone,
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  return userResponse;
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and Password are required.");
  }

  const normalizedEmail = String(email).toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw new Error("Invalid Email or Password.");
  }

  if (user.isBlocked) {
    throw new Error("Your account has been blocked.");
  }

  if (user.authProvider === "google" && !user.password) {
    throw new Error("Please login with Google.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    if (user.authProvider === "google") {
      throw new Error(
        "This account was created with Google. Use Continue with Google, or reset your password with Forgot Password."
      );
    }

    throw new Error("Invalid Email or Password.");
  }

  return {
    user: toSafeUser(user),
    token: signToken(user),
  };
};

const GENERIC_RESET_MESSAGE =
  "If an account with that email exists, a password reset link has been sent.";

export const forgotPassword = async (email) => {
  if (!email) {
    throw new Error("Email is required.");
  }

  const user = await User.findOne({
    email: String(email).toLowerCase().trim(),
  });

  if (!user) {
    return { message: GENERIC_RESET_MESSAGE };
  }

  const rawToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");
  user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const resetUrl = `${clientUrl}/reset-password/${rawToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "CampusX Market - Reset Your Password",
      html: `
        <h2>Reset your CampusX Market password</h2>
        <p>Click the link below to choose a new password. This link expires in 15 minutes.</p>
        <p><a href="${resetUrl}">Reset Password</a></p>
        <p>If you did not request this, you can safely ignore this email.</p>
      `,
    });
  } catch (error) {
    console.error("Password reset email failed:", error.message);

    if (process.env.NODE_ENV !== "production") {
      console.log("Password reset URL:", resetUrl);
    }
  }

  return { message: GENERIC_RESET_MESSAGE };
};

export const resetPassword = async (token, password) => {
  if (!token || !password) {
    throw new Error("Reset token and new password are required.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new Error("This reset link is invalid or has expired.");
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  user.isVerified = true;

  await user.save();

  return { message: "Password reset successfully. You can now log in." };
};

export const googleLogin = async ({ token, department, year }) => {
  if (!token) {
    throw new Error("Google credential is required.");
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("Google login is not configured on the server.");
  }

  let payload;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    payload = ticket.getPayload();
  } catch (error) {
    throw new Error("Invalid or expired Google credential.");
  }

  if (!payload?.email) {
    throw new Error("Google account does not contain an email.");
  }

  if (!payload.email_verified) {
    throw new Error("Your Google email is not verified.");
  }

  const email = payload.email.toLowerCase();

  if (!email.endsWith("@student.mes.ac.in")) {
    throw new Error("Please use your official college Google account.");
  }

  let user = await User.findOne({ email });

  if (user) {
    if (user.isBlocked) {
      throw new Error("Your account has been blocked.");
    }

    if (!user.googleId) {
      user.googleId = payload.sub;
    }

    if (!user.profileImage && payload.picture) {
      user.profileImage = payload.picture;
    }

    user.isVerified = true;

    await user.save();
  } else {
    const randomPassword = await bcrypt.hash(
      crypto.randomBytes(32).toString("hex"),
      10
    );

    user = await User.create({
      fullName: payload.name || email.split("@")[0],
      email,
      password: randomPassword,
      department: DEPARTMENTS.includes(department) ? department : "OTHER",
      year: YEARS.includes(year) ? year : "FY",
      profileImage: payload.picture || "",
      googleId: payload.sub,
      authProvider: "google",
      isVerified: true,
    });
  }

  return {
    user: toSafeUser(user),
    token: signToken(user),
  };
};


