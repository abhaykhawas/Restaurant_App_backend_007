const Order = require('../Models/Order');

// Creating order : Customer's side
const createOrder = async (req, res) => {
    try{
        const { items, totalAmount } = req.body

        const order = await Order.create({
            customer: req.user.id,
            items,
            totalAmount
        })

        res.status(201).json({
            success: true,
            message: order
        })

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Get my orders
const getMyOrders = async (req, res) => {
    try{
        const orders = await Order.find({customer: req.user.id}).populate("items.menuItem")

        return res.status(200).json({
            success: true,
            message: orders
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// tracking order
const trackOrders = async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.status(200).json({status: order.status})
}

// adminGetOrder
const adminGetOrder = async (req, res) => {
    const orders = await Order.find().populate("customer items.menuItem");
    res.status(200).json({
        orders
    })
}

// Updating status
const updateOrderStatus = async (req, res) => {
    const { status, comment } = req.body;

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {status, comment},
        { new: true }
    )

    res.status(200).json({success: true, order})
}


module.exports = { createOrder, getMyOrders, trackOrders, adminGetOrder, updateOrderStatus }