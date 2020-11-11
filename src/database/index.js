const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:admin123@cluster0.nwsy1.mongodb.net/teste?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(e => console.log("Erro -> " + e));;

mongoose.Promise = global.Promise;

module.exports = mongoose;
