import express from "express";
import { check } from "express-validator";
import userController from "../controllers/userController.js"
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const { getAllUsers, getUserById, createUser, updateUser, deleteUser, login, getProfileByUserId, authenticationToken, refreshAccessToken } = userController;

const userRouter = express.Router();

userRouter.use(express.static(path.join(__dirname, "public")));

userRouter.get('/',
    // authenticationToken, 
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

userRouter.get("/registration", ((req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "register.html"))
}))

userRouter.get("/login", ((req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"))
}))

userRouter.route('/login')
.post(login)

userRouter.route('/:id')
.get(getUserById)
.patch(updateUser)
.delete(deleteUser)

export default userRouter;