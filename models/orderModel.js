import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const orderModel = sequelize.define("Order", {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    books: {
        type: [DataTypes.STRING], //(список книг, каждая с количеством и ценой)
        allowNull: false,
    },
    itemAmount: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }, 
    totalPrice: {
        type: DataTypes.NUMBER,
    }, 
    status: {
        type: DataTypes.STRING, //(статус заказа: новый, обработан, доставлен)
    },
    createAt: {
        type: DataTypes.DATE
    }
})

export default orderModel