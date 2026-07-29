import Wishlist from "./wishlist.model.js";
import Product from "../products/product.model.js";
import { createNotification } from "../notifications/notification.service.js";


// Add product to wishlist
export const addToWishlist = async (userId, productId) => {

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found.");
    }


    // Find user's wishlist
    let wishlist = await Wishlist.findOne({
        user:userId
    });


    // Create wishlist if not exists
    if (!wishlist) {

        wishlist = await Wishlist.create({
            user:userId,
            products:[
                productId
            ]
        });


        // Create notification for seller
        await createNotification(

            product.seller,

            userId,

            "wishlist",

            "Someone added your product to wishlist",

            product._id

        );


        return wishlist;
    }



    // Check duplicate product
    const alreadyAdded = wishlist.products.some(
        (product) =>
            product.toString() === productId
    );


    if(alreadyAdded){

        throw new Error(
            "Product already added to wishlist."
        );

    }



    // Add product
    wishlist.products.push(productId);


    await wishlist.save();



    // Create notification for seller
    await createNotification(

        product.seller,

        userId,

        "wishlist",

        "Someone added your product to wishlist",

        product._id

    );



    return wishlist;

};



// Get user's wishlist
export const getWishlist = async(userId)=>{


    const wishlist = await Wishlist.findOne({
        user:userId
    })
    .populate({
        path:"products",
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


    if(!wishlist){

        return {
            user:userId,
            products:[]
        };

    }


    return wishlist;

};




// Remove product from wishlist
export const removeFromWishlist = async(
    userId,
    productId
)=>{


    const wishlist = await Wishlist.findOne({
        user:userId
    });


    if(!wishlist){

        throw new Error(
            "Wishlist not found."
        );

    }


    wishlist.products =
        wishlist.products.filter(
            (product)=>
                product.toString() !== productId
        );


    await wishlist.save();


    return wishlist;

};




// Clear wishlist
export const clearWishlist = async(userId)=>{


    const wishlist = await Wishlist.findOne({
        user:userId
    });


    if(!wishlist){

        throw new Error(
            "Wishlist not found."
        );

    }


    wishlist.products = [];


    await wishlist.save();


    return wishlist;

};