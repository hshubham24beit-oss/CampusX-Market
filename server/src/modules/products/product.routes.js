import express from "express";
import {
    addProduct,
    getProducts,
    getSingleProduct,
    editProduct,
    removeProduct
} from "./product.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import upload from "../../middleware/upload.middleware.js";


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

router.put(
    "/:id",
    protect,
    upload.array("images",5),
    editProduct
);


export default router;