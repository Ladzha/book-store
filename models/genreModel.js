import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const genreModel = sequelize.define("Genre", {
    name: {
        type: DataTypes.STRING,
        min: 2,
        allowNull: false,
        unique: true
    }
})

export default genreModel