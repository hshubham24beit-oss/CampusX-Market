import express from "express";
import {
    addProduct,
    getProducts,
    getSingleProduct,
    editProduct,
    removeProduct
} from "./product.controller.js";
import { protect } from "../../middleware/auth.middleware.js";


const router = express.Router();
router.delete(
    "/:id",
    protect,
    removeProduct
);

router.put(
    "/:id",
    protect,
    editProduct
);

router.get(
    "/:id",
    getSingleProduct
);

router.get(
    "/",
    getProducts
);

router.post(
    "/",
    protect,
    addProduct
);


export default router;