import express from "express";
import {
    addCategory,
    getCategories,
    editCategory,
    removeCategory
} from "./category.controller.js";
import { protect, adminOnly } from "../../middleware/auth.middleware.js";


const router = express.Router();

router.delete(
    "/:id",
    protect,
    adminOnly,
    removeCategory
);

router.put(
    "/:id",
    protect,
    adminOnly,
    editCategory
);

router.get(
    "/",
    getCategories
);


router.post(
    "/",
    protect,
    adminOnly,
    addCategory
);


export default router;