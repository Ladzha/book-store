import express from "express";
import { check } from "express-validator";

import userController from "../controllers/userController.js"

const { getAllUsers, getUserById, createUser, updateUser, deleteUser, login } = userController;

const userRouter = express.Router();

userRouter.route('/')
.get(getAllUsers)
.post(createUser) //delete after

userRouter.post('/registration', [
    check("firstName", "First name field can't be empty").notEmpty(),
    check("lastName", "Last name field can't be empty").notEmpty(),
    check("email", "Email field can't be empty").notEmpty(),
    check("password", "Password muts be more than 6-15 symbols").notEmpty().isLength({min: 6, max: 15}),
], createUser)

userRouter.route('/login')
.post(login)

userRouter.route('/:id')
.get(getUserById)
.patch(updateUser)
.delete(deleteUser)

export default userRouter;