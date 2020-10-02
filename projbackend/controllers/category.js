var User = require("../models/user");

var Order = require("../models/order");

var Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
    //find the category
    Category.findById(id).exec((err, cate) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Enable to get the category from the database!!!",
            });
        }
        req.category = cate;
        next();
    });
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save category in Data base",
            });
        }
        res.json({ category });
    });
};

exports.getCategory = (req, res) => {
    return res.status(200).json(req.category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(403).json({
                Error: "There are no categories found in database",
            });
        }
        res.json(categories);
    });
};