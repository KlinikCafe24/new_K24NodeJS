const express = require('express')
const router = express.Router()
const axios = require('axios')
const crypto = require('crypto')
const key = ""
const db = require('../queries');
// const environment = process.env.NODE_ENV || 'development';
// const configuration = require('../knex')[environment];
// const database = require('knex')(configuration);


const validateWhatsapp = (req, res) => {
    const form = req.body
    console.log(form.phone_number);
    // const findPhone = (number) => {
    //     return database.raw("SELECT * FROM directus_users WHERE phone = ?", [number.phone_number])
    //         .then((data) => data.rows[0])
    // }
    // let phone
    // findPhone(number)
    //     .then(foundPhone => {
    //         phone = foundPhone
    //         return res.status(200).json(phone)
    //     })
    // if (findPhone) {

    // } else {

    // }

    // function createOTP(params, callback) {
    //     const otp = otpGenerator.generate(6, {
    //         numeric: true,
    //         alphabets: true,
    //         upperCase: true,
    //         specialChars: true
    //     });
    //     const ttl = 5 * 60 * 1000;
    //     const expires = Date.now() + ttl;
    //     const data = `${number.phone_number}.${otp}.${expires}`;
    //     const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
    //     const fullHash = `${hash}.${expires}`;
    //     const send = {
    //         method: 'POST',
    //         url: 'https://sendtalk-api.taptalk.io/api/v1/message/send_whatsapp',
    //         headers: {
    //             accept: 'application/json',
    //             'content-type': 'application/json',
    //             'API-Key': '977e9273aa133d2550255c0a14ebff7084e3a5cda4b77d1be1e109d7909051d2'
    //         },
    //         data: {
    //             phone: `${number.phone_number}`,
    //             messageType: 'otp',
    //             body: `Hi, Thanks for your validation. Your OTP is ${otp}`
    //         }
    //     };

    //     console.log(`OTP = ${otp}, Expires = ${expires}, Data = ${data}, Hash = ${hash}, FullHash = ${fullHash}`);

    //     axios
    //         .request(send)
    //         .then(function(feedback) {
    //             console.log(feedback.data);
    //             if (feedback.data.data.success == true) {
    //                 console.log(`OTP has been send to ${number.phone_number}`);
    //                 res.json(response.data)
    //             } else {
    //                 console.log('Failed send OTP')
    //             }
    //         })
    //         .catch(function(error) {
    //             console.error(error);
    //         });
    //     return callback(null, fullHash);
    // }

    // function verifyOTP(params, callback) {
    //     let [hashValue, expires] = params.hash.split('.');
    //     let now = Date.now();
    //     if (now > parseInt(expires)) return callback("OTP Expired");
    //     let newCalculateHash = crypto.createHmac("sha256", key).update(data).digest("hex");

    //     if (newCalculateHash === hashValue) {
    //         return callback(null, "Success");
    //     } else {
    //         return callback("Invalid OTP")
    //     }
    // }
}



router.post('/validate_whatsapp', validateWhatsapp);

module.exports = router