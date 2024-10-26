import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'
import userModel from './userModel.js';

const orderModel = sequelize.define("Order", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    itemAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    booksId: {
        type: DataTypes.JSON,
        allowNull: false, 
        defaultValue: []
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

userModel.hasMany(orderModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

orderModel.belongsTo(userModel, {
    foreignKey: 'userId'
});

export default orderModel