import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'
import bookModel from './bookModel.js';
import categoryModel from './categoryModel.js';

const genreModel = sequelize.define("Genre", {
    name: {
        type: DataTypes.STRING,
        min: 2,
        allowNull: false,
        unique: true
    },
    category: {
        type: DataTypes.STRING
    },
    bookAmount: {
        type: DataTypes.INTEGER,
        min: 0,
        defaultValue: 0
    }, 
    bookList: {
        type: [DataTypes.STRING]
    }
})

// genreModel.hasMany(bookModel)
// genreModel.hasOne(categoryModel)


export default genreModel