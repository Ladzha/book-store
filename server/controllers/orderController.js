import orderModel from "../models/orderModel.js";
import errorHandler from "../config/errorHandler.js";
import userModel from "../models/userModel.js";
import bookModel from "../models/bookModel.js";

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.findAll({
            include: [{model: bookModel, through: {attributes: []}, attributes: ['name', 'author']}]
        })
        if(!orders.length) return errorHandler(res, 404, "Orders not found")
        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch orders")
    }
}

const getOrderById = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const order = await orderModel.findByPk(id, {
            include: [
                {model: bookModel, through: {attributes: []}, attributes: ['name', 'author']}, 
                {model: userModel}
            ]
        })
        if(!order) return errorHandler(res, 404, `Order with ID ${id} not found`)
        res.status(200).json(order)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch order")
    }
}

const createOrder = async (req, res) => {
    try {
        const {id : userId} = req.params        
        if(!userId) return errorHandler(res, 400, "Invalid user ID")            
        const user = await userModel.findByPk(userId)
        if(!user) return errorHandler(res, 404, `User with ${userId} not found`)
        const newOrder = await orderModel.create({userId: userId})
        res.status(201).json({
            message: `New order for user ${user.name} successfully created`,
            newOrder: newOrder
        })
    } catch (error) {
        errorHandler(res, 500, "Failed to create order")
    }
}

const updateOrder = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const data = req.body
        if(!data) return errorHandler(res, 400, "Invalid data")
        await orderModel.update(data, {where: {id : id}})
        const updatedOrder = await orderModel.findByPk(id)
        if(!updatedOrder) return errorHandler(res, 404, "Order not found")
        res.status(200).json({
            message: `Order with ID: ${id} successfully updated.`, 
            order: updatedOrder}); 
    } catch (error) {
        errorHandler(res, 400, "Failed to update order")
    } 
}

const addBookToOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if(!orderId) return errorHandler(res, 400, "Invalid ID")
            
        const bookName = req.body.name
        if(!bookName) return errorHandler(res, 400, "Invalid data")

        const bookToAdd = await bookModel.findOne({where: {name: bookName}})
        if (!bookToAdd) return errorHandler(res, 404, `Book with name "${bookName}" not found`);

        const updatedOrder = await orderModel.findByPk(orderId)
        if (!updatedOrder) return errorHandler(res, 404, `Order with ID ${orderId} not found`);

        await updatedOrder.addBook(bookToAdd)
        await bookToAdd.addOrder(updatedOrder)

        res.status(200).json({
            message: `Book ${bookName} successfully added to order with ID ${orderId}.`, 
            order: updatedOrder,
            book: bookToAdd
        }); 
    } catch (error) {
        errorHandler(res, 400, "Failed to update order")
    } 
}

const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 400, "Invalid ID")
        const deletedOrder = orderModel.destroy({where: {id: id}})
        res.status(200).json({
            message: `Order with ID: ${id} successfully deleted.`, 
            deletedOrder: deletedOrder
        })
    } catch (error) {
        errorHandler(res, 500, "Failed to delete order")
    }
}

export default { getAllOrders, getOrderById, createOrder, updateOrder, addBookToOrder, deleteOrder }