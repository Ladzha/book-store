import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

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