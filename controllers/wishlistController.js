import wishlistModel from "../models/wishlistModel.js";
import errorHandler from "../config/errorHandler.js";

const getAllWishlists = async (req, res) => {
    try {
        const wishlists = await wishlistModel.findAll()
        if(!wishlists.length) return errorHandler(res, 404, "Wishlists not found")
        res.status(200).json(wishlists)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch wishlists")
    }
}

const getWishlistById = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const wishlist = wishlistModel.findByPk(id)
        if(!wishlist) return errorHandler(res, 404, `Wishlist with ${id} not found`)
        res.status(200).json(wishlist)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch wishlist")
    }
}

const createWishlist = async (req, res) => {
    try {
        const data = req.body
        if(!data) return errorHandler(400, "Invalid data")
        const newWishlist = await wishlistModel.create(data)
        res.status(201).json({
            message: "New wishlist successfully created",
            newWishlist: newWishlist
        })    
    } catch (error) {
        errorHandler(res, 500, "Failed to create wishlist")
    }
}

const updateWishlist = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const data = req.body
        if(!data) return errorHandler(res, 400, "Invalid data")
        await wishlistModel.update(data, {where: {id : id}})
        const updatedWishlist = await wishlistModel.findOne(data, {where: {id : id}})
        if(!updatedWishlist) return errorHandler(res, 404, "Wishlist not found")
        res.status(200).json({
            message: `Wishlist with ID: ${id} successfully updated.`, 
            book: updatedWishlist}); 
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

export default { getAllWishlists, getWishlistById, createWishlist, updateWishlist, deleteWishlist }