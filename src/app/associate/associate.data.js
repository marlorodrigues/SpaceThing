const Associates = require('./associate.models')

module.exports = {
    create: async (associate) => {
        return await Associates.create(associate)
    },

    find_all: async () => {
        const result = await Associates.find({})
        return result
    },

    find_one: async (id) => {
        const result = await Associates.findOne({ _id: id })
        return result
    },

    update: async (id, associate) => {
        const result = await Associates.findByIdAndUpdate(id, associate, { new: true })
        return result
    },

    delete: async (id) => {
        const result = await Associates.deleteOne({ _id: id })
        return result
    },

}
