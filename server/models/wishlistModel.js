import { DataTypes } from 'sequelize';
import sequelize from '../db/databaseConnection.js'
import userModel from './userModel.js';

const wishlistModel = sequelize.define("Wishlist", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    booksId: {
        type: DataTypes.JSON,
        allowNull: false, 
        defaultValue: []
    }
})

userModel.hasOne(wishlistModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

wishlistModel.belongsTo(userModel, {
    foreignKey: 'userId'
});

export default wishlistModel