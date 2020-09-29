const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const ProductCartSchema = new Schema({
    product: { type: { ObjectId }, ref: "Product" },
    name: String,
    count: Number,
    price: Number,
    size: Number,
    color: String,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const orderSchema = new Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
        type: Number,
        required: true,
    },
    address: { type: String },
    updated: {
        type: Date,
    },
    User: {
        type: { ObjectId },
        ref: "User",
    },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductCart };