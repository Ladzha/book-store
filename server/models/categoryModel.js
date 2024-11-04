import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'

const categoryModel = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING,
        min: 3,
        allowNull: false,
        unique: true
    }
})

export default categoryModel