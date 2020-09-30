var express = require("express");
var router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

const { getUserById, getUser } = require("../controllers/user");

router.param("id", getUserById);

router.get("/user/:id", isSignedIn, isAuthenticated, getUser);

module.exports = router;