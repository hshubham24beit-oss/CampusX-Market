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
            "Fair"
        ],
        default:"Good"
    },


    images:{
        type:[String],
        default:[]
    },


    quantity:{
        type:Number,
        default:1,
        min:1
    },


    pickupLocation:{
        type:String,
        trim:true,
        default:""
    },


    pickupInstructions:{
        type:String,
        trim:true,
        default:""
    },


    views:{
        type:Number,
        default:0
    },


    averageRating:{
        type:Number,
        default:0,
        min:0,
        max:5
    },


    totalRatings:{
        type:Number,
        default:0
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
            "reserved",
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