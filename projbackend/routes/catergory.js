const express = require("express");
const router = express.Router();

const {
    getCategoryById,
    createCategory,
    getCategory,
    getAllCategory,
} = require("../controllers/category");
const { GetUserBYId, getUserById } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

//Params are going in here:
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Category Routes:
router.post(
    "/category/create/:userId/",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);

router.get("/category/:categoryId", getCategory);
router.get("categories", getAllCategory);

module.exports = router;