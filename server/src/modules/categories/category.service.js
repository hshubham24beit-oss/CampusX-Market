import Category from "./category.model.js";


export const createCategory = async(categoryData)=>{


    const existingCategory = await Category.findOne({
        name:categoryData.name
    });


    if(existingCategory){

        throw new Error(
            "Category already exists."
        );

    }


    const category = await Category.create(
        categoryData
    );


    return category;

};

export const getAllCategories = async()=>{

    const categories = await Category.find({
        isActive:true
    })
    .sort({
        name:1
    });


    return categories;

};

export const updateCategory = async(categoryId, updateData)=>{


    const category = await Category.findById(categoryId);


    if(!category){

        throw new Error("Category not found.");

    }


    const updatedCategory = await Category.findByIdAndUpdate(

        categoryId,

        updateData,

        {
            new:true,
            runValidators:true
        }

    );


    return updatedCategory;

};

export const deleteCategory = async(categoryId)=>{


    const category = await Category.findById(categoryId);


    if(!category){

        throw new Error("Category not found.");

    }


    await Category.findByIdAndDelete(categoryId);


    return true;

};