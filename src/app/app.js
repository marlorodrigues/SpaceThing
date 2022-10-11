require('dotenv').config({
    path: process.env.NODE_ENV === 'test'? '.env.test' : '.env'
});

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('../src/services/logger');
const { currentDate } = require('./helpers/index')

class AppController {
    constructor() {
        logger.info(`${currentDate()} - Starting API Node`)
        this.express = express()
        this.middlewares()
        this.expose_static_files()
        this.routes()
    }

    middlewares() {
        this.express.set('view cache', true);
        this.express.use(compression());
        this.express.use(express.json())
        this.express.use(express.Router({ caseSensitive: true }));
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.json());
        this.express.use(bodyParser.json());
        this.express.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'Content-Encoding', "Accept-Encoding", 'Cache-Control'],
            preflightContinue: true,
            optionsSuccessStatus: 204,
            contentType: ['application/json', 'multipart/form-data']
        }));
    }

    routes() {
        this.express.use('/api/things', require('./routes/things.routes'));
        this.express.use('/api/tags', require('./routes/tags.routes'));
    }

    expose_static_files() {
        this.express.use('/images/equip', express.static(path.join(__dirname, '..', 'public/equip')));
        this.express.use('/images/station', express.static(path.join(__dirname, '..', 'public/stations')));
        this.express.use('/images/profiles', express.static(path.join(__dirname, '..', 'public/profiles')));
    }
}

module.exports = new AppController().express
