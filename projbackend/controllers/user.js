var User = require("../models/user");
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

exports.getUser = (req, res) => {
    //NOTE: Need to look into the password stuff
    return res.json(req.profile);
};