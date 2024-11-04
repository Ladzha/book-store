import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'

const bookModel = sequelize.define("Book", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    },
    pages: {
        type: DataTypes.INTEGER,
        min: 0,
        defaultValue: 0
    },  
    publishedAt: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        min: 0,
        defaultValue: 0.00
    },
    stock: {
        type: DataTypes.STRING,
        min: 0,
        defaultValue: 0
    }
})

export default bookModel