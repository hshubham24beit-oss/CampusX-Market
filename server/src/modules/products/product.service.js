import Product from "./product.model.js";


export const createProduct = async(productData,userId)=>{


    const product = await Product.create({

        ...productData,

        seller:userId

    });


    return product;

};

export const getAllProducts = async (query) => {

    const filter = {

        status: "available"

    };


    // Search by title or description

    if(query.search){

        filter.$or = [

            {
                title:{
                    $regex: query.search,
                    $options:"i"
                }
            },

            {
                description:{
                    $regex: query.search,
                    $options:"i"
                }
            }

        ];

    }

        // Filter by category

    if (query.category) {

        filter.category = query.category;

    }

        // Price Filter

    if (query.minPrice || query.maxPrice) {

        filter.price = {};

        if (query.minPrice) {
            filter.price.$gte = Number(query.minPrice);
        }

        if (query.maxPrice) {
            filter.price.$lte = Number(query.maxPrice);
        }

    }

        // Condition Filter

    if (query.condition) {

        filter.condition = query.condition;

    }

        let sortOption = {
        createdAt: -1
    };

    if (query.sort === "priceLow") {

        sortOption = {
            price: 1
        };

    }
    else if (query.sort === "priceHigh") {

        sortOption = {
            price: -1
        };

    }
    else if (query.sort === "latest") {

        sortOption = {
            createdAt: -1
        };

    }

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

const products = await Product.find(filter)

    .populate(
        "seller",
        "fullName email department year profileImage"
    )

    .populate(
        "category",
        "name description"
    )

    .sort(sortOption)

    .skip(skip)

    .limit(limit);

    const totalProducts = await Product.countDocuments(filter);

    const totalPages = Math.ceil(totalProducts / limit);


    return {

    products,

    page,

    limit,

    totalPages,

    totalProducts

};
};

export const getProductById = async (productId) => {

        const product = await Product.findById(productId)
        .populate(
            "seller",
            "fullName email department year profileImage"
        )
        .populate(
            "category",
            "name description"
        );


    if (!product) {
        throw new Error("Product not found.");
    }


    return product;

};


export const updateProduct = async (
    productId,
    userId,
    updateData
) => {

    const product = await Product.findById(productId);


    if (!product) {
        throw new Error("Product not found.");
    }


    // Check if logged-in user is the seller
    if (product.seller.toString() !== userId) {

        throw new Error(
            "You are not allowed to update this product."
        );

    }


    const updatedProduct = await Product.findByIdAndUpdate(

        productId,

        updateData,

        {
            new: true,
            runValidators: true
        }

    );


    return updatedProduct;

};

export const deleteProduct = async (productId, userId) => {

    const product = await Product.findById(productId);


    if (!product) {
        throw new Error("Product not found.");
    }


    // Check ownership
    if (product.seller.toString() !== userId) {

        throw new Error(
            "You are not allowed to delete this product."
        );

    }


    await Product.findByIdAndDelete(productId);


    return true;

};