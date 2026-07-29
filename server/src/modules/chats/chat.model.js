import mongoose from "mongoose";


// Message Schema
const messageSchema = new mongoose.Schema(
{
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    message:{
        type:String,
        required:true,
        trim:true
    },


    createdAt:{
        type:Date,
        default:Date.now
    }

});



// Chat Schema
const chatSchema = new mongoose.Schema(

{

    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ],


    messages:[
        messageSchema
    ]

},

{
    timestamps:true
}

);



const Chat = mongoose.model(
    "Chat",
    chatSchema
);


export default Chat;