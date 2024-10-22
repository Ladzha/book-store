import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'
import genreModel from './genreModel.js'

const categoryModel = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING,
        min: 2,
        allowNull: false,
        unique: true
    },
    genres: {
        type: [DataTypes.STRING]
    }
})

// categoryModel.hasMany(genreModel)
// genreModel.belongsTo(categoryModel)

export default categoryModel