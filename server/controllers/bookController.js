import bookModel from "../models/bookModel.js";
import errorHandler from "../config/errorHandler.js";
import authorModel from "../models/authorModel.js";
import genreModel from "../models/genreModel.js";

const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.findAll({
            include: [{model: genreModel, through: {attributes: []}, attributes: ['name']},
            {model: authorModel, through: {attributes: []}, attributes: ['name']}]
        })
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
        if(!book) return errorHandler(res, 404, `Book with ID ${id} not found`)
        res.status(200).json(book)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch book")
    }
}

const createBook = async (req, res) => {
    try {
        const authorId = req.params.id
        if(!authorId) return errorHandler(res, 400, "Invalid author ID")
        let data = req.body
        if(!data || !data.name ) return errorHandler(res, 400, "Invalid data")

        const author = await authorModel.findByPk(authorId)
        if(!author) return errorHandler(res, 404, "Author not found")

        if(!data.author){
            data.author = author.name
        }
        const newBook = await author.createBook({...data})
        author.bookAmount =  author.bookAmount+1
        author.save()

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
        const updatedBook = await bookModel.findByPk(id)
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

const findBooksByName = async (req, res) => {
    try {
        const bookName = req.body.name
        if(!bookName) return errorHandler(res, 404, "Book not found")

        const books = bookModel.findAll({where: {name: bookName}})
        if(!books.length) return errorHandler(res, 404, `Books ${bookName} not found`)
        res.status(200).json(books)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch books")
    }
}

const findBooksByAuthor = async (req, res) => {
    try {
        const bookAuthor = req.body.author
        if(!bookAuthor) return errorHandler(res, 404, "Author not found")
        const books = bookModel.findAll({
            where: {author: bookAuthor}, 
            attributes: ['name', 'author', 'price']})
        if(!books.length) return errorHandler(res, 404, `Books by author ${bookAuthor} not found`)
        res.status(200).json(books)

    } catch (error) {
        errorHandler(res, 500, "Failed to fetch books")
    }
}



export default { getAllBooks, getBookById, createBook, updateBook, deleteBook, findBooksByName, findBooksByAuthor }