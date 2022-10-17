require('dotenv').config({
    path: process.env.NODE_ENV === 'test'? '.env.test' : '.env'
});

module.exports = {
    host: process.env.SQL_DB_HOST,
    username: process.env.SQL_DB_USER,
    password: process.env.SQL_DB_PASS,
    database: process.env.SQL_DB_NAME,
    dialect: process.env.SQL_DB_DIALECT || 'postgres',
    storage: './__tests__/database.sqlite',
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}