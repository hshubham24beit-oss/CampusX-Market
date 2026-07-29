import express from "express";

import { protect } from "../../middleware/auth.middleware.js";

import {
    placeOrder,
    getMyOrders,
    getReceivedOrders,
    changeOrderStatus,
    getSingleOrder
} from "./order.controller.js";


const router = express.Router();


// Create order
router.post(
    "/",
    protect,
    placeOrder
);


// Buyer orders
router.get(
    "/my-orders",
    protect,
    getMyOrders
);


// Seller received orders
router.get(
    "/seller",
    protect,
    getReceivedOrders
);


// Get single order
router.get(
    "/:orderId",
    protect,
    getSingleOrder
);


// Update order status
router.put(
    "/:orderId/status",
    protect,
    changeOrderStatus
);


export default router;