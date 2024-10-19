import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const bookModel = sequelize.define("Book", {
    title: {
        type: DataTypes.STRING
    }
})

// id (уникальный идентификатор)
// title (название книги)
// author (автор)
// price (цена)
// genre (жанр)
// description (описание)
// stock (количество на складе)
// createdAt (дата добавления)

export default bookModel