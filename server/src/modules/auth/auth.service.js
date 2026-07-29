import bcrypt from "bcryptjs";
import User from "../users/user.model.js";
import jwt from "jsonwebtoken";

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

  // Create user
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    department,
    year,
    phone,
  });

  // Don't return password
  const userResponse = user.toObject();
  delete userResponse.password;

  return userResponse;
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