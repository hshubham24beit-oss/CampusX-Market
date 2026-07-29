import {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
} from "./category.service.js";


export const addCategory = async(req,res)=>{


    try{


        const category = await createCategory(
            req.body
        );


        res.status(201).json({

            success:true,

            message:"Category created successfully",

            data:category

        });


    }
    catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};

export const getCategories = async(req,res)=>{

    try{

        const categories = await getAllCategories();


        res.status(200).json({

            success:true,

            count:categories.length,

            data:categories

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const editCategory = async(req,res)=>{


    try{


        const category = await updateCategory(

            req.params.id,

            req.body

        );


        res.status(200).json({

            success:true,

            message:"Category updated successfully",

            data:category

        });


    }
    catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });

    }


};

export const removeCategory = async(req,res)=>{


    try{


        await deleteCategory(
            req.params.id
        );


        res.status(200).json({

            success:true,

            message:"Category deleted successfully"

        });


    }
    catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};