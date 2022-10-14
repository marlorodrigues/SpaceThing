const mongoose = require('../../database/mongodb/index');

const UserSchema = new mongoose.Schema([{

    login: {
        type: String,
        require: true
    },

    crypted_password: {
        type: String,
        require: true
    },

    password_salt: {
        type: String,
        require: true
    },

    createAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
}]);

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
