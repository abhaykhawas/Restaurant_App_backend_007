const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    items: [
        {
            menuItem: { type: mongoose.Schema.ObjectId, ref: "Menu" },
            quantity: { type: Number, default: 1 }
        }
    ],
    status: {
        type: String,
        enum : ["Pending", "Accepted", "Rejected", "Delivered", "Transit", "Refund"],
        default: 'Pending'
    },
    comment: String,
    totalAmount: Number
}, {timestamps: true})


module.exports = mongoose.model("Order", orderSchema)