const express = require("express");

const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("product.product", "name price")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "There was an error in getting the orders",
                });
            }
            res.order = order;
            next();
        });
};

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save().exec((err, order) => {
        if (err) {
            return res.status(403).json({
                Error: "There is an error in placing the order!!!",
            });
        }
        res.json(order);
    });
};

exports.getAllOrder = (req, res) => {
    Order.find()
        .populate("user", "_id name ")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "There was an no order found in DB!!! ",
                });
            }
            res.json(order);
        });
};

exports.updateStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to update the order status values to database!!!",
                });
            }
            res.json(order);
        }
    );
};

exports.getOrderStatus = (req, res) => {
    //
    res.json(Order.schema.path("status").enumValues);
};