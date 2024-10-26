import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'

const categoryModel = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING,
        min: 2,
        allowNull: false,
        unique: true
    },
    genresId: {
        type: DataTypes.JSON,
        allowNull: false, 
        defaultValue: []
    }   
})

export default categoryModel