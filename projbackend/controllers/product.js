const User = require("../models/user");
const Product = require("../models/product");

const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
    Product.find(id)
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(403).json({
                    error: "There was no product found",
                });
            }
            req.product = product;
            next();
        });
};

exports.createProducts = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Invalid file uploaded!!!",
            });
        }
        //TODO Restrict the fields

        let { name, description, price, category, stock } = fields;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ error: "All fields are compulsory" });
        }

        let product = new Product(fields);
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    Error: "File size too big!!!",
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        product.save().exec((err, product) => {
            if (err) {
                return res.status(403).json({
                    error: "Not able to create the products",
                });
            }
            res.status(200).json(product);
        });
    });
};