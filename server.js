//#region Requires
    const express = require('express');
    const cors = require('cors');
    const https = require('https');
    const bodyParser = require('body-parser');
    const cluster = require('cluster');
    const logger = require('./src/services/logger');
    const fs = require('fs');
    const { currentDate } = require('./src/helpers/index');
//#endregion

//#region Variables
    const numCPUs = require('os').cpus().length + 1;
//#endregion

var httpsServer = false;
const appPort = 3200;

//#region Express    
    const app = express();

    app.use(express.Router({ caseSensitive: true }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
        preflightContinue: true,
        optionsSuccessStatus: 204,
        contentType: 'application/json'
    }));

    // app.use('/api/auth', require('./src/routes/auth.routes'));
    app.use('/api/things', require('./src/routes/things.routes'));
    app.use('/api/tags', require('./src/routes/tags.routes'));
//#endregion

//#region Shared Functions

    const production_server = () => {
        const options = {
            key: fs.readFileSync('/etc/ssl/wildcard.key.pem'),
            cert: fs.readFileSync('/etc/ssl/wildcard.pem')
        }
        
        httpsServer = https.createServer(options, app)
        
        httpsServer.listen(appPort, () => {
            logger.info(`${currentDate()} - Server Running on port ${appPort} over HTTPS || Worker Id: ${cluster.worker.id}`)
        });
    }

    const development_server = () => {

        app.listen(appPort, () => {
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

    const uncaughtException = () => {
        logger.info(`${currentDate()} - Restarting API Node`)

        pm2.restart('proxy', (err, ret) => {
            if (err) {
                logger.error(`${currentDate()} - Error on restart API Node: ${err}`)
            }
            else {
                logger.info(`${currentDate()} - Restart API Node Success`)
            }
        });
    }

//#endregion

//#region Gracefull Shutdown Master
    process.on('uncaughtException', uncaughtException);
    process.on('exit', gracefull_shutdown)
//#endregion

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
    if (httpsServer) production_server();
    else development_server()
}
catch (error) {
    logger.error(`${currentDate()} - Erro on init server: ${error}`)
    process.exit(1);
}
}

process.on('beforeExit', gracefull_shutdown)
process.on('exit', gracefull_restart)
