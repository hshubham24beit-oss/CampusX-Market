import Review from "./review.model.js";
import Product from "../products/product.model.js";
import { createNotification } from "../notifications/notification.service.js";

// Add review
export const addReview = async (
    userId,
    productId,
    rating,
    comment
) => {


    // Check product exists
    const product = await Product.findById(productId);


    if(!product){

        throw new Error(
            "Product not found."
        );

    }



    // Prevent seller from reviewing own product
    if(product.seller.toString() === userId){

        throw new Error(
            "You cannot review your own product."
        );

    }



    // Check existing review
    const existingReview = await Review.findOne({

        user:userId,

        product:productId

    });


    if(existingReview){

        throw new Error(
            "You already reviewed this product."
        );

    }



    const review = await Review.create({

        user:userId,

        product:productId,

        rating,

        comment

    });

    await createNotification(

    product.seller,

    userId,

    "review",

    `You received a ${rating} star review on your product`,

    product._id

);



    // Update seller rating

    const reviews = await Review.find({

        product:productId

    });


    const totalRatings = reviews.length;


    const averageRating =
        reviews.reduce(
            (sum,item)=>
                sum + item.rating,
            0
        ) / totalRatings;



    await Product.findByIdAndUpdate(

        productId,

        {
            averageRating:
            Number(averageRating.toFixed(1)),

            totalRatings

        }

    );



    return review;

};





// Get product reviews
export const getProductReviews = async(productId)=>{


    const reviews = await Review.find({

        product:productId

    })

    .populate(
        "user",
        "fullName department year profileImage"
    )

    .sort({
        createdAt:-1
    });



    return reviews;

};





// Update review
export const updateReview = async(
    reviewId,
    userId,
    updateData
)=>{


    const review = await Review.findById(reviewId);



    if(!review){

        throw new Error(
            "Review not found."
        );

    }



    // Only owner can update

    if(review.user.toString() !== userId){

        throw new Error(
            "You are not allowed to update this review."
        );

    }



    review.rating =
        updateData.rating ?? review.rating;


    review.comment =
        updateData.comment ?? review.comment;



    await review.save();



    return review;

};





// Delete review
export const deleteReview = async(
    reviewId,
    userId
)=>{


    const review = await Review.findById(reviewId);



    if(!review){

        throw new Error(
            "Review not found."
        );

    }



    // Only owner can delete

    if(review.user.toString() !== userId){

        throw new Error(
            "You are not allowed to delete this review."
        );

    }



    await Review.findByIdAndDelete(reviewId);



    return review;

};