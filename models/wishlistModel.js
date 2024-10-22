import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'
import userModel from './userModel.js';

const wishlistModel = sequelize.define("Wishlist", {
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    booksId: {
        type: [DataTypes.INTEGER],
        allowNull: false
    }
})

// wishlistModel.belongsTo(userModel)

export default wishlistModel