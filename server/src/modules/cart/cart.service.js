import Cart from "./cart.model.js";
import Product from "../products/product.model.js";


// Add product to cart
export const addToCart = async (userId, productId, quantity = 1) => {

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found.");
    }


    // Check product availability
    if (product.status !== "available") {
        throw new Error("Product is not available.");
    }


    const qty = Math.max(Number(quantity) || 1, 1);

    if (qty > (product.quantity || 1)) {
        throw new Error("Requested quantity is not available.");
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
                    product: productId,
                    quantity: qty
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
        product: productId,
        quantity: qty
    });


    await cart.save();


    return cart;
};



// Update item quantity
export const updateCartItem = async (userId, productId, quantity) => {

    const qty = Number(quantity);

    if (!Number.isInteger(qty) || qty < 1) {
        throw new Error("Quantity must be a positive number.");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found.");
    }

    if (qty > (product.quantity || 1)) {
        throw new Error("Requested quantity is not available.");
    }

    const cart = await Cart.findOne({
        user: userId
    });

    if (!cart) {
        throw new Error("Cart not found.");
    }

    const item = cart.items.find(
        (entry) => entry.product.toString() === productId
    );

    if (!item) {
        throw new Error("Product is not in your cart.");
    }

    item.quantity = qty;

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