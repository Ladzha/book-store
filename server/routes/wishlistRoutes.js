import express from "express";
import wishlistController from "../controllers/wishlistController.js"
import userController from "../controllers/userController.js";

const { getUserById } = userController;

const { getAllWishlists, getWishlistById, createWishlist, addBookToWishlist, deleteWishlist } = wishlistController;

const wishlistRouter = express.Router();

wishlistRouter.route('/')
.get(getAllWishlists)

wishlistRouter.route('/users/:id')
.get(getUserById)

wishlistRouter.route('/:id')
.get(getWishlistById)
.delete(deleteWishlist)

wishlistRouter.route('/users/:id/createWishlist')
.post(createWishlist)

wishlistRouter.route('/:id/addBook')
.patch(addBookToWishlist)

export default wishlistRouter;