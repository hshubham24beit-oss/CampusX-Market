import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct as updateProductService,
    deleteProduct
} from "./product.service.js";
import uploadToCloudinary from "../../utils/uploadToCloudinary.js";


export const addProduct = async(req,res)=>{


    try{


        let imageUrls = [];


        // Upload images to Cloudinary

        if(req.files && req.files.length > 0){


            for(const file of req.files){


                const url = await uploadToCloudinary(
                    file.buffer
                );


                imageUrls.push(url);


            }

        }



        const product = await createProduct(

            {
                ...req.body,

                images:imageUrls
            },

            req.user.id

        );



        res.status(201).json({

            success:true,

            message:"Product added successfully",

            data:product

        });


    }
    catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }


};

export const getProducts = async(req,res)=>{

    try{


        const result = await getAllProducts(req.query);

        res.status(200).json({

    success: true,

    count: result.products.length,

    page: result.page,

    limit: result.limit,

    totalPages: result.totalPages,

    totalProducts: result.totalProducts,

    data: result.products

    });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const getSingleProduct = async(req,res)=>{

    try{

        const product = await getProductById(
            req.params.id
        );


        res.status(200).json({

            success:true,

            data:product

        });


    }
    catch(error){

        res.status(404).json({

            success:false,

            message:error.message

        });

    }

};

export const editProduct = async(req,res)=>{

    try{


        let imageUrls = [];


        // Upload new images if provided

        if(req.files && req.files.length > 0){


            for(const file of req.files){


                const url = await uploadToCloudinary(
                    file.buffer
                );


                imageUrls.push(url);

            }

        }



        const updateData = {


            ...req.body

        };



        // Add images only when new images are uploaded

        if(imageUrls.length > 0){

            updateData.images = imageUrls;

        }



        const product = await updateProductService(

            req.params.id,

            req.user.id,

            updateData

        );



        res.status(200).json({

            success:true,

            message:"Product updated successfully",

            data:product

        });


    }
    catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};

export const removeProduct = async(req,res)=>{

    try{


        await deleteProduct(

            req.params.id,

            req.user.id

        );


        res.status(200).json({

            success:true,

            message:"Product deleted successfully"

        });


    }
    catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};