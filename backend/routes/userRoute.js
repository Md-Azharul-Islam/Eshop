const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/UserController");
const { isAuthinticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthinticatedUser, getUserDetails);

router.route("/me/update").put(isAuthinticatedUser, updatePassword);

router.route("/me/update/info").put(isAuthinticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthinticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthinticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthinticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthinticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
