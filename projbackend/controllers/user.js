var User = require("../models/user");

var Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.json({
                error: "Enable to get the user from the database!!!",
            });
        }
        req.profile = user;
        next();
    });
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err || !users) {
            return res.send(400).json({
                err: "Users data cannot be fetched!!!",
            });
        }

        return res.status(200).json({
            Users: users,
        });
    });
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to update this user",
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    );
};

//@note Push the product to order list

exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("User", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "There is no order in this account!!!",
                });
            }
            return res.status(200).json(order);
        });
};

//@note push to purchases in user.

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.Order.products.forEach((product) => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.Order.amount,
            transaction_id: req.body.Order.transaction_id,
        });
    });
    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { purchases: purchases } }, { new: true },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "There is an error to save purchase List",
                });
            }
            next();
        }
    );
};

//NOTE: Store it in database

exports.getUser = (req, res) => {
    //NOTE: Need to look into the password stuff
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
};