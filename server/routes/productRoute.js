import express from "express";
import { checkAdmin, requireSignIn } from "../middlewares/authMiddleWare.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  checkAdmin,
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  checkAdmin,
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

export default router;
