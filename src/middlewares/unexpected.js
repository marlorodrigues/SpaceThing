const logger = require("../services/logger");

module.exports = {

    async unexpectedException(req, res, next) {
        try {
            logger.info(`${currentDate()} - Unexpected Error on route url: ${req.url}: ${req.locals.error} -> AUDIT: request ${token} - ip: ${req.ip} - method: ${req.method} - `);
            
            return res.status(500).send({ status: 'failed', message: 'Unexpected Error' });
          
        } catch (error) {
            logger.error(`${formatDateLocal()} - verify_token: ${error.message} -> AUDIT: request ${token} - ip: ${req.ip} - method: ${req.method} - url: ${req.url}`);
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token 2.' });
        }
    }

}



