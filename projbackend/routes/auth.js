var express = require("express");
var router = express.Router();
const { signup, signout, signin, isSignedIn } = require("../controllers/auth");
const { body, validationResult } = require("express-validator");
const { check } = require("express-validator");

router.post(
    "/signup", [
        check("name").isLength({ min: 3 }),
        check("email", "Enter a valid email Id").isEmail(),
        check("password", "The password must be 5+ chars long and contain a number")
        .not()
        .isIn(["123", "password", "god"])
        .withMessage("Do not use a common word as the password")
        .isLength({ min: 5 })
        .matches(/\d/),
    ],
    signup
);

router.post(
    "/signin", [
        check("email", "Enter a valid email Id").isEmail(),
        check("password", "password field is required!!").isLength({ min: 1 }),
    ],
    signin
);

router.get("/signintest", isSignedIn, (req, res) => {
    res.send("Resctricted Routes!!");
});

router.get("/signout", signout);

module.exports = router;