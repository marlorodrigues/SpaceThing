require('dotenv').config({
    path: process.env.NODE_ENV === 'test'? '.env.test' : '.env'
});

//#region Requires
    const app = require('../app/app');
    const https = require('https');
    const cluster = require('cluster');
    const logger = require('./services/logger');
    const fs = require('fs');
    const { currentDate } = require('./app/helpers/index');
    const numCPUs = require('os').cpus().length + 1;
    const pm2 = require('pm2')
//#endregion

//#region Functions Useds

    const production_server = () => {
        const options = {
            key: fs.readFileSync(process.env.KEY_SSL),
            cert: fs.readFileSync(process.env.CERT_SSL)
        }
        
        const httpsServer = https.createServer(options, app)
        
        httpsServer.listen(process.env.PORT || 3000, () => {
            logger.info(`${currentDate()} - Server Running on port ${process.env.PORT || 3000} over HTTPS || Worker Id: ${cluster.worker.id}`)
        });
    }

    const development_server = () => {

        app.listen(process.env.PORT || 3000, () => {
            logger.info(`${currentDate()} - Server Running on port ${appPort} without HTTPS || Worker Id: ${cluster.worker.id}`)
        });     

        app.on('error', (...params) => {
            logger.info(`${currentDate()} - HTTP error: ${params}`)
        });

        app.on('clientError', (...params) => {
            logger.info(`${currentDate()} - ClientError error: ${params}`)
        });
    }

    const gracefull_shutdown = () => {
        logger.info(`${currentDate()} - API Node Stopped`)
        process.exit(1);
    }

    const uncaughtException = (error, origin = "unused") => {
        logger.error(`${currentDate()} - uncaughtException: ${error}`)

        pm2.restart('space_thing', (err, ret) => {
            if (err) {
                logger.error(`${currentDate()} - Error on restart API Node: ${err}`)
            }
            else {
                logger.info(`${currentDate()} - Restart API Node Success`)
                gracefull_shutdown()
            }
        });
    }

//#endregion

//#region Gracefull Shutdown
    process.on('uncaughtException', uncaughtException);
    process.on('exit', gracefull_shutdown)
//#endregion

//#region Cluster

    if (process.env.CLUSTER === "true" && cluster.isMaster) { 
        logger.info(`${currentDate()} - API Node Started`)

        for (let i = 0; i < numCPUs; i++){
            console.log(`${currentDate()} - Forking Worker ${i}`)
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            exits++;

            if (exits > 20) {
                logger.info(`${currentDate()} - API Node Stopped`)
                process.exit(1);
            }
            else {
                logger.info(`${currentDate()} - worker ${worker.process.pid} died with code: ${code}, and signal: ${signal} | Count Erros: ${exits}`);
                logger.info('Starting a new worker');
                worker_pid.push(cluster.fork())
            }
        });

    }
    else {
        try {
            if (process.env.SSL === "true") production_server();
            else development_server()
        }
        catch (error) {
            logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
            process.exit(1);
        }
    }
//#endregion
