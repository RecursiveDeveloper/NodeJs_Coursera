const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

let mailConfig;
if(process.env.NODE_ENV === 'production') {
    const options = {
        auth: {
            api_key: process.env.SENGRID_API_SECRET
        }
    }
    mailConfig = sgTransport(options);
}else{
    if(process.env.NODE_ENV === 'staging') {
        console.log('XXXXXXXXXXXXXXXXXXX');
        const options = {
            auth: {
                api_key: process.env.SENGRID_API_SECRET
            }
        }
        mailConfig = sgTransport(options);
    }else{
        const mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.etheral_user,
                pass: process.env.etheral_pwd
                /*user: 'paula26@ethereal.email',
                pass: 'zjg1VTJqZZNkzhAkCT'*/
            }
        }
    }
}



module.exports = nodemailer.createTransport(mailConfig);