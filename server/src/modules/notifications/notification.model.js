import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema(

{

    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },


    type:{
        type:String,
        enum:[
            "message",
            "wishlist",
            "review",
            "product",
            "system"
        ],
        required:true
    },


    message:{
        type:String,
        required:true,
        trim:true
    },


    relatedProduct:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        default:null
    },


    isRead:{
        type:Boolean,
        default:false
    }

},

{
    timestamps:true
}

);


const Notification = mongoose.model(
    "Notification",
    notificationSchema
);


export default Notification;