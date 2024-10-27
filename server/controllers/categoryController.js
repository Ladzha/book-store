import categoryModel from "../models/categoryModel.js";
import errorHandler from "../config/errorHandler.js";
import genreModel from "../models/genreModel.js";

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.findAll()
        if(!categories.length) return errorHandler(res, 404, "Categories not found")
        res.status(200).json(categories)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch categories")
    }
}

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const category = await categoryModel.findByPk(id)
        if(!category) return errorHandler(res, 404, `Category with ID ${id} not found`) 
        res.status(200).json(category)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch category")
    }
}

const createCategory = async (req, res) => {
    try {
        const data = req.body
        if(!data) return errorHandler(400, "Invalid data")
        const newCategory = await categoryModel.create(data)
        res.status(201).json({
            message: "New category successfully created",
            newCategory: newCategory
        })    
    } catch (error) {
        errorHandler(res, 500, "Failed to create category")
    }
}

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const data = req.body
        if(!data) return errorHandler(res, 400, "Invalid data")
        await categoryModel.update(data, {where: {id : id}})
        const updatedCategory = await categoryModel.findOne(data, {where: {id : id}})
        if(!updatedCategory) return errorHandler(res, 404, "Category not found")
        res.status(200).json({
            message: `Category with ID: ${id} successfully updated.`, 
            category: updatedCategory}); 
    } catch (error) {
        errorHandler(res, 400, "Failed to update category")
    } 
}

const addGenreToCategory = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        
        const genreId = req.body.genreId

        const data = req.body
        if(!data) return errorHandler(res, 400, "Invalid data")
        
        await categoryModel.update(data, {where: {id : id}})
        const updatedCategory = await categoryModel.findByPk(id)

        if(!updatedCategory) return errorHandler(res, 404, "Category not found")
        res.status(200).json({
            message: `Genre ${genre.name} successfully added to ${updatedCategory.name} category with ID: ${id}.`, 
            category: updatedCategory}); 
    } catch (error) {
        errorHandler(res, 400, "Failed to update category")
    } 
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const deletedCategory = categoryModel.destroy({where: {id: id}})
        res.status(200).json({
            message: `Category with ID: ${id} successfully deleted.`, 
            deletedCategory: deletedCategory
        })
    } catch (error) {
        errorHandler(res, 500, "Failed to delete category")
    }
}

export default { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory }