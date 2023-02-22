const nodemailer = require('nodemailer');
const { MailtrapClient } = require("mailtrap");

const transport = nodemailer.createTransport({
    host: "mail.klinikcafe24.com",
    port: 465,
    auth: {
        user: "visipentabersama@klinikcafe24.com",
        pass: "ProjectWebsite100%"
    },
    secure: true
});

transport.sendMail({
        from: "visipentabersama@klinikcafe24.com",
        to: "dewarangga.developer@gmail.com",
        subject: "Hello from Mailtrap!",
        text: "Welcome to Mailtrap Sending!",
    })
    .then(console.log, console.error);