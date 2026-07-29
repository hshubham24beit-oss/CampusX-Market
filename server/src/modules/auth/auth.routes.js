import express from "express";
import { register, login } from "./auth.controller.js";
import { registerValidation } from "../../validators/auth.validator.js";

const router = express.Router();

router.post("/register", registerValidation, register);

router.post("/login", login);

export default router;