var User = require("../models/user");
const user = require("../models/user");
// const { findById } = require("../models/user");

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

exports.getUser = (req, res) => {
    //NOTE: Need to look into the password stuff
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
};