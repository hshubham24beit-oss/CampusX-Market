import {
    getUserNotifications,
    markAsRead,
    deleteNotification
} from "./notification.service.js";



// Get my notifications
export const getMyNotifications = async(req,res)=>{

    try{


        const notifications =
            await getUserNotifications(
                req.user.id
            );


        res.status(200).json({

            success:true,

            data:notifications

        });



    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};





// Mark notification as read
export const readNotification = async(req,res)=>{

    try{


        const notification =
            await markAsRead(

                req.params.notificationId,

                req.user.id

            );


        res.status(200).json({

            success:true,

            message:"Notification marked as read",

            data:notification

        });



    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};





// Delete notification
export const removeNotification = async(req,res)=>{

    try{


        const notification =
            await deleteNotification(

                req.params.notificationId,

                req.user.id

            );


        res.status(200).json({

            success:true,

            message:"Notification deleted successfully",

            data:notification

        });



    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};