import express from "express";
import authorController from "../controllers/authorController.js";

const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = authorController;

const authorRouter = express.Router();

authorRouter.route('/')
.get(getAllAuthors)
.post(createAuthor)

authorRouter.route('/:id')
.get(getAuthorById)
.patch(updateAuthor)
.delete(deleteAuthor)

export default authorRouter;