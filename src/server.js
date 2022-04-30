//#region Requires
    const app = require('./app');
    const https = require('https');
    const cluster = require('cluster');
    const logger = require('./src/services/logger');
    const fs = require('fs');
    const { currentDate } = require('./src/helpers/index');
    const numCPUs = require('os').cpus().length + 1;
//#endregion

//#region Functions Useds

    const production_server = () => {
        const options = {
            key: fs.readFileSync(proces.env.KEY_SSL),
            cert: fs.readFileSync(proces.env.CERT_SSL)
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

        pm2.restart('proxy', (err, ret) => {
            if (err) {
                logger.error(`${currentDate()} - Error on restart API Node: ${err}`)
            }
            else {
                logger.info(`${currentDate()} - Restart API Node Success`)
                pm2.restart(1, (err, app) => {
                    if(err) logger.error(`${currentDate()} - Error on restart API Node: ${err}`)
                })
            }
        });
    }

//#endregion

//#region Gracefull Shutdown Master
    process.on('uncaughtException', uncaughtException);
    process.on('exit', gracefull_shutdown)
//#endregion

//#region Cluster
    if (cluster.isMaster) { 
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
            if (process.env.SSL) production_server();
            else development_server()
        }
        catch (error) {
            logger.error(`${currentDate()} - Erro on init server: ${error}`)
            process.exit(1);
        }
    }
//#endregion
