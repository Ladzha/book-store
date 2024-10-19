import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

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

export default userModel