import {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview
} from "./review.service.js";



// Add review
export const createReview = async(req,res)=>{

    try{


        const review = await addReview(

            req.user.id,

            req.body.productId,

            req.body.rating,

            req.body.comment

        );


        res.status(201).json({

            success:true,

            message:"Review added successfully",

            data:review

        });



    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};





// Get product reviews
export const getReviews = async(req,res)=>{

    try{


        const reviews = await getProductReviews(

            req.params.productId

        );


        res.status(200).json({

            success:true,

            data:reviews

        });



    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};





// Update review
export const editReview = async(req,res)=>{

    try{


        const review = await updateReview(

            req.params.reviewId,

            req.user.id,

            req.body

        );


        res.status(200).json({

            success:true,

            message:"Review updated successfully",

            data:review

        });



    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};





// Delete review
export const removeReview = async(req,res)=>{

    try{


        const review = await deleteReview(

            req.params.reviewId,

            req.user.id

        );


        res.status(200).json({

            success:true,

            message:"Review deleted successfully",

            data:review

        });



    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};