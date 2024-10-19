import express from "express";
import bookController from "../controllers/bookController.js";

const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = bookController;

const bookRouter = express.Router();

bookRouter.route('/')
.get(getAllBooks)
.post(createBook)

bookRouter.route('/:id')
.get(getBookById)
.patch(updateBook)
.delete(deleteBook)

export default bookRouter;