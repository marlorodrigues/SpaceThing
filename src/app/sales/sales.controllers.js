const Sales = require('./sales.data');
const Account = require('../account/account.data');

const { checkers, date, misc } = require('../../utilities/index');
const logger = require('../../services/logger');

const credit_card = 30
const duplicate = 30
const debit_card = 3

const adjustments = (body) => {
    if(body.origin == 'credit_card')
        body.prediction_at = date.add_day(credit_card)

    if(body.origin == 'debit_card')
        body.prediction_at = date.add_day(debit_card)

    if(body.origin == 'duplicate')
        body.prediction_at = date.add_day(duplicate)

    if(body.origin == 'cash')
        body.prediction_at = date.today()

    console.log('predict to received at', body.prediction_at);

    return body;
}

module.exports = {
    create: async (req, res, next) => {
        var _id = undefined
        var _account_id = undefined
        var old_value = undefined

        try {
            if (!checkers.check_params(req.body))
                return res.status(400).json({ message: 'Missing params' });

            const sale = await Sales.create(adjustments(req.body));

            if(sale){
                _id = sale.id;

                const account = await Account.find({ type: sale.received_on });

                if(!account || account.length == 0){
                    res.status(404).json({ message: 'Method for receive not found' });
                    throw new Error('Method for receive not found')
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

    find_futures_pay: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.query))
                return res.status(400).send({ message: 'Missing params' });

            const sales = await Sales.find({
                prediction_at: {
                    $gt: date.add_day(1)
                }
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

            const result = await Sales.find({
                created_at: {
                    $gt: date.today()
                },
                type: 'entry'
            });

            var total_sale = 0.0;
            var received_values = [];
			var received_dates = [];
			var future_values = [];
			var future_dates = [];

            result.map(sale => {
                if(sale.prediction_at > sale.create_at){
					future_values.push(sale.value);
					future_dates.push((sale.create_at || sale.created_at));
				}
				else {			
					received_values.push(sale.value);
					received_dates.push((sale.create_at || sale.created_at));
				}

				total_sale += sale.value;
            })

            return res.status(200).send({ 
                amount: total_sale,
                future: {
                    values: future_values,
                    dates: future_dates
                },
                current: {
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
