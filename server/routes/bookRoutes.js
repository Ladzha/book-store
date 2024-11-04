import express from "express";
import bookController from "../controllers/bookController.js";
import authorController from "../controllers/authorController.js";

const { getAuthorById } = authorController;
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = bookController;

const bookRouter = express.Router();

bookRouter.route('/')
.get(getAllBooks)

bookRouter.route('/authors/:id')
.post(createBook)
.get(getAuthorById)

bookRouter.route('/:id')
.get(getBookById)
.patch(updateBook)
.delete(deleteBook)

export default bookRouter;