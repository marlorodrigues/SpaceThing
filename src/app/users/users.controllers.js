const Users = require('./users.data');
const { checkers, date, misc } = require('../../utilities/index');
const logger = require('../../services/logger');

module.exports = {
    create_user: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.body))
                return res.status(400).json({ message: 'Missing params' });

            const { name, email, password } = req.body;
            const user = await Users.create({ name, email, password });
            
            return res.status(200).send({ user });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },

    find_one: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.params))
                return res.status(400).json({ message: 'Missing params' });

            const { user_id } = req.params;
            const user = await Users.find_one(user_id);
            
            return res.status(200).send({ user });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },

    find_all: async (req, res, next) => {
        try {
            const users = await Users.find_all();
            
            return res.status(200).send({ users });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },

    update_user: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.body))
                return res.status(400).json({ message: 'Missing params' });

            const { name, email, password } = req.body;
            const user = await Users.update({ name, email, password });
            
            return res.status(200).send({ user });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },

    delete_user: async (req, res, next) => {
        try {
            if (!checkers.check_params(req.params))
                return res.status(400).json({ message: 'Missing params' });

            const { user_id } = req.params;
            const user = await Users.delete(user_id);

            return res.status(200).send({ user });
        } catch (error) {
            logger.error(`${date.currentDate()} -  ${error.message} - ${error.stack}`);
            req.locals.error = error;
            return next();
        }
    },
}
