import Product from "./product.model.js";


export const createProduct = async(productData,userId)=>{


    const product = await Product.create({

        ...productData,

        seller:userId

    });


    return product;

};

export const getAllProducts = async () => {

            const products = await Product.find({
            status:"available"
        })
        .populate(
            "seller",
            "fullName email department year profileImage"
        )
        .populate(
            "category",
            "name description"
        )
        .sort({
            createdAt:-1
        });


    return products;

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