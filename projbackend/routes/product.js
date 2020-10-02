const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const { getProductById, createProducts } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//Param
router.param("userId", getUserById);
router.param("productId", getProductById);

//Actual Routers here:

router.post(
    "/product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProducts
);

module.exports = router;