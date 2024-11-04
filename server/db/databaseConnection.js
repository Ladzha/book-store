import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: './db/book-store.db',
});

export default sequelize


