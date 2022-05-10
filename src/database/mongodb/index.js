require('dotenv').config({
    path: process.env.NODE_ENV === 'test'? '.env.test' : '.env'
});

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_USED}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    connectTimeoutMS: 15000,
    socketTimeoutMS: 15000,
    maxIdleTimeMS: 10000
}).catch(e => console.log("Erro -> " + e));;

mongoose.Promise = global.Promise;

module.exports = mongoose;
