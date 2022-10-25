const Account = require('./account.models');

module.exports = {
    create: async (sale) => {
        return await Account.create(sale);
    },

    find: async (filter) => {
        const result = await Account.find(filter).lean();
        return result;
    },

    update: async (id, account) => {
        sale.update_at = date.new_date();
        const result = await Account.findByIdAndUpdate(id, {$set: account}, { new: true });
        return result
    },

    delete: async (id) => {
        const result = await Account.deleteOne({ _id: id });
        return result
    },

}