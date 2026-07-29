import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(

{

    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },


    price:{
        type:Number,
        required:true
    },


    status:{
        type:String,
        enum:[
            "pending",
            "accepted",
            "completed",
            "cancelled"
        ],
        default:"pending"
    },


    paymentStatus:{
        type:String,
        enum:[
            "pending",
            "paid",
            "failed"
        ],
        default:"pending"
    },


    deliveryDetails:{
        address:{
            type:String,
            default:""
        },

        phone:{
            type:String,
            default:""
        }
    }

},

{
    timestamps:true
}

);


const Order = mongoose.model(
    "Order",
    orderSchema
);


export default Order;