import express from "express";
import { check } from "express-validator";
import userController from "../controllers/userController.js"

const { getAllUsers, getUserById, createUser, updateUser, deleteUser, login, getProfileByUserId, authenticationToken, refreshAccessToken } = userController;

const userRouter = express.Router();

userRouter.get('/',
    authenticationToken, 
    getAllUsers)
userRouter.get('/profile/:id', 
    // authenticationToken,
    getProfileByUserId)


userRouter.route('/')
.post(createUser) 

userRouter.post('/registration', [
    check("name", "Name field can't be empty").notEmpty(),
    check("email", "Email field can't be empty").notEmpty()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage("Email format is invalid"),
    check("password", "Password must be 6-15 symbols").notEmpty().isLength({min: 6, max: 15}),
], createUser)

userRouter.route('/login')
.post(login)

userRouter.route('/:id')
.get(getUserById)
.patch(updateUser)
.delete(deleteUser)

export default userRouter;