import express from "express";
import {
    register,
    login,
    verifyEmail
} from "./auth.controller.js";
import { registerValidation } from "../../validators/auth.validator.js";
import sendEmail from "../../utils/sendEmail.js";

const router = express.Router();

router.post("/register", registerValidation, register);

router.post("/login", login);

router.post("/verify-email", verifyEmail);

router.post("/test-email", async (req, res) => {

    try {

        await sendEmail({

            to: process.env.EMAIL_USER,

            subject: "CampusX Market Test",

            html: `
                <h2>Email Working Successfully 🎉</h2>
                <p>If you received this email, Nodemailer is configured correctly.</p>
            `

        });

        res.json({

            success: true,

            message: "Test email sent successfully."

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

export default router;