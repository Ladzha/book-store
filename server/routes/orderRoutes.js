import express from "express";
import orderController from "../controllers/orderController.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { getAllOrders, getOrderById, createOrder, updateOrder, addBookToOrder, deleteOrder } = orderController;

const orderRouter = express.Router();

orderRouter.route('/')
.get(getAllOrders)
.post(createOrder)

orderRouter.route('/:id')
.get(getOrderById)
.patch(updateOrder)
.patch(addBookToOrder)
.delete(deleteOrder)

export default orderRouter;