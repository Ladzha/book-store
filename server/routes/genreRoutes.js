import express from "express";
import genreController from "../controllers/genreController.js";

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