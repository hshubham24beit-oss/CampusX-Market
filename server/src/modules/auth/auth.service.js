import bcrypt from "bcryptjs";
import User from "../users/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js";

export const registerUser = async (userData) => {
  const {
    fullName,
    email,
    password,
    department,
    year,
    phone,
  } = userData;

  // Check required fields
  if (!fullName || !email || !password || !department || !year) {
    throw new Error("All required fields must be filled.");
  }

  // Validate college email
  if (!email.endsWith("@student.mes.ac.in")) {
    throw new Error("Please use your official college email.");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

    // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // OTP expires in 10 minutes
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  // Create user
  const user = await User.create({
  fullName,
  email,
  password: hashedPassword,
  department,
  year,
  phone,

  verificationOTP: otp,
  verificationOTPExpires: otpExpiry,

  isVerified: false,
  });

    await sendEmail({

    to: email,

    subject: "CampusX Market - Email Verification",

    html: `
      <h2>Welcome to CampusX Market 🎉</h2>

      <p>Your email verification OTP is:</p>

      <h1 style="letter-spacing:5px;">${otp}</h1>

      <p>This OTP is valid for <strong>10 minutes</strong>.</p>

      <p>If you didn't create this account, you can ignore this email.</p>
    `

  });

  // Don't return password
  const userResponse = user.toObject();
  delete userResponse.password;

    return {

    message: "Registration successful. Please verify your email.",

    email: user.email

  };
};

export const loginUser = async (email, password) => {

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }


  const user = await User.findOne({ email });


  if (!user) {
    throw new Error("Invalid email or password.");
  }


  if (user.isBlocked) {
    throw new Error("Your account has been blocked.");
  }

    if (!user.isVerified) {
      throw new Error(
          "Please verify your college email before logging in."
      );
  }


  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );


  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password.");
  }


  const token = jwt.sign(

    {
      id: user._id,
      email: user.email,
      role: user.role
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d"
    }

  );


  const userResponse = user.toObject();

  delete userResponse.password;


  return {
    user: userResponse,
    token
  };

};


export const verifyEmailOTP = async (email, otp) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.isVerified) {
        throw new Error("Email is already verified.");
    }

    if (user.verificationOTP !== otp) {
        throw new Error("Invalid OTP.");
    }

    if (new Date() > user.verificationOTPExpires) {
        throw new Error("OTP has expired.");
    }

    user.isVerified = true;
    user.verificationOTP = null;
    user.verificationOTPExpires = null;

    await user.save();

    return {
        message: "Email verified successfully."
    };

};