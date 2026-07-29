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

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
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

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 CampusX Market Backend is Running Successfully!"
    });
});

app.get("/api/test-auth", protect, (req,res)=>{

    res.json({
        success:true,
        message:"You are authenticated!",
        user:req.user
    });

});

export default app;