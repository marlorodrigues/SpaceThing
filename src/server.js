require('dotenv').config({
    path: process.env.NODE_ENV === 'test'? 'config/.env.test' : 'config/.env'
});

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)

//#region Requires
    const app = require('./app/app');
    const https = require('https');
    const cluster = require('cluster');
    const logger = require('./services/logger');
    const fs = require('fs');
    const { currentDate } = require('./utilities/date');
    const helper = require('./utilities/miscellaneous');
    const numCPUs = require('os').cpus().length + 1;
    const pm2 = require('pm2');
    const env = helper.get_environtment()
//#endregion

//#region Functions Useds

    const production_server = () => {
        const options = {
            key: fs.readFileSync(env.KEY_SSL),
            cert: fs.readFileSync(env.CERT_SSL)
        }
        
        const httpsServer = https.createServer(options, app)
        
        httpsServer.listen(env.PORT || 3000, () => {
            logger.info(`${currentDate()} - Server Running on port ${env.PORT || 3000} over HTTPS || Worker Id: ${cluster.worker.id}`)
        });
    }

    const production_server_v2 = () => {
        
    }

    const development_server = () => {

        app.listen(env.PORT, () => {
            logger.info(`${currentDate()} - Server Running on port ${env.PORT} without HTTPS!`)
        });     

        app.on('error', (...params) => {
            logger.info(`${currentDate()} - HTTP error: ${params}`)
        });

        app.on('clientError', (...params) => {
            logger.info(`${currentDate()} - ClientError error: ${params}`)
        });
    }

//#endregion


//#region Cluster

    if (env.CLUSTER == "true" && cluster.isMaster) { 
        logger.info(`${currentDate()} - Master ${process.pid} is running`);

        for (let i = 0; i < numCPUs; i++){
            console.log(`${currentDate()} - Forking Worker ${i}`)
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            logger.info(`${currentDate()} - Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
            logger.info('Starting a new worker');
            cluster.fork();
        });

    }
    else {
        try {
            if (env.SSL === "true") production_server();
            else development_server()
        }
        catch (error) {
            logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
            process.exit(1);
        }
    }
//#endregion

//#region Gracefull Shutdown
    process.on('uncaughtException', (error, origin = "unused") => {
        logger.error(`${currentDate()} - Uncaught Exception`)
        logger.error(`***********************************`)
        logger.error(`${currentDate()} - Name: ${error.name}`)
        logger.error(`${currentDate()} - Message: ${error.message}`)
        logger.error(`${currentDate()} - Stack: ${error.stack}`)
        logger.error(`${currentDate()} - Origin: ${origin}`)
        logger.error(`***********************************`)
        process.exit(1);
    });

    process.on('unhandledRejection', (error, origin = "unused") => {
        logger.error(`${currentDate()} - Unhandled Rejection`)
        logger.error(`***********************************`)
        logger.error(`${currentDate()} - Name: ${error.name}`)
        logger.error(`${currentDate()} - Message: ${error.message}`)
        logger.error(`${currentDate()} - Stack: ${error.stack}`)
        logger.error(`${currentDate()} - Origin: ${origin}`)
        logger.error(`***********************************`)
        process.exit(1);
    });
    
    // Exit gracefully on ctrl+c event
    process.on('exit', () => {
        logger.info(`${currentDate()} - API Node Stopped`)
        process.exit(1);
    })
//#endregion
