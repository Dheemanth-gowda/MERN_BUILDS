const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const {
    getProductById,
    createProduct,
    deleteProducts,
    updateProducts,
    getProduct,
    photo,
    getAllProducts,
    getAllUniqueCategories,
} = require("../controllers/product");
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
    createProduct
);

//Get routes:
router.get("/product/:productId", getProduct);
router.get("product/photo/:productId", photo);

//Delete Routes:
router.delete(
    "/products/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProducts
);

router.put(
    "/products/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProducts
);
//Update Routes:
router.put("/products/:productId/:userId", updateProducts);

//Listing Routes:
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;