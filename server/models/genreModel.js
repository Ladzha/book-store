import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'

const genreModel = sequelize.define("Genre", {
    name: {
        type: DataTypes.STRING,
        min: 2,
        allowNull: false,
        unique: true
    },
    bookAmount: {
        type: DataTypes.INTEGER,
        min: 0,
        defaultValue: 0
    }
})

export default genreModel