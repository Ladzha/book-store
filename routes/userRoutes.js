import express from "express";
import userController from "../controllers/userController.js"

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = userController;

const userRouter = express.Router();

userRouter.route('/')
.get(getAllUsers)
.post(createUser)

userRouter.route('/:id')
.get(getUserById)
.patch(updateUser)
.delete(deleteUser)

export default userRouter;