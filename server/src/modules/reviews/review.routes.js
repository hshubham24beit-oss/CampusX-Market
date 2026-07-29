import express from "express";

import { protect } from "../../middleware/auth.middleware.js";

import {
    createReview,
    getReviews,
    editReview,
    removeReview
} from "./review.controller.js";


const router = express.Router();


// Add review
router.post(
    "/",
    protect,
    createReview
);


// Get reviews of a product
router.get(
    "/product/:productId",
    getReviews
);


// Update review
router.put(
    "/:reviewId",
    protect,
    editReview
);


// Delete review
router.delete(
    "/:reviewId",
    protect,
    removeReview
);


export default router;