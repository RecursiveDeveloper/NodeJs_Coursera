const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'paula26@ethereal.email',
        pass: 'zjg1VTJqZZNkzhAkCT'
    }
}

module.exports = nodemailer.createTransport(mailConfig);