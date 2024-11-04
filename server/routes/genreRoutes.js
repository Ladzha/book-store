import express from "express";
import genreController from "../controllers/genreController.js";
import categoryController from "../controllers/categoryController.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const {getCategoryById} = categoryController;
const { getAllGenres, getGenreById, createGenre, updateGenre, addBookToGenre, deleteGenre } = genreController;

const genreRouter = express.Router();

genreRouter.route('/')
.get(getAllGenres)

genreRouter.route('/categories/:id')
.post(createGenre)
.get(getCategoryById)

genreRouter.route('/:id')
.get(getGenreById)
.patch(updateGenre)
.delete(deleteGenre)

genreRouter.route('/:id/addBook')
.patch(addBookToGenre)

export default genreRouter;