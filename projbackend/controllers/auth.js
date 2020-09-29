const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.signin = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
    User.findOne({ email }, (err, user) => {
        if (err) {
            res.status(400).json({
                error: "User email Id doesnt exist",
            });
        }
        if (!user.autheticate(password)) {
            res.status(401).json({
                error: "Email and password doesnt match",
            });
        }
    });
};

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    } else {
        const user = new User(req.body);
        user.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    err: "NOT able to save user in DB",
                });
            }
            res.json({
                name: user.name,
                email: user.email,
                user_id: user._id,
            });
        });
    }
};

exports.signout = (req, res) => {
    res.json({
        message: "User signout",
    });
};