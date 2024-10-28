import express from "express";
import categoryController from "../controllers/categoryController.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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