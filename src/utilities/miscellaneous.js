require('dotenv').config({
    path: process.env.NODE_ENV === 'test'? 'config/.env.test' : 'config/.env'
});

module.exports = {
  
    // Function to wait for a specific time
    async sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    },

    // Function to get all environment variables, with not defined, get default values
    get_environment() {
        let env = {}

        env.NODE_ENV = process.env.NODE_ENV || 'development';
        env.PORT = process.env.PORT || 3000;

        env.SSL = process.env.SSL || 'false';
        env.KEY_SSL = process.env.KEY_SSL || 'config/key.pem';
        env.CERT_SSL = process.env.CERT_SSL || 'config/cert.pem';

        env.CLUSTER = process.env.CLUSTER || 'false';
        env.USE_DB = process.env.USE_DB || 'nosql'

        env.SQL_DB_URL = process.env.SQL_DB_URL || ''
        env.SQL_DB_USER = process.env.SQL_DB_USER || ''
        env.SQL_DB_PASS = process.env.SQL_DB_PASS || ''
        env.SQL_DB_NAME = process.env.SQL_DB_NAME || ''
        env.SQL_DB_PORT = process.env.SQL_DB_PORT || ''
        env.SQL_DB_DIALECT = process.env.SQL_DB_DIALECT || 'postgres'

        env.NOSQL_DB_URL = process.env.NOSQL_DB_URL || ''
        env.NOSQL_DB_USER = process.env.NOSQL_DB_USER || ''
        env.NOSQL_DB_PASSWORD = process.env.NOSQL_DB_PASSWORD || ''
        env.NOSQL_DB_NAME = process.env.NOSQL_DB_NAME || ''
        env.NOSQL_DB_PORT = process.env.NOSQL_DB_PORT || ''
        env.NOSQL_DB_DIALECT = process.env.NOSQL_DB_DIALECT || 'mongodb'

        return env;
    }
  }