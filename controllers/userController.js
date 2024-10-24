import userModel from "../models/userModel.js";
import errorHandler from "../config/errorHandler.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";


const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.findAll()
        if(!users.length) return errorHandler(res, 404, "Users not found")
        res.status(200).json(users)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch users")
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id    
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const user = await userModel.findByPk(id)
        if(!user) return errorHandler(res, 404, `User with ${id} not found`)
        res.status(200).json(user)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch user")
    }
}

const createUser = async(req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return errorHandler(res, 400, `Invalid data ${errors}`)
        }
        const {firstName, lastName, email, password} = req.body      
        if(!firstName || !lastName || !email || !password ) return errorHandler(res, 400, "Invalid data")
        const candidate = await userModel.findOne({where: {email: email}})
        if(candidate) {
            return errorHandler(res, 400, `User with email ${email} already exist`)
        }   
        const hashPassword = bcrypt.hashSync(password, 5)
        const newUser = await userModel.create({firstName, lastName, email, password: hashPassword})
        
        res.status(201).json({
            message: "New user successfully created",
            newUser: newUser
        })
    } catch (error) {
        errorHandler(res, 500, "Failed to create user")
    }
}

const updateUser = async(req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const data = req.body
        if(!data) return errorHandler(res, 400, "Invalid data")
        await userModel.update(data, {where: {id : id}})
        const updatedUser = await userModel.findOne(data, {where: {id : id}})
        if(!updatedUser) return errorHandler(res, 404, "User not found")
        res.status(200).json({
            message: `User with ID: ${id} successfully updated.`, 
            user: updatedUser}); 
    } catch (error) {
        errorHandler(res, 400, "Failed to update user")
    } 
}

const deleteUser = async(req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const deletedUser = userModel.destroy({where: {id: id}})
        res.status(200).json({
            message: `User with ID: ${id} successfully deleted.`, 
            deletedUser: deletedUser
        }); 
    } catch (error) {
        errorHandler(res, 500, "Failed to delete user")
    }
}


const login = async(req, res) => {
    try {
        const {email, password} = req.body    
        if(!email || !password ) return errorHandler(res, 400, "Invalid data")
        const user = await userModel.findOne({where: {email: email}})
        if(!user) {
            return errorHandler(res, 400, `User with email ${email} doesn't exist`)
        }   
        const validPassword = bcrypt.compare(password, user.password, 
        //     function(error, result) {
        //     error ? console.log(error) : console.log(result)
        // }
    )

        if(!validPassword) return errorHandler(res, 400, "Incorrect password")
        
        res.status(200).json({
            message: `Welcome ${user.firstName}`,
        })
    } catch (error) {
        errorHandler(res, 500, "Failed to login")
    }
}


export default { getAllUsers, getUserById, createUser, updateUser, deleteUser, login }



// const getUserById = async (req, res) => {
//     try {
//         const id = req.params.id    
//         if(!id) return errorHandler(res, 404, "Invalid ID")
//         const user = await userModel.findByPk(id)
//         // const user = await userModel.findOne({where: { id: id }})
//         if(!user) return errorHandler(res, 404, `User with ${id} not found`)
//         res.status(200).json(user)
//     } catch (error) {
//         errorHandler(res, 500, "Failed to fetch user")
//     }
// }


// const { firstName, lastName, email, password } = req.body;
        
// // Проверка на обязательные поля
// if (!firstName || !lastName || !email || !password) {
//     return errorHandler(res, 400, "Invalid data: Missing required fields");
// }

// // Создание нового пользователя
// const newUser = await userModel.create({ firstName, lastName, email, password });
