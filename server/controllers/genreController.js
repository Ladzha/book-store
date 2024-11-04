import genreModel from "../models/genreModel.js";
import errorHandler from "../config/errorHandler.js";
import bookModel from "../models/bookModel.js";
import authorModel from "../models/authorModel.js";
import categoryModel from "../models/categoryModel.js";

const getAllGenres = async (req, res) => {
    try {
        const genres = await genreModel.findAll({
            include: [{model: bookModel, through: {attributes: []}, attributes: ['name', 'author']}]
        })
        if(!genres.length) return errorHandler(res, 404, "Genres not found")
        res.status(200).json(genres)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch genres")
    }
}

const getGenreById = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const genre = await genreModel.findByPk(id, {
            include: [{model: bookModel, through: {attributes: []}, attributes: ['name', 'author']}]
        })
        if(!genre) return errorHandler(res, 404, `Genre with ID ${id} not found`) 
        res.status(200).json(genre)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch genre")
    }
}

const createGenre = async (req, res) => {
    try {
        const categoryId = req.params.id        
        if(!categoryId) return errorHandler(res, 400, "Invalid category ID")
        const data = req.body
        if(!data) return errorHandler(res, 400, "Invalid data")
        const category = await categoryModel.findByPk(categoryId);
    
        if(!category) return errorHandler(res, 400, "Invalid category ID")
        const newGenre = await category.createGenre(data)
        res.status(201).json({
            message: "New genre successfully created",
            newGenre: newGenre
        })    
    } catch (error) {
        errorHandler(res, 500, "Failed to create genre")
    }
}

const updateGenre = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const data = req.body
        if(!data) return errorHandler(res, 400, "Invalid data")
        await genreModel.update(data, {where: {id : id}})
        const updatedGenre = await genreModel.findByPk(id)
        if(!updatedGenre) return errorHandler(res, 404, "Genre not found")
        res.status(200).json({
            message: `Genre with ID: ${id} successfully updated.`, 
            genre: updatedGenre}); 
    } catch (error) {
        errorHandler(res, 400, "Failed to update genre")
    } 
}

const addBookToGenre = async (req, res) => {
    try {
        const genreId = req.params.id
        if(!genreId) return errorHandler(res, 400, "Invalid ID")
            
        const bookName = req.body.name
        if(!bookName) return errorHandler(res, 400, "Invalid data")

        const bookToAdd = await bookModel.findOne({where: {name: bookName}})
        if (!bookToAdd) return errorHandler(res, 404, `Book with name "${bookName}" not found`);

        const updatedGenre = await genreModel.findByPk(genreId)
        if (!updatedGenre) return errorHandler(res, 404, `Genre with ID ${genreId} not found`);

        await updatedGenre.addBook(bookToAdd)
        await bookToAdd.addGenre(updatedGenre)

        res.status(200).json({
            message: `Book ${bookName} successfully added to genre ${updatedGenre.name}.`, 
            genre: updatedGenre,
            book: bookToAdd
        }); 

    } catch (error) {
        errorHandler(res, 500, "Failed to add book to genre")
    } 
}


const deleteGenre = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const deletedGenre = genreModel.destroy({where: {id: id}})
        res.status(200).json({
            message: `Genre with ID: ${id} successfully deleted.`, 
            deletedGenre: deletedGenre
        })
    } catch (error) {
        errorHandler(res, 500, "Failed to delete genre")
    }
}

export default { getAllGenres, getGenreById, createGenre, updateGenre, addBookToGenre, deleteGenre }