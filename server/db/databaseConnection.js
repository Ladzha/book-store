import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: './db/book-store.db',
    // host: ":memory:"
});

export default sequelize


