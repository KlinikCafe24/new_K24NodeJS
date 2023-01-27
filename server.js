const wa = require('@open-wa/wa-automate');
const otpGenerator = require('otp-generator');
const http = require('http');
const express = require('express');
const app = express();
const axios = require('axios');
const crypto = require('crypto');
const key = "";
const server = http.createServer(app);


app.use(express.urlencoded({
    extended: true,
}));


// // otpGenerator.generate(6, { upperCase: false, specialChars: false });
// // wa.create().then(client => start(client));

// // function start(client) {
// //     whatsappi = client;
// //     // client.onMessage(async message => {
// //     //     if (message.body === 'Hi') {
// //     //         await client.sendText(message.from, '👋 Hello!');
// //     //     }
// //     // })
// // };


// // app.get('/', (req, res) => {
// //     res.sendFile('public/index.html', {
// //         root: __dirname
// //     })
// // });
// app.post('/verifikasi', (req, res) => {
//     var status = 0;
//     var message = null;
//     var phone = req.body.phone;
//     if (phone) {
//         var pesan = 'Kode verifikasi register anda adalah ' + Math.floor(Math.random() * 10000);
//         whatsappi.sendText(phone + '@c.us', pesan).then((response) => {
//             status = 1;
//             message = "Berhasil dikirim";
//             console.log(pesan);
//         }).catch((err) => {
//             message = "Ada error " + err;
//         });
//     }
//     if (status == 1) {
//         axios.post('https://sendtalk-api.taptalk.io/api/v1/message/send_whatsapp').then(function(response) {
//             res.status(200).json({
//                 status: status,
//                 message: message,
//             })
//         })
//     }
//     // axios.post('https://y1jeig5s.directus.app/items/user_data').then(function(response) {
//     // res.status(200).json({
//     //     status: status,
//     //     message: message,
//     //     // data: response.phone
//     // })
// });
// // .catch(function(error) {
// //     res.status(404).json({
// //         message: error.message
// //     })
// // })
// // });

// // app.get('/data_user', async(req, res) => {
// //     axios.get('https://y1jeig5s.directus.app/items/user_data').then(function(response) {
// //             res.status(200).json({
// //                 status: 1,
// //                 data: response.data
// //             })
// //         })
// //         .catch(function(error) {
// //             res.status(404).json({
// //                 message: error.message
// //             })
// //         })
// // });

async function createOtp(params, callback) {
    const otp = otpGenerator.generate(4, {
        alphabets: false,
        upperCase: false,
        specialChars: false
    });
    const ttl = 5 * 60 * 1000;
    const expires = Date.now() + ttl;
    const data = `${params.phone}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
    const fullHash = `${hash}.${expires}`;
    console.log(`Your OTP is ${otp}`);
    return callback(null, fullHash);
}

async function verifyOTP(params, callback) {
    let [hashValue, expires] = params.hash.split('.');
    let now = Date.now();
    if (now > parseInt(expires)) return callback("OTP Expired");
    let newCalculateHash = crypto.createHmac("sha256", key).update(data).digest("hex");

    if (newCalculateHash === hashValue) {
        return callback(null, "Success");
    } else {
        return callback("Invalid OTP")
    }
}

module.export = {
    createOtp,
    verifyOTP,
}

server.listen(8087, () => console.log('Berhasil Masuk Server'));

// Requiring module
// const express = require("express");
const fs = require("fs");
var path = require('path');

// const app = express();

function authentication(req, res, next) {
    var authheader = req.headers.authorization;
    console.log(req.headers);

    if (!authheader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }

    var auth = new Buffer.from(authheader.split(' ')[1],
        'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    if (user == 'admin' && pass == 'password') {
        // If Authorized user
        next();
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }

}

// First step is the authentication of the client
app.use(authentication)
app.use(express.static(path.join(__dirname, 'public')));

// // Server setup
// app.listen((8087), () => {
//     console.log("Server is Running ");
// })