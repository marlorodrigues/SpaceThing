const Account = require('./account.data');

const { checkers, date, misc } = require('../../utilities/index');
const logger = require('../../services/logger');

module.exports = {
    create: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.body))
                return res.status(400).json({ message: 'Missing params' });
            
            const account = await Account.create(req.body)

            return res.status(200).send({ account });
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

            const account = await Account.find({});

            return res.status(200).send({ account });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },

    find_cash: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.query))
                return res.status(400).send({ message: 'Missing params' });

            const account = await Account.find({type: 'cash'});

            return res.status(200).send({ account });
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

            const account = await Account.update(req.body.id, req.body)

            return res.status(200).send({ account });
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

            const { account_id } = req.query;
            const account = await Sales.delete(account_id);

            return res.status(200).send({ account });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },
}
