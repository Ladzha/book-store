import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'

const userModel = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        min: 2,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "USER"
    },
    clientLevel: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "NEW CLIENT"
    }
})

export default userModel
