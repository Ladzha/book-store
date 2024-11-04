import wishlistModel from "../models/wishlistModel.js";
import userModel from "../models/userModel.js";
import bookModel from "../models/bookModel.js";
import errorHandler from "../config/errorHandler.js";
import { where } from "sequelize";

const getAllWishlists = async (req, res) => {
    try {
        const wishlists = await wishlistModel.findAll({
            include: [{model: bookModel, through: {attributes: []}, attributes: ['name', 'author']}]
        })
        if(!wishlists.length) return errorHandler(res, 404, "Wishlists not found")
        res.status(200).json(wishlists)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch wishlists")
    }
}

const getWishlistById = async (req, res) => {
    try {
        const wishlistId = req.params.id
        if(!wishlistId) return errorHandler(res, 400, "Invalid ID")
            console.log(wishlistId);
            
        const wishlist = await wishlistModel.findByPk(wishlistId, {
            include: [
                {model: bookModel, through: {attributes: []}, attributes: ['name', 'author']},
                {model: userModel}
            ]
        })

        console.log(wishlist);
        

        if(!wishlist) return errorHandler(res, 404, `Wishlist with ID ${wishlistId} not found`)
        res.status(200).json(wishlist)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch wishlist")
    }
}

const createWishlist = async (req, res) => {
    try {
        const {id : userId} = req.params
        if(!userId) return errorHandler(res, 400, "Invalid user ID")            
        const user = await userModel.findByPk(userId)
        if(!user) return errorHandler(res, 404, `User with ${userId} not found`)
        const newWishlist = await wishlistModel.create({userId: userId})
        res.status(201).json({
            message: `New wishlist for user ${user.name} successfully created`,
            newWishlist: newWishlist
        })    
    } catch (error) {
        errorHandler(res, 500, "Failed to create wishlist")
    }
}

const addBookToWishlist = async (req, res) => {
    try {
        const wishlistId = req.params.id
        if(!wishlistId) return errorHandler(res, 400, "Invalid ID")
            
        const bookName = req.body.name
        if(!bookName) return errorHandler(res, 400, "Invalid data")

        const bookToAdd = await bookModel.findOne({where: {name: bookName}})
        if (!bookToAdd) return errorHandler(res, 404, `Book with name "${bookName}" not found`);

        const updatedWishlist = await wishlistModel.findByPk(wishlistId)
        if (!updatedWishlist) return errorHandler(res, 404, `Wishlist with ID ${wishlistId} not found`);

        await updatedWishlist.addBook(bookToAdd)
        await bookToAdd.addWishlist(updatedWishlist)

        res.status(200).json({
            message: `Book ${bookName} successfully added to wishlist with ID ${wishlistId}.`, 
            wishlist: updatedWishlist,
            book: bookToAdd
        }); 
    } catch (error) {
        errorHandler(res, 400, "Failed to update wishlist")
    } 
}

const deleteWishlist = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const deletedWishlist = wishlistModel.destroy({where: {id: id}})
        res.status(200).json({
            message: `Wishlist with ID: ${id} successfully deleted.`, 
            deletedWishlist: deletedWishlist
        }); 
    } catch (error) {
        errorHandler(res, 500, "Failed to delete wishlist")
    }
}

export default { getAllWishlists, getWishlistById, createWishlist, addBookToWishlist, deleteWishlist }