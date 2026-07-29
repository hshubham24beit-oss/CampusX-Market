import express from "express";
import {
    addCategory,
    getCategories,
    editCategory,
    removeCategory
} from "./category.controller.js";


const router = express.Router();
router.delete(
    "/:id",
    removeCategory
);

router.put(
    "/:id",
    editCategory
);

router.get(
    "/",
    getCategories
);


router.post(
    "/",
    addCategory
);


export default router;