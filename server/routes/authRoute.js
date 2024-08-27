import express from "express";
import {
  forgotPassWordController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import {
  checkAdmin,
  checkUser,
  requireSignIn,
} from "../middlewares/authMiddleWare.js";

// router object
const router = express.Router();

// Method POST || Register
router.post("/register", registerController);

// Method POST || Login

router.post("/login", loginController);

// Method POST || forget password

router.post("/forgot-password", forgotPassWordController);

// test controller middleware || Method GET

router.get("/test", requireSignIn, checkAdmin, testController);

// protected route || admin auth

router.get("/admin-auth", requireSignIn, checkAdmin, (req, res) =>
  res.status(200).send({ success: true })
);
// protected route || user auth

router.get("/user-auth", requireSignIn, checkUser, (req, res) =>
  res.status(200).send({ success: true })
);

//  user update profile
router.put("/profile-update", requireSignIn, updateProfileController);

export default router;
