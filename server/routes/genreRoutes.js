import express from "express";
import genreController from "../controllers/genreController.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { getAllGenres, getGenreById, createGenre, updateGenre, deleteGenre } = genreController;

const genreRouter = express.Router();

genreRouter.route('/')
.get(getAllGenres)
.post(createGenre)

genreRouter.route('/:id')
.get(getGenreById)
.patch(updateGenre)
.delete(deleteGenre)

export default genreRouter;