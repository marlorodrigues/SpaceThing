require('dotenv').config({
    path: process.env.NODE_ENV === 'test'? 'config/.env.test' : 'config/.env'
});

const mongoose = require('mongoose');
const logger = require('../../services/logger');

const { get_environment } = require('../../utilities/miscellaneous');
const environment = get_environment();

mongoose.connect(`mongodb+srv://${environment.NOSQL_DB_USER}:${environment.NOSQL_DB_PASSWORD}@${environment.NOSQL_DB_URL}/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 15000,
    socketTimeoutMS: 15000,
    maxIdleTimeMS: 10000
}).catch(e => logger.error(`Error: ${e.message} - ${e.stack}`));

mongoose.Promise = global.Promise;

module.exports = mongoose;
