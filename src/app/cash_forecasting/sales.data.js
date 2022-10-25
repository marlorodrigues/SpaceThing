const Sales = require('../sales/sales.models')

module.exports = {
    find_flow: async (date = new Date()) => {
        const result = await Sales.find({ prediction_at: date }).lean();
        return result;
    },

}
