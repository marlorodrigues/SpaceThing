const Sales = require('./sales.data');
const Account = require('../account/account.data');

const { checkers, date, misc } = require('../../utilities/index');
const logger = require('../../services/logger');

module.exports = {
    create_sale: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.body))
                return res.status(400).json({ message: 'Missing params' });
            
            const sale = await Sales.create(req.body)

            const account = await Account.find({ type: sale.origin });
            const new_value = account[0].value + sale.value;

            var tmp = await Account.update(account[0]._id, { value: new_value }, { new: true });

            logger.info(`Account updated! New value on '${sale.origin}' is ${tmp.value}`);

            return res.status(200).send({ sale });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },

    find: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.query))
                return res.status(400).send({ message: 'Missing params' });

            const filter = req.query || {};
            const sales = await Sales.find(filter);

            return res.status(200).send({ sales });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },

    update_sale: async (req, res, next) => {
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

    delete_sale: async (req, res, next) => {
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
