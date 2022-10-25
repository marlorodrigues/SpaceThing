const Sales = require('./sales.models');
const { date, misc } = require('../../utilities/index');

module.exports = {
    create: async (sale) => {
        return await Sales.create(sale);
    },

    find: async (filter) => {
        const result = await Sales.find(filter).lean();
        return result;
    },

    update: async (id, sale) => {
        sale.update_at = date.new_date();
        const result = await Sales.findByIdAndUpdate(id, { $set: sale }, { new: true });
        return result
    },

    delete: async (id) => {
        const result = await Sales.deleteOne({ _id: id });
        return result
    },

}
