import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'

const orderModel = sequelize.define("Order", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    itemAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    }, 
    status: {
        type: DataTypes.STRING, 
        defaultValue: "CREATED" 
    }
})

export default orderModel