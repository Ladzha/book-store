import { DataTypes } from "sequelize";
import sequelize from "../db/databaseConnection.js";

const authorModel = sequelize.define("Author", {
    name: {
        type: DataTypes.STRING,
        min: 2,
        allowNull: false,
    },
    bookAmount: {
        type: DataTypes.INTEGER,
        min: 0,
        defaultValue: 0
    }, 
    booksId: {
        type: DataTypes.JSON,
        allowNull: false, 
        defaultValue: []
    }
})


export default authorModel