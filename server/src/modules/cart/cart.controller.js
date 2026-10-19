import {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from "./cart.service.js";


// Add product to cart
export const addProductToCart = async (req, res) => {

    try {

        const cart = await addToCart(
            req.user.id,
            req.body.productId,
            req.body.quantity
        );


        res.status(201).json({
            success:true,
            message:"Product added to cart successfully",
            data:cart
        });


    } catch(error){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};



// Get user cart
export const getMyCart = async(req,res)=>{

    try{

        const cart = await getCart(
            req.user.id
        );


        res.status(200).json({
            success:true,
            data:cart
        });


    }catch(error){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};



// Update quantity of a cart item
export const updateProductQuantity = async(req,res)=>{

    try{

        const cart = await updateCartItem(
            req.user.id,
            req.params.productId,
            req.body.quantity
        );

        res.status(200).json({
            success:true,
            message:"Cart updated successfully",
            data:cart
        });

    }catch(error){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};



// Remove product from cart
export const removeProductFromCart = async(req,res)=>{

    try{

        const cart = await removeFromCart(
            req.user.id,
            req.params.productId
        );


        res.status(200).json({
            success:true,
            message:"Product removed from cart",
            data:cart
        });


    }catch(error){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};



// Clear cart
export const clearMyCart = async(req,res)=>{

    try{

        const cart = await clearCart(
            req.user.id
        );


        res.status(200).json({
            success:true,
            message:"Cart cleared successfully",
            data:cart
        });


    }catch(error){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};