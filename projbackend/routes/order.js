const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const {
    getOrderById,
    createOrder,
    getAllOrder,
    getOrderStatus,
    updateStatus,
} = require("../controllers/order");
const { updateStocks } = require("../controllers/product");

//Params will go in here:
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Actual routes will go in here:

//Read Routes:
router.get(
    "/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrder
);

//Post Routes:
router.post(
    "/order/create/:orderId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStocks,
    createOrder
);

//Update Routes:
router.put(
    "/order/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
);

//Status routes:
router.get(
    "/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
);
//Delete Route:

module.exports = router;