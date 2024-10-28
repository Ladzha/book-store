import express from "express";
import authorController from "../controllers/authorController.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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