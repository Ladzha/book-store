import authorModel from "../models/authorModel.js";
import bookModel from "../models/bookModel.js";
import errorHandler from "../config/errorHandler.js";

const getAllAuthors = async (req, res) => {
    try {
        const authors = await authorModel.findAll({
            include: [{ model: bookModel, attributes: ['name', 'description']}]
            })
        if(!authors.length) return errorHandler(res, 404, "Authors not found")
        res.status(200).json(authors)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch authors")
    }
}

const getAuthorById = async (req, res) => {
    try {
        const id = req.params.id    
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const author = await authorModel.findByPk(id, {
            include: [{model: bookModel}]
        })
        if(!author) return errorHandler(res, 404, `Author with ID ${id} not found`)
        res.status(200).json(author)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch author")
    }
}

const createAuthor = async(req, res) => {
    try {
        const data = req.body
        if(!data) return errorHandler(res, 400, "Invalid data")
        const newAuthor = await authorModel.create(data)
        res.status(201).json({
            message: "New author successfully created",
            newAuthor: newAuthor
        })
    } catch (error) {
        errorHandler(res, 500, "Failed to create author")
    }
}

const updateAuthor = async(req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const data = req.body
        if(!data) return errorHandler(res, 400, "Invalid data")
        await authorModel.update(data, {where: {id : id}})
        const updatedAuthor = await authorModel.findByPk(id)
        if(!updatedAuthor) return errorHandler(res, 404, `Author with ID ${id} not found`)
        res.status(200).json({
            message: `Author with ID: ${id} successfully updated.`, 
            author: updatedAuthor}); 
    } catch (error) {
        errorHandler(res, 400, "Failed to update author")
    } 
}

const deleteAuthor = async(req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const deletedAuthor = await authorModel.destroy({where: {id: id}})
        res.status(200).json({
            message: `Author with ID: ${id} successfully deleted.`, 
            deletedAuthor: deletedAuthor
        }); 
    } catch (error) {
        errorHandler(res, 500, "Failed to delete author")
    }
}

export default { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor }
