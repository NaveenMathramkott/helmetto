import express from "express";
import {
  getAllOrdersController,
  getOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { checkAdmin, requireSignIn } from "../middlewares/authMiddleWare.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
} from "../controllers/productController.js";

// router object
const router = express.Router();

//  get all the orders
router.post("/orders", requireSignIn, getOrdersController);

//  all orders for the users
router.get("/all-orders", requireSignIn, checkAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  checkAdmin,
  orderStatusController
);

//payments routes  token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
