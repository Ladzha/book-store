import authorModel from "./authorModel.js";
import bookModel from "./bookModel.js";
import categoryModel from "./categoryModel.js";
import genreModel from 'genreModel.js'
import userModel from "./userModel.js";
import wishlistModel from "./wishlistModel.js";
import orderModel from "./orderModel.js";

categoryModel.hasMany(genreModel, {
    foreignKey: 'genreId',
    onDelete: 'CASCADE'
})

genreModel.belongsTo(categoryModel, {
    foreignKey: 'categoryId',
    onDelete: 'CASCADE'
})

bookModel.hasMany(authorModel, {
    foreignKey: 'authorId',
    onDelete: 'CASCADE'
})

bookModel.hasMany(genreModel, {
    foreignKey: 'authorId',
    onDelete: 'CASCADE'
})