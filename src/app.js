require('dotenv').config({
    path: process.env.NODE_ENV === 'test'? '.env.test' : '.env'
});

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./services/logger');
const { currentDate } = require('./helpers/index')

class AppController {
    constructor() {
        logger.info(`${currentDate()} - Starting API Node`)
        this.express = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.express.use(express.json())
        this.express.use(express.Router({ caseSensitive: true }));
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.json());
        this.express.use(bodyParser.json());
        this.express.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
            preflightContinue: true,
            optionsSuccessStatus: 204,
            contentType: 'application/json'
        }));
    }

    routes() {
        this.express.use('/api/things', require('./routes/things.routes'));
        this.express.use('/api/tags', require('./routes/tags.routes'));
    }
}

module.exports = new AppController().express
