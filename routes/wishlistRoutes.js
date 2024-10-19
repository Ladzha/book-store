import express from "express";
import wishlistController from "../controllers/wishlistController.js"

const { getAllWishlists, getWishlistById, createWishlist, updateWishlist, deleteWishlist } = wishlistController;

const wishlistRouter = express.Router();

wishlistRouter.route('/')
.get(getAllWishlists)
.post(createWishlist)

wishlistRouter.route('/:id')
.get(getWishlistById)
.patch(updateWishlist)
.delete(deleteWishlist)

export default wishlistRouter;