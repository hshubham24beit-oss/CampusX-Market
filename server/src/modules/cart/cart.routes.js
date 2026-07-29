import express from "express";

import { protect } from "../../middleware/auth.middleware.js";

import {
    addProductToCart,
    getMyCart,
    removeProductFromCart,
    clearMyCart
} from "./cart.controller.js";


const router = express.Router();


// Add product to cart
router.post(
    "/",
    protect,
    addProductToCart
);


// Get logged-in user's cart
router.get(
    "/",
    protect,
    getMyCart
);


// Remove product from cart
router.delete(
    "/:productId",
    protect,
    removeProductFromCart
);


// Clear complete cart
router.delete(
    "/",
    protect,
    clearMyCart
);


export default router;