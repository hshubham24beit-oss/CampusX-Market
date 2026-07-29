import {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist
} from "./wishlist.service.js";


// Add product to wishlist
export const addProductToWishlist = async (req, res) => {

    try {

        const wishlist = await addToWishlist(
            req.user.id,
            req.body.productId
        );


        res.status(201).json({
            success:true,
            message:"Product added to wishlist successfully",
            data:wishlist
        });


    } catch(error) {

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};



// Get wishlist
export const getMyWishlist = async(req,res)=>{

    try {

        const wishlist = await getWishlist(
            req.user.id
        );


        res.status(200).json({
            success:true,
            data:wishlist
        });


    } catch(error) {

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};



// Remove product from wishlist
export const removeProductFromWishlist = async(req,res)=>{

    try {

        const wishlist = await removeFromWishlist(
            req.user.id,
            req.params.productId
        );


        res.status(200).json({
            success:true,
            message:"Product removed from wishlist",
            data:wishlist
        });


    } catch(error) {

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};



// Clear wishlist
export const clearMyWishlist = async(req,res)=>{

    try {

        const wishlist = await clearWishlist(
            req.user.id
        );


        res.status(200).json({
            success:true,
            message:"Wishlist cleared successfully",
            data:wishlist
        });


    } catch(error) {

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};