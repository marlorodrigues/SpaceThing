const Users = require('./users.models')
const Security = require('../../utilities/security')

module.exports = {
    create: async (user) => {
        const tmp = Security.generate_password(user.password)
        user.crypted_password = tmp.hash
        user.password_salt = tmp.salt

        delete user.password

        return await Users.create(user)
    },

    find_all: async () => {
        const result = await Users.find({})

        delete result.password_salt
        delete result.crypted_password

        return result
    },

    find_one: async (id) => {
        const result = await Users.findOne({ _id: id })
        
        delete result.password_salt
        delete result.crypted_password

        return result
    },

    update: async (id, user) => {
        const result = await Users.findByIdAndUpdate(id, user, { new: true })
        
        delete result.password_salt
        delete result.crypted_password

        return result
    },

    delete: async (id) => {
        const result = await Users.deleteOne({ _id: id })

        delete result.password_salt
        delete result.crypted_password

        return result
    },

    find_by_login_or_email: async (login) => {
        return await Users.findOne({ $or: [{ login: login }, { email: login }] })
    },

}
