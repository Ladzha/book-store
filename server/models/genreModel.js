import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'
import categoryModel from './categoryModel.js';

const genreModel = sequelize.define("Genre", {
    name: {
        type: DataTypes.STRING,
        min: 2,
        allowNull: false,
        unique: true
    },
    categoryId: {
        type: DataTypes.STRING
    },
    bookAmount: {
        type: DataTypes.INTEGER,
        min: 0,
        defaultValue: 0
    }, 
    booksId: {
        type: DataTypes.JSON,
        allowNull: false, 
        defaultValue: []
    }
})

categoryModel.hasMany(genreModel, {
    foreignKey: 'categoryId',
    onDelete: 'CASCADE'
});

genreModel.belongsTo(categoryModel, {
    foreignKey: 'categoryId'
});


export default genreModel