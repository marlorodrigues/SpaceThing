const Sales = require('./balance.data');
const Account = require('../account/account.data');

const { checkers, date, misc } = require('../../utilities/index');
const logger = require('../../services/logger');

/*
    Where duplicates will be ?

*/

module.exports = {
    create: async (req, res, next) => {
        var _id = undefined
        var _account_id = undefined
        var old_value = undefined

        try {
            console.log('Received', req.body);
            if (!checkers.check_params(req.body))
                return res.status(400).json({ message: 'Missing params' });

            const sale = await Sales.create(req.body);

            if(sale){
                _id = sale.id;
 
                const account = await Account.find({ type: sale.origin });

                if(!account || account.length == 0){
                    res.status(400).json({ message: 'Method for receive not found' });
                    throw new Error('Method for receive not found');
                }

                _account_id = account[0]._id;
                old_value = account[0].value;
                const new_value = account[0].value + sale.value;

                await Account.update(account[0]._id, { value: new_value }, { new: true });

                return res.status(200).send({ sale });
            }
            else {
                return res.status(400).json({ sale: 'Invalid sale' });
            }

        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            next();

            var sale_deleted = undefined
            var _account_ = undefined

            sale_deleted = await Sales.delete(_id);
            logger.info(`${date.currentDate()} -  Sale deleted! ${JSON.stringify(sale_deleted)}`);

            if(old_value != undefined && _account_id){
                _account_ = await Account.update(_account_id, { value: old_value }, { new: true });
                logger.info(`${date.currentDate()} -  Account reestablished old value (${old_value}) ! ${JSON.stringify(_account_)}`);
            }
        }
    },

    history: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.query))
                return res.status(400).send({ message: 'Missing params' });

            const filter = req.query || {};
            const _history = await Sales.find_sort(filter, {
                create_at: -1
            });

            return res.status(200).send({ history: _history });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },

    find_futures_sales: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.query))
                return res.status(400).send({ message: 'Missing params' });

            const sales = await Sales.find({
                prediction_at: {
                    $gt: date.add_day(1)
                },
                type: 'entry'
            });

            return res.status(200).send({ sales });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },

    find_current_sales: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.query))
                return res.status(400).send({ message: 'Missing params' });

            const filter = date.init_and_end_today()
            const result = await Sales.find({
                prediction_at: {
                    $gte: filter.init,
                    $lte: filter.end
                },
                type: 'entry'
            });

            var total_sale = 0.0;
            var total_future = 0.0;
            var total_current = 0.0;
            var received_values = [];
			var received_dates = [];
			var future_values = [];
			var future_dates = [];

            result.map(sale => {
                if(sale.prediction_at > sale.create_at){
					future_values.push(sale.value);
					future_dates.push((sale.prediction_at));
                    total_future += sale.value;
				}
				else {			
					received_values.push(sale.value);
					received_dates.push(sale.created_at);
                    total_current += sale.value;
				}

				total_sale += sale.value;
            })

            return res.status(200).send({ 
                amount: total_sale,
                future: {
                    amount: total_future,
                    values: future_values,
                    dates: future_dates
                },
                current: {
                    amount: total_current,
                    values: received_values,
                    dates: received_dates 
                }
            });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },

    find_current_expenses:async (req, res, next) => {
        try {
            if (!checkers.check_params(req.query))
                return res.status(400).send({ message: 'Missing params' });

            const filter = date.init_and_end_today()
            const result = await Sales.find({
                prediction_at: {
                    $gte: filter.init,
                    $lte: filter.end
                },
                type: 'outflow'
            });

            var total_expense = 0.0;
            var total_future = 0.0;
            var total_current = 0.0;
            var received_values = [];
			var received_dates = [];
			var future_values = [];
			var future_dates = [];

            result.map(expense => {
                if(expense.prediction_at > expense.create_at){
					future_values.push(expense.value);
					future_dates.push((expense.prediction_at));
                    total_future += expense.value;
				}
				else {			
					received_values.push(expense.value);
					received_dates.push(expense.created_at);
                    total_current += expense.value;
				}

				total_expense += expense.value;
            })

            return res.status(200).send({ 
                amount: total_expense,
                future: {
                    amount: total_future,
                    values: future_values,
                    dates: future_dates
                },
                current: {
                    amount: total_current,
                    values: received_values,
                    dates: received_dates 
                }
            });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },

    update: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.body))
                return res.status(400).json({ message: 'Missing params' });
            
            if (!req.body.id)
                return res.status(400).json({ message: 'Missing id' });

            const sale = await Sales.update(req.body.id, req.body)

            return res.status(200).send({ sale });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },

    delete: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.query))
                return res.status(400).json({ message: 'Missing params' });

            const { sale_id } = req.query;
            const sale = await Sales.delete(sale_id);

            return res.status(200).send({ sale });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },
}
