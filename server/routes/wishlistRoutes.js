import express from "express";
import wishlistController from "../controllers/wishlistController.js"

const { getAllWishlists, getWishlistById, createWishlist, addBookToWishlist, deleteWishlist } = wishlistController;

const wishlistRouter = express.Router();

wishlistRouter.route('/')
.get(getAllWishlists)
.post(createWishlist)

wishlistRouter.route('/:id')
.get(getWishlistById)
.patch(addBookToWishlist)
.delete(deleteWishlist)

export default wishlistRouter;