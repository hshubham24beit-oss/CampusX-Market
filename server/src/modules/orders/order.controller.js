import {
    createOrder,
    getBuyerOrders,
    getSellerOrders,
    updateOrderStatus,
    getOrderById
} from "./order.service.js";



// Create new order
export const placeOrder = async(req,res)=>{

    try{

        const order = await createOrder(

            req.user.id,

            req.body.productId,

            req.body.deliveryDetails

        );


        res.status(201).json({

            success:true,

            message:"Order created successfully",

            data:order

        });


    }catch(error){

        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};





// Get buyer orders
export const getMyOrders = async(req,res)=>{

    try{


        const orders = await getBuyerOrders(

            req.user.id

        );


        res.status(200).json({

            success:true,

            data:orders

        });


    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};





// Get seller orders
export const getReceivedOrders = async(req,res)=>{

    try{


        const orders = await getSellerOrders(

            req.user.id

        );


        res.status(200).json({

            success:true,

            data:orders

        });


    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};





// Update order status
export const changeOrderStatus = async(req,res)=>{

    try{


        const order = await updateOrderStatus(

            req.params.orderId,

            req.user.id,

            req.body.status

        );


        res.status(200).json({

            success:true,

            message:"Order status updated successfully",

            data:order

        });


    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};





// Get single order
export const getSingleOrder = async(req,res)=>{

    try{


        const order = await getOrderById(

            req.params.orderId,

            req.user.id

        );


        res.status(200).json({

            success:true,

            data:order

        });


    }catch(error){


        res.status(400).json({

            success:false,

            message:error.message

        });

    }

};