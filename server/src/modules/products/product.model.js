import mongoose from "mongoose";


const productSchema = new mongoose.Schema(

{
    title:{
        type:String,
        required:true,
        trim:true
    },


    description:{
        type:String,
        required:true,
        trim:true
    },


    price:{
        type:Number,
        required:true
    },


    category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true
    },


    condition:{
        type:String,
        enum:[
            "New",
            "Like New",
            "Good",
            "Used"
        ],
        default:"Good"
    },


    images:{
        type:[String],
        default:[]
    },


    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    status:{
        type:String,
        enum:[
            "available",
            "sold"
        ],
        default:"available"
    }

},

{
    timestamps:true
}

);


const Product = mongoose.model(
    "Product",
    productSchema
);


export default Product;