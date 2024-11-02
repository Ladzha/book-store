import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { validationResult } from "express-validator";
import userModel from "../models/userModel.js";
import errorHandler from "../config/errorHandler.js";

dotenv.config()

const SECRET = process.env.SECRET

function authenticationToken(req, res, next){
    try {
        const headersAuth = req.headers['authorization']
        const token = headersAuth.split(' ')[1]
        console.log("token", token);
        
        if(!token){
            errorHandler(res, 403, "Token not found")
        }
        const decodedData = jsonwebtoken.verify(token, SECRET) 
        req.body = decodedData
        console.log(decodedData);
        
        next()
    } catch (error) {
        errorHandler(res, 403, "Not authorized")
    }
}

function generateAccessToken(id, role){
    const payload = {
        id,
        role
    }
    return jsonwebtoken.sign(payload, SECRET, {expiresIn: "1h"})
}

function generateRefreshToken(id, role){
    const payload = {
        id,
        role
    }
    return jsonwebtoken.sign(payload, SECRET, {expiresIn: "24h"})
}

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
        if(!user) return errorHandler(res, 404, `User with ID ${id} not found`)
        res.status(200).json(user)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch user")
    }
}

const createUser = async(req, res) => {
    try {
        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json( {message: "Registration error", errors})
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
        const validPassword = bcrypt.compareSync(password, user.password)

        if(!validPassword) return errorHandler(res, 400, "Incorrect password")
        
        const token = generateAccessToken(user.id, user.role)

        res.cookie("accessToken", token )
        console.log(req.cookies.accessToken);
        
        

        res.status(200).json({
            message: `Welcome ${user.firstName}`,
            token: token
        })

    } catch (error) {
        errorHandler(res, 400, "Failed to login")
    }
}

const logout = async(req, res) => {
    try {
        res.clearCookie("accessToken")
        res.status(200).json({
            message: 'You have successfully logged out!',
        })
    } catch (error) {
        errorHandler(res, 400, "Failed to logout")
    }
}

const getProfileByUserId = async (req, res) => {
    try {
        const id = req.params.id    
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const user = await userModel.findByPk(id)
        if(!user) return errorHandler(res, 404, `User with ID ${id} not found`)
        res.status(200).json(user)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch user")
    }
}


export default { getAllUsers, getUserById, createUser, updateUser, deleteUser, login, getProfileByUserId, authenticationToken }