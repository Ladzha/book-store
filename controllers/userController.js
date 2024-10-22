import userModel from "../models/userModel.js";
import errorHandler from "../config/errorHandler.js";

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
        const data = req.body
        if(!data) return errorHandler(400, "Invalid data")
        const newUser = await userModel.create(data)
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

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser }



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
