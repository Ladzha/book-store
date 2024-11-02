import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'
import authorModel from './authorModel.js';
import genreModel from './genreModel.js';

const bookModel = sequelize.define("Book", {
    name: {
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
    genresId: {
        type: DataTypes.JSON,
        allowNull: false, 
        defaultValue: []
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

bookModel.belongsToMany(authorModel, { through: 'BookAuthor' });
authorModel.belongsToMany(bookModel, { through: 'BookAuthor' });

bookModel.belongsToMany(genreModel, { through: 'BookGenre' });
genreModel.belongsToMany(bookModel, { through: 'BookGenre' });

export default bookModel