const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/SpaceThing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(e => console.log("Erro -> " + e));;

mongoose.Promise = global.Promise;

module.exports = mongoose;
