import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'


const genreModel = sequelize.define("Genre", {
    name: {
        type: DataTypes.STRING,
        min: 2,
        allowNull: false,
        unique: true
    }
})

export default genreModel