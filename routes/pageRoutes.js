import express from "express";

const pagesRouter = express.Router();

pagesRouter.route('/home')
.get("getAllOrders")
pagesRouter.route('/login')
.get("getAllOrders")
pagesRouter.route('/register')
.get("getAllOrders")

export default orderRouter;