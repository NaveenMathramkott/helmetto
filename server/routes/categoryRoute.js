import express from "express";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";
import { checkAdmin, requireSignIn } from "../middlewares/authMiddleWare.js";

const router = express.Router();

// create category router
router.post(
  "/create-category",
  requireSignIn,
  checkAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  checkAdmin,
  updateCategoryController
);

//getAll category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  checkAdmin,
  deleteCategoryCOntroller
);

export default router;
