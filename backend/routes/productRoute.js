const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controller/productController");
const { isAuthinticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(getAllProducts);
router.route("/admin/products").get(getAdminProducts);

router
  .route("/product/new")
  .post(isAuthinticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/product/:id")
  .put(isAuthinticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthinticatedUser, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetails);

//router.route("/product/:id").put(deleteProduct);

router.route("/product/review").post(isAuthinticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthinticatedUser, authorizeRoles("admin"), deleteReview);

module.exports = router;
