const Sales = require('./balance.models');
const { date, misc } = require('../../utilities/index');

const format_sale = function(sale){
    sale.received_on = sale.received_on.toLowerCase();

    if(sale.received_on == 'pix' || sale.received_on == 'credit_card' || sale.received_on == 'debit_card'){
        sale.origin = 'bank';
    }
    else if(sale.received_on == 'duplicate'){
        sale.origin = 'bank'; //*****
    }
    else if(sale.received_on == 'cash'){
        sale.origin = 'cash';
    }

    return sale
}

module.exports = {
    create: async (data, sale = true) => {

        if(sale){
            if(data.installment <= 1){
                return await Sales.create(format_sale(data));
            }
            else{
                // this.createInstallmentSale(sale);
            }
        }
        
    },

    find: async (filter) => {
        const result = await Sales.find(filter).lean();
        return result;
    },

    find_sort: async (filter, sort) => {
        const result = await Sales.find(filter).sort(sort).lean();
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

    createInstallmentSale: async (sales) => {
        const session = await Sales.startSession();

        try{
            session.startTransaction();

            const opts = { session };

            for (const sale of sales) {
                format_sale(sale)
            }


            session.endSession();
            return true;
        }
        catch(error){
            console.log(error.message, error.stack);
            await session.abortTransaction();
            session.endSession();

            return false;
        }
    }

}
