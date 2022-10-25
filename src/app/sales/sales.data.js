const Sales = require('./sales.models')

module.exports = {
    create: async (sale) => {
        return await Sales.create(sale)
    },

    find_all: async () => {
        const result = await Sales.find({})
        return result
    },

    find_one: async (id) => {
        const result = await Sales.findOne({ _id: id })
        return result
    },

    update: async (id, sale) => {
        const result = await Sales.findByIdAndUpdate(id, sale, { new: true })
        return result
    },

    delete: async (id) => {
        const result = await Sales.deleteOne({ _id: id })
        return result
    },

}
