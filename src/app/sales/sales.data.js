const Sales = require('./sales.models')

module.exports = {
    create: async (sale) => {
        return await Sales.create(sale)
    },

    find: async (filter) => {
        const result = await Sales.find(filter).lean()
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
