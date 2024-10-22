import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'
import authorModel from './authorModel.js';
import genreModel from './genreModel.js';

const bookModel = sequelize.define("Book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    pages: {
        type: DataTypes.INTEGER,
        min: 0,
        defaultValue: 0
    },
    genre: {
        type: [DataTypes.STRING],
        defaultValue: "Genre not specified"
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
        min: 0
    }
})

// bookModel.hasMany(authorModel)
// bookModel.hasMany(genreModel)


export default bookModel