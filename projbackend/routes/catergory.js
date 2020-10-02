const express = require("express");
const router = express.Router();

const {
    getCategoryById,
    createCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/category");

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

//Params are going in here:
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Category Routes:

// 1. Post request:
router.post(
    "/category/create/:userId/",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);

// 2.Get Request
router.get("/category/:categoryId/:userId", isSignedIn, isAuthenticated, getCategory);
router.get("/categories", getAllCategory);

// 3. PUT-Update request:
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
);

//Delete Route:
router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteCategory
);

module.exports = router;