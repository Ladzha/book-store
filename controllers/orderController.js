import orderModel from "../models/orderModel.js";
import errorHandler from "../config/errorHandler.js";

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.findAll()
        if(!orders.length) return errorHandler(res, 404, "Orders not found")
        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch orders")
    }
}

const getOrderById = async (req, res) => {
    try {
        const id = req.params.id
        if(!id) return errorHandler(res, 404, "ID not found")
        const order = await orderModel.findByPk(id)
        if(!order) return errorHandler(res, 404, `Order with ${id} not found`)
        res.status(200).json(order)
    } catch (error) {
        errorHandler(res, 500, "Failed to fetch order")
    }
}

const createOrder = async (req, res) => {
    try {
        const data = req.body
        if(!data) return errorHandler(400, "Invalid data")
        const newOrder = await orderModel.create(data)
        res.status(201).json({
            message: "New order successfully created",
            newOrder: newOrder
        })
    } catch (error) {
        errorHandler(res, 500, "Failed to create order")
    }
}

const updateOrder = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id
        const deletedOrder = orderModel.destroy({where: {id: id}})
        res.status(200).json({
            message: `Order with ID: ${id} successfully deleted.`, 
            deletedOrder: deletedOrder
        })
    } catch (error) {
        errorHandler(res, 500, "Failed to delete order")
    }
}

export default { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder }