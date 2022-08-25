const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const router = express.Router();
const { isAuthinticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthinticatedUser, newOrder);
router.route("/order/:id").get(isAuthinticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthinticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthinticatedUser, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthinticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthinticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
