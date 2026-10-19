import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import { protect } from "./middleware/auth.middleware.js";
import productRoutes from "./modules/products/product.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";
import wishlistRoutes from "./modules/wishlist/wishlist.routes.js";
import chatRoutes from "./modules/chats/chat.routes.js";
import reviewRoutes from "./modules/reviews/review.routes.js";
import notificationRoutes from "./modules/notifications/notification.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import requestRoutes from "./modules/requests/request.routes.js";
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.resolve(__dirname, "../../client/dist");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/wishlist",wishlistRoutes);
app.use("/api/chats",chatRoutes);
app.use("/api/reviews",reviewRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/requests", requestRoutes);

// Test Route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CampusX Market Backend is Running Successfully!"
    });
});

app.get("/api/test-auth", protect, (req,res)=>{

    res.json({
        success:true,
        message:"You are authenticated!",
        user:req.user
    });

});

// Serve built React app (single-service deployment)
if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));

    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(clientDist, "index.html"));
    });
}

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// Global Error Handler
app.use((error, req, res, next) => {
    console.error("Unhandled error:", error);

    if (res.headersSent) {
        return next(error);
    }

    if (error.name === "MulterError") {
        return res.status(400).json({
            success: false,
            message:
                error.code === "LIMIT_FILE_SIZE"
                    ? "Image is too large. Maximum size is 5MB."
                    : error.message
        });
    }

    res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal server error."
    });
});

export default app;