import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'
import wishlistModel from './wishlistModel.js'
import orderModel from './orderModel.js'

const userModel = sequelize.define("User", {
    firstName: {
        type: DataTypes.STRING,
        min: 2,
        allowNull: false,
    },
    lastName: {
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
    }  
})

userModel.hasOne(wishlistModel)
// userModel.hasMany(orderModel)
// wishlistModel.belongsTo(userModel)
// orderModel.belongsTo(userModel)


export default userModel
