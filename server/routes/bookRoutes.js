import express from "express";
import bookController from "../controllers/bookController.js";
import authorController from "../controllers/authorController.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { getAuthorById } = authorController;


const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = bookController;

const bookRouter = express.Router();

bookRouter.get("/page/books", ((req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "books.html"))
}))

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