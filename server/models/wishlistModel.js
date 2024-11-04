import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'

const wishlistModel = sequelize.define("Wishlist", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

export default wishlistModel