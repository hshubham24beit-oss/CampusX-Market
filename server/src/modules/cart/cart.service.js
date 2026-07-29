import Cart from "./cart.model.js";
import Product from "../products/product.model.js";


// Add product to cart
export const addToCart = async (userId, productId) => {

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found.");
    }


    // Check product availability
    if (product.status === "sold") {
        throw new Error("Product is already sold.");
    }


    // Find user's cart
    let cart = await Cart.findOne({
        user: userId
    });


    // Create cart if not exists
    if (!cart) {

        cart = await Cart.create({
            user: userId,
            items: [
                {
                    product: productId
                }
            ]
        });

        return cart;
    }


    // Check duplicate product
    const alreadyAdded = cart.items.some(
        (item) =>
            item.product.toString() === productId
    );


    if (alreadyAdded) {
        throw new Error("Product already added to cart.");
    }


    // Add product
    cart.items.push({
        product: productId
    });


    await cart.save();


    return cart;
};



// Get user cart
export const getCart = async (userId) => {

    const cart = await Cart.findOne({
        user:userId
    })
    .populate({
        path:"items.product",
        populate:[
            {
                path:"seller",
                select:"fullName department year profileImage"
            },
            {
                path:"category",
                select:"name"
            }
        ]
    });


    if (!cart) {

        return {
            user:userId,
            items:[]
        };

    }


    return cart;
};



// Remove product from cart
export const removeFromCart = async (
    userId,
    productId
) => {


    const cart = await Cart.findOne({
        user:userId
    });


    if (!cart) {
        throw new Error("Cart not found.");
    }


    cart.items = cart.items.filter(
        (item)=>
            item.product.toString() !== productId
    );


    await cart.save();


    return cart;
};



// Clear cart
export const clearCart = async(userId)=>{


    const cart = await Cart.findOne({
        user:userId
    });


    if(!cart){
        throw new Error("Cart not found.");
    }


    cart.items = [];


    await cart.save();


    return cart;

};