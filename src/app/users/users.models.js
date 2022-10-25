const { get_environtment } = require('../../utilities/miscellaneous');
const { sequelize_options } = require('../../utilities/definitions');
const env = get_environtment();

var Users = undefined;

if (env.USE_DB === 'sql') {
    Users = (sequelize, DataTypes) => {
        Users = sequelize.define('users', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            complete_name: DataTypes.STRING,
            email: DataTypes.STRING,
            crypted_password: DataTypes.STRING,
            password_salt: DataTypes.STRING,
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            }
        }, sequelize_options)
    }
}
else {
    const mongoose = require('mongoose');

    const UserSchema = new mongoose.Schema([{
        login: {
            type: String,
            require: true
        },
    
        complete_name: {
            type: String,
            require: true
        },
    
        email: {
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
    
        created_at: {
            type: Date,
            default: Date.now
        },
    
        updated_at: {
            type: Date,
            default: Date.now
        }
    }]);
    
    Users = mongoose.model('users', UserSchema);
}

module.exports = Users;
