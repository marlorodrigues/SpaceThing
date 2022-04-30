const logger = require("../services/logger");
const jwt = require('jsonwebtoken');
// const { token_hash } = require('../../config/.secrets/secrets.json');
const { formatDateLocal } = require('../helpers/index')

module.exports = {

    async verify_token(token, res) {
        try {
            return true

            if (!token) return 'No token provided.'

            const decoded = jwt.decode(token, token_hash);

            if (!decoded) return 'Failed to authenticate token.'

            return true
        } catch (error) {
            logger.error(`${formatDateLocal()} - verify_token: ${error} -> AUDIT: request ${token} - ip: ${req.ip} - method: ${req.method} - url: ${req.url}`);
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token 2.' });
        }
    }

}



