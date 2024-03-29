const logger = require("../services/logger");
const { currentDate } = require("../utilities/date");


module.exports = {

    unexpectedException: async (req, res, next) => {
        try {
            logger.info(`${currentDate()} - Unexpected Error on route url: ${req.url}: ${req.locals.error} -> AUDIT: request ${req.authorization.token} - ip: ${req.ip} - method: ${req.method} - `);
            
            return res.status(500).send({ status: 'failed', message: 'Unexpected Error' });
          
        } catch (error) {
            logger.error(`${currentDate()} - verify_token: ${error.message} - ${error.stack}`);
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token 2.' });
        }
    },

    check_params: async (req, res, next) => {
        return next()
    }
}



