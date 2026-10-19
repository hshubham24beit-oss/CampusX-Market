import { validationResult } from "express-validator";
import {
    registerUser,
    loginUser,
    googleLogin,
    forgotPassword,
    resetPassword
} from "./auth.service.js";

export const register = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    try {

        const user = await registerUser(req.body);
            return res.status(201).json({
                success: true,
                message: "Registration Successful",
                user,
            });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      data: result,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const forgotPasswordRequest = async (req, res) => {
  try {
    const result = await forgotPassword(req.body.email);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPasswordRequest = async (req, res) => {
  try {
    const result = await resetPassword(req.body.token, req.body.password);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const googleAuth = async (req, res) => {
  const { token, department, year } = req.body;

  try {
    const result = await googleLogin({ token, department, year });

    return res.status(200).json({
      success: true,
      message: "Google Login Successful",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// export const verifyEmail = async (req, res) => {

//     const { email, otp } = req.body;

//     try {

//         const result = await verifyEmailOTP(email, otp);

//         return res.status(200).json({

//             success: true,

//             message: result.message

//         });

//     } catch (error) {

//         return res.status(400).json({

//             success: false,

//             message: error.message

//         });

//     }

// };

