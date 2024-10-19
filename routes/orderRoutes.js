import express from "express";
import orderController from "../controllers/orderController.js";

const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = orderController;

const orderRouter = express.Router();

orderRouter.route('/')
.get(getAllOrders)
.post(createOrder)

orderRouter.route('/:id')
.get(getOrderById)
.patch(updateOrder)
.delete(deleteOrder)

export default orderRouter;