import authorModel from "./authorModel.js";
import bookModel from "./bookModel.js";
import categoryModel from "./categoryModel.js";
import genreModel from './genreModel.js'
import userModel from "./userModel.js";
import wishlistModel from "./wishlistModel.js";
import orderModel from "./orderModel.js";

export default function applyAssociations(){
    bookModel.belongsToMany(authorModel, { through: 'BookAuthor' });
    authorModel.belongsToMany(bookModel, { through: 'BookAuthor' });
    
    bookModel.belongsToMany(genreModel, { through: 'BookGenre' });
    genreModel.belongsToMany(bookModel, { through: 'BookGenre' });
    
    categoryModel.hasMany(genreModel, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE'
    });
    
    genreModel.belongsTo(categoryModel, {
        foreignKey: 'categoryId'
    });
    
    userModel.hasMany(orderModel, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    });
    
    orderModel.belongsTo(userModel, {
        foreignKey: 'userId'
    });
    
    userModel.hasOne(wishlistModel, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    });
    
    wishlistModel.belongsTo(userModel, {
        foreignKey: 'userId'
    });

    orderModel.belongsToMany(bookModel, { through: 'OrderBooks' });
    bookModel.belongsToMany(orderModel, { through: 'OrderBooks' });

    wishlistModel.belongsToMany(bookModel, { through: 'WishlistBooks' });
    bookModel.belongsToMany(wishlistModel, { through: 'WishlistBooks' });
}



