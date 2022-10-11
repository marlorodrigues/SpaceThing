const logger = require('../../services/logger');
const { currentDate } = require('../../helpers/index');
const { Pool } = require('pg');
const database = require('');
const userPassword = `${encodeURIComponent(database.password)}`;
const database_table = `${database.environment}` 
const max_clients = 25

const pool = new Pool({
    connectionString: `postgres://${database.user}:${userPassword}@${database.host}:${database.port}/${database_table}`,
    max: max_clients,
    min: 1,
    idleTimeoutMillis: 10000,
    allowExitOnIdle: true,
});

//#region Listeners

pool.on('error', (err, client) => {
    logger.error('Unexpected error on idle client', err)
})

//#endregion

module.exports = {
    async executeQuery(query, schema = 'main') {
        try {
            await pool.query(`SET search_path TO '${schema}', main;`)

            const res = await pool.query(query)

            return {
                rows: res.rows,
                error: res.rowCount === 0 ? "Nothing changed" : "None",
            }
        } catch (error) {
            logger.error(`${currentDate()} - ${query} - ${error.message} - ${error.stack}`)
            
            return {
                rows: [],
                error
            }
        }
    },

    async close() {
        try {
            await pool.end()    
        } catch (error) {
            logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
        }
    }
};