import express from "express";
import categoryController from "../controllers/categoryController.js";

const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = categoryController;

const categoryRouter = express.Router();

categoryRouter.route('/')
.get(getAllCategories)
.post(createCategory)

categoryRouter.route('/:id')
.get(getCategoryById)
.patch(updateCategory)
.delete(deleteCategory)

export default categoryRouter;