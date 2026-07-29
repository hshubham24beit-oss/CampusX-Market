import {
    createChat,
    getUserChats,
    getChatById,
    sendMessage
} from "./chat.service.js";



// Create or get chat
export const createNewChat = async(req,res)=>{

    try{

        const chat = await createChat(
            req.user.id,
            req.body.userId
        );


        res.status(201).json({

            success:true,

            message:"Chat created successfully",

            data:chat

        });


    }catch(error){

        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};




// Get all user chats
export const getMyChats = async(req,res)=>{

    try{


        const chats = await getUserChats(
            req.user.id
        );


        res.status(200).json({

            success:true,

            data:chats

        });



    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};




// Get single chat
export const getSingleChat = async(req,res)=>{

    try{


        const chat = await getChatById(

            req.params.chatId,

            req.user.id

        );


        res.status(200).json({

            success:true,

            data:chat

        });



    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};




// Send message
export const sendNewMessage = async(req,res)=>{

    try{


        const chat = await sendMessage(

            req.params.chatId,

            req.user.id,

            req.body.message

        );


        res.status(201).json({

            success:true,

            message:"Message sent successfully",

            data:chat

        });



    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};