require('dotenv').config({
    path: process.env.NODE_ENV === 'test'? 'config/.env.test' : 'config/.env'
});

const mongoose = require('mongoose');
const logger = require('../../services/logger');

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_USED}?retryWrites=true&w=majority`, {
mongoose.connect("mongodb://admin:atma*1000@127.0.0.1:27017/admin?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 15000,
    socketTimeoutMS: 15000,
    maxIdleTimeMS: 10000
}).catch(e => logger.error(`Error: ${e.message} - ${e.stack}`));

mongoose.Promise = global.Promise;

module.exports = mongoose;
