require('dotenv').config({
    path: process.env.NODE_ENV === 'test'? 'config/.env.test' : 'config/.env'
});

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');

const logger = require('../services/logger');
const {
    date: { currentDate }
} = require('../utilities/index')

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
        // this.express.use('/api/users', require('./users/users.routes'));
        this.express.use('/api/sales', require('./sales/sales.routes'));

        this.express.get('/api/ping', (req, res) => {
            res.status(200).send({ message: 'pong' });
        });
        // this.express.use('api/associates', require('./associates/associates.routes'));
    }

    expose_static_files() {
        // this.express.use('/uploads', express.static(path.join(__dirname, '..', 'uploads/')));
        // this.express.use('/images/station', express.static(path.join(__dirname, '..', 'uploads/stations')));
        // this.express.use('/images/profiles', express.static(path.join(__dirname, '..', 'uploads/profiles')));
    }
}

module.exports = new AppController().express
