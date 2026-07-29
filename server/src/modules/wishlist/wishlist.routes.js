import express from "express";

import { protect } from "../../middleware/auth.middleware.js";

import {
    addProductToWishlist,
    getMyWishlist,
    removeProductFromWishlist,
    clearMyWishlist
} from "./wishlist.controller.js";


const router = express.Router();


// Add product to wishlist
router.post(
    "/",
    protect,
    addProductToWishlist
);


// Get logged-in user's wishlist
router.get(
    "/",
    protect,
    getMyWishlist
);


// Remove product from wishlist
router.delete(
    "/:productId",
    protect,
    removeProductFromWishlist
);


// Clear complete wishlist
router.delete(
    "/",
    protect,
    clearMyWishlist
);


export default router;