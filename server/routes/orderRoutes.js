import express from "express";
import orderController from "../controllers/orderController.js";
import userController from "../controllers/userController.js";

const { getUserById } = userController;

const { getAllOrders, getOrderById, createOrder, updateOrder, addBookToOrder, deleteOrder } = orderController;

const orderRouter = express.Router();

orderRouter.route('/')
.get(getAllOrders)

orderRouter.route('/users/:id/createOrder')
.post(createOrder)

orderRouter.route('/users/:id')
.get(getUserById)

orderRouter.route('/:id')
.get(getOrderById)
.patch(updateOrder)
.delete(deleteOrder)

orderRouter.route('/:id/addBook')
.patch(addBookToOrder)

export default orderRouter;