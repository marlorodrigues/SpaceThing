const Account = require('./account.models');
const { date, misc } = require('../../utilities/index');

module.exports = {
    create: async (account) => {
        return await Account.create(account);
    },

    find: async (filter) => {
        const result = await Account.find(filter).lean();
        return result;
    },

    update: async (id, account) => {
        account.update_at = date.new_date();
        const result = await Account.findByIdAndUpdate(id, {$set: account}, { new: true });
        return result
    },

    delete: async (id) => {
        const result = await Account.deleteOne({ _id: id });
        return result
    },

}