const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'dewarangga.developer@gmail.com',
        pass: 'Projectsukses100%',
    },
});
transporter.verify().then(console.log).catch(console.error);