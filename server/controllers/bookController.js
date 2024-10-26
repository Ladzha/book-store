import bookModel from "../models/bookModel.js";
import errorHandler from "../config/errorHandler.js";

const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.findAll()
        if(!books.length) return errorHandler(res, 404, "Books not found")
        res.status(200).json(books)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch books")
    }
}

const getBookById = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const book = await bookModel.findByPk(id)
        if(!book) return errorHandler(res, 404, `Book with ${id} not found`)
        res.status(200).json(book)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch book")
    }
}

const createBook = async (req, res) => {
    try {
        const data = req.body
        if(!data) return errorHandler(400, "Invalid data")
        const newBook = await bookModel.create(data)
        res.status(201).json({
            message: "New book successfully created",
            newBook: newBook
        })    
    } catch (error) {
        errorHandler(res, 500, "Failed to create book")
    }
}

const updateBook = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const data = req.body
        if(!data) return errorHandler(res, 400, "Invalid data")
        await bookModel.update(data, {where: {id : id}})
        const updatedBook = await bookModel.findOne(data, {where: {id : id}})
        if(!updatedBook) return errorHandler(res, 404, "Book not found")
        res.status(200).json({
            message: `Book with ID: ${id} successfully updated.`, 
            book: updatedBook}); 
    } catch (error) {
        errorHandler(res, 400, "Failed to update book")
    } 
}

const deleteBook = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const deletedBook = bookModel.destroy({where: {id: id}})
        res.status(200).json({
            message: `Book with ID: ${id} successfully deleted.`,
            deletedBook: deletedBook
        })
    } catch (error) {
        errorHandler(res, 500, "Failed to delete book")
    }
}

const findBooksByTitle = async (req, res) => {
    try {
        const bookTitle = req.body
        if(!bookTitle) return errorHandler(res, 404, "Title not found")
        const books = bookModel.findAll({where: {title: bookTitle}})
        if(!books.length) return errorHandler(res, 404, `Books with title ${bookTitle} not found`)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch books")
    }
}

const findBooksByAuthor = async (req, res) => {
    try {
        const bookAuthor = req.body
        if(!bookAuthor) return errorHandler(res, 404, "Title not found")
        const books = bookModel.findAll({where: {author: bookAuthor}, attributes: ['title', 'author', 'price']})
        if(!books.length) return errorHandler(res, 404, `Books by author ${bookAuthor} not found`)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch books")
    }
}



export default { getAllBooks, getBookById, createBook, updateBook, deleteBook, findBooksByTitle, findBooksByAuthor }