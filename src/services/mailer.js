require('dotenv').config({
    path: process.env.NODE_ENV === 'test'? '.env.test' : '.env'
});

const nodemailer = require('nodemailer');
const logger = require('./logger');

async function createTransporter() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    return transporter
}

async function prepareMailOptions(to, subject, html) {

    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        html
    };

    return mailOptions
}

module.exports = {
    async sendEmail(to, subject, html, res) {
        try {
            const transporter = await createTransporter()
            const mailOptions = await prepareMailOptions(to, subject, html)

            transporter.sendMail(mailOptions, (err, result) => {
                if (err) {
                    logger.error(err)
                    return res.status(400).send({err});
                }
            })
        }
        catch (err) {
            logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
            return res.status(500).send({err})
        }
    },
}
