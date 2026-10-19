import "dotenv/config";
import mongoose from "mongoose";
import Category from "../modules/categories/category.model.js";

const categories = [
    {
        name: "Books",
        description: "Academic books, novels, and reference material."
    },
    {
        name: "Electronics",
        description: "Laptops, phones, accessories, and gadgets."
    },
    {
        name: "Fashion",
        description: "Clothing, footwear, and accessories."
    },
    {
        name: "Furniture",
        description: "Hostel and study furniture."
    },
    {
        name: "Notes",
        description: "Handwritten notes and study material."
    },
    {
        name: "Sports",
        description: "Sports and fitness equipment."
    },
    {
        name: "Stationery",
        description: "Pens, notebooks, and desk supplies."
    },
    {
        name: "Others",
        description: "Everything that does not fit another category."
    }
];

const seedCategories = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from server/.env");
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        for (const category of categories) {
            await Category.updateOne(
                { name: category.name },
                { $setOnInsert: category },
                { upsert: true }
            );
        }

        console.log(`Seeded ${categories.length} categories.`);
    } catch (error) {
        console.error("Category seed failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seedCategories();
