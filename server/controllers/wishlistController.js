import wishlistModel from "../models/wishlistModel.js";
import userModel from "../models/userModel.js";
import bookModel from "../models/bookModel.js";
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
        if(!wishlist) return errorHandler(res, 404, `Wishlist with ID ${id} not found`)
        res.status(200).json(wishlist)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch wishlist")
    }
}

const createWishlist = async (req, res) => {
    try {
        const userId = req.body.userId
        if(!userId) return errorHandler(res, 400, "Invalid user ID")            
        const user = await userModel.findByPk(userId)
        if(!user) return errorHandler(res, 404, `User with ${userId} not found`)
        const newWishlist = await wishlistModel.create({userId: userId})
        res.status(201).json({
            message: `New wishlist for user ${user.firstName} successfully created`,
            newWishlist: newWishlist
        })    
    } catch (error) {
        errorHandler(res, 500, "Failed to create wishlist")
    }
}

const addBookToWishlist = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
    
        // const userId = req.body.userId
        // if(!userId) return errorHandler(res, 400, "Invalid user ID")            
        // const user = await userModel.findByPk(userId)
        // if(!user) return errorHandler(res, 404, `User with ${userId} not found`)

        const bookId = req.body.userId
        if(!bookId) return errorHandler(res, 400, "Invalid book ID")            
        const book = await bookModel.findByPk(bookId)
        if(!book) return errorHandler(res, 404, `Book with ${bookId} not found`)
        
        const updatedWishlist = await wishlistModel.findByPk(id)
        if(updatedWishlist.booksId.includes(bookId)) return errorHandler(res, 400, `Book with id ${bookId} is already in the wishlist`)
        
        updatedWishlist.booksId.push(bookId)
        updatedWishlist.save()

        res.status(200).json({
            message: `Wishlist with ID: ${id} successfully updated. Book ${book.title} with id ${bookId} added to wishlist`, 
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

export default { getAllWishlists, getWishlistById, createWishlist, addBookToWishlist, deleteWishlist }