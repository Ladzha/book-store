import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'
import userModel from './userModel.js';

const orderModel = sequelize.define("Order", {
    itemAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    books: {
        type: [DataTypes.STRING], //(список книг, каждая с количеством и ценой)
        allowNull: false,
    }, 
    totalPrice: {
        type: DataTypes.INTEGER,
    }, 
    status: {
        type: DataTypes.STRING, 
        defaultValue: "Created" 
        //(статус заказа: новый, обработан, доставлен)
    }
})

export default orderModel