import genreModel from "../models/genreModel.js";
import errorHandler from "../config/errorHandler.js";

const getAllGenres = async (req, res) => {
    try {
        const genres = await genreModel.findAll()
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
        const genre = await genreModel.findByPk(id)
        if(!genre) return errorHandler(res, 404, `Genre with ${id} not found`) 
        res.status(200).json(genre)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch genre")
    }
}

const createGenre = async (req, res) => {
    try {
        const data = req.body
        if(!data) return errorHandler(400, "Invalid data")
        const newGenre = await genreModel.create(data)
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
        const updatedGenre = await genreModel.findOne(data, {where: {id : id}})
        if(!updatedGenre) return errorHandler(res, 404, "Genre not found")
        res.status(200).json({
            message: `Genre with ID: ${id} successfully updated.`, 
            genre: updatedGenre}); 
    } catch (error) {
        errorHandler(res, 400, "Failed to update genre")
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

export default { getAllGenres, getGenreById, createGenre, updateGenre, deleteGenre }