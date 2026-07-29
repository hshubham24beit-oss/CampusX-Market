import Order from "./order.model.js";
import Product from "../products/product.model.js";
import { createNotification } from "../notifications/notification.service.js";


// Create Order
export const createOrder = async (
    buyerId,
    productId,
    deliveryDetails
) => {


    // Check product exists
    const product = await Product.findById(productId);


    if(!product){

        throw new Error(
            "Product not found."
        );

    }



    // Check product availability

    if(product.status === "sold"){

        throw new Error(
            "Product is already sold."
        );

    }



    // Prevent buying own product

    if(product.seller.toString() === buyerId){

        throw new Error(
            "You cannot buy your own product."
        );

    }



    const order = await Order.create({

        buyer:buyerId,

        seller:product.seller,

        product:product._id,

        price:product.price,

        deliveryDetails

    });

    await createNotification(

    product.seller,

    buyerId,

    "product",

    "You received a new order request",

    product._id

    );



    return order;

};





// Get buyer orders
export const getBuyerOrders = async(
    buyerId
)=>{


    const orders = await Order.find({

        buyer:buyerId

    })

    .populate(
        "product",
        "title price images"
    )

    .populate(
        "seller",
        "fullName department year profileImage"
    )

    .sort({
        createdAt:-1
    });



    return orders;

};





// Get seller orders
export const getSellerOrders = async(
    sellerId
)=>{


    const orders = await Order.find({

        seller:sellerId

    })

    .populate(
        "product",
        "title price images"
    )

    .populate(
        "buyer",
        "fullName department year profileImage"
    )

    .sort({
        createdAt:-1
    });



    return orders;

};





// Update order status
export const updateOrderStatus = async(
    orderId,
    sellerId,
    status
)=>{


    const order = await Order.findById(orderId);


    if(!order){

        throw new Error(
            "Order not found."
        );

    }



    // Only seller can update

    if(order.seller.toString() !== sellerId){

        throw new Error(
            "You are not allowed to update this order."
        );

    }



    order.status = status;


    await order.save();



    // If completed mark product sold

    if(status === "completed"){

        await Product.findByIdAndUpdate(

            order.product,

            {
                status:"sold"
            }

        );

    }



    return order;

};





// Get single order
export const getOrderById = async(
    orderId,
    userId
)=>{


    const order = await Order.findById(orderId)

    .populate(
        "product",
        "title price images"
    )

    .populate(
        "buyer",
        "fullName department year"
    )

    .populate(
        "seller",
        "fullName department year"
    );



    if(!order){

        throw new Error(
            "Order not found."
        );

    }



    // Buyer or seller can view

    if(
        order.buyer._id.toString() !== userId &&
        order.seller._id.toString() !== userId
    ){

        throw new Error(
            "You cannot access this order."
        );

    }



    return order;

};