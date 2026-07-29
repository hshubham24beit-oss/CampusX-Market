import Notification from "./notification.model.js";


// Create notification
export const createNotification = async (
    receiverId,
    senderId,
    type,
    message,
    productId = null
) => {


    const notification = await Notification.create({

        receiver: receiverId,

        sender: senderId,

        type,

        message,

        relatedProduct: productId

    });


    return notification;

};




// Get user's notifications
export const getUserNotifications = async(userId)=>{


    const notifications = await Notification.find({

        receiver:userId

    })

    .populate(
        "sender",
        "fullName profileImage department year"
    )

    .populate(
        "relatedProduct",
        "title price images"
    )

    .sort({

        createdAt:-1

    });



    return notifications;

};





// Mark notification as read
export const markAsRead = async(
    notificationId,
    userId
)=>{


    const notification =
        await Notification.findById(
            notificationId
        );


    if(!notification){

        throw new Error(
            "Notification not found."
        );

    }



    // Security check

    if(
        notification.receiver.toString()
        !== userId
    ){

        throw new Error(
            "You cannot access this notification."
        );

    }



    notification.isRead = true;


    await notification.save();


    return notification;

};





// Delete notification
export const deleteNotification = async(
    notificationId,
    userId
)=>{


    const notification =
        await Notification.findById(
            notificationId
        );


    if(!notification){

        throw new Error(
            "Notification not found."
        );

    }



    if(
        notification.receiver.toString()
        !== userId
    ){

        throw new Error(
            "You cannot delete this notification."
        );

    }



    await Notification.findByIdAndDelete(
        notificationId
    );


    return notification;

};