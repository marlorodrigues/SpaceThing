const logger = require("../services/logger");
const jwt = require('jsonwebtoken');
// const { token_hash } = require('../../config/.secrets/secrets.json');
const { currentDate } = require('../utilities/date')

module.exports = {

    async verify_token(req, res, next) {
        try {
            req.locals = {};

            console.log(req.method ,"- Going to",  req.baseUrl+req.url);
            return next()

            if (!token) return 'No token provided.'

            const decoded = jwt.decode(token, token_hash);

            if (!decoded) return 'Failed to authenticate token.'

            return true
        } catch (error) {
            logger.error(`${currentDate()} - verify_token: ${error.message} -> AUDIT: request ${token} - ip: ${req.ip} - method: ${req.method} - url: ${req.url}`);
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token 2.' });
        }
    }

}



