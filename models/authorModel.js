import { DataTypes } from "sequelize";
import sequelize from "../db/databaseConnection.js";
import bookModel from "./bookModel.js";

const authorModel = sequelize.define("Author", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bookAmount: {
        type: DataTypes.INTEGER,
        min: 0,
        defaultValue: 0
    }, 
    bookList: {
        type: [DataTypes.STRING]
    }
})

// authorModel.hasMany(bookModel)
// bookModel.hasMany(authorModel)

export default authorModel