var express = require("express");
var router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

const { getUserById, getUser, getAllUsers } = require("../controllers/user");

router.param("id", getUserById);

router.get("/user/:id", isSignedIn, isAuthenticated, getUser);

router.get("/users", getAllUsers);

module.exports = router;