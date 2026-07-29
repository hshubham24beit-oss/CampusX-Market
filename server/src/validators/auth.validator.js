import { body } from "express-validator";

export const registerValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .custom((email) => {
      if (!email.endsWith("@student.mes.ac.in")) {
        throw new Error("Use your official college email");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("department")
    .notEmpty()
    .withMessage("Department is required"),

  body("year")
    .notEmpty()
    .withMessage("Year is required"),
];