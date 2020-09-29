const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signin = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User email Id doesnt exist",
            });
        }
        if (!user.autheticate(password)) {
            return res.status(401).json({
                error: "Email and password doesnt match",
            });
        }
        var token = jwt.sign({ _id: user.id }, process.env.SECRET);
        res.cookie("token", token, { expire: new Date() + 9999 }); //NOTE: Adding the token to the coockie of browser.
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });
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
    res.clearCookie("token");
    res.json({
        message: "User signed out successfully!!!",
    });
};

//NOTE: Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})