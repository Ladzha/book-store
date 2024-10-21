import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'

const bookModel = sequelize.define("Book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
        min: 0
    },
    genre: {
        type: []
    },
    description: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.STRING,
        min: 0
    },
    createdAt: {
        type: DataTypes.DATE
    }

})

export default bookModel