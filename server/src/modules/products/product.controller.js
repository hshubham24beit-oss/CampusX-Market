import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "./product.service.js";

export const addProduct = async(req,res)=>{


    try{


        const product = await createProduct(
            req.body,
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


        const products = await getAllProducts();


        res.status(200).json({

            success:true,

            count:products.length,

            data:products

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

        const product = await updateProduct(

            req.params.id,

            req.user.id,

            req.body

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