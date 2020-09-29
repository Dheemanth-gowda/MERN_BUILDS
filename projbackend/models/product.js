const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        unique: true,
        maxlength: 32,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        unique: true,
        maxlength: 2000,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32,
    },
    category: {
        type: ObjectId,
        ref: "Catergory",
        required: true,
    },
    stock: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
});

module.export = mongoose.model("Product", productSchema);