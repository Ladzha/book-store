import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'


const wishlistModel = sequelize.define("Wishlist", {
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bookId: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default wishlistModel