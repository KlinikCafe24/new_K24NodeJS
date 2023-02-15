const express = require('express')
const router = express.Router()
const axios = require('axios')
const crypto = require('crypto')
const otpGenerator = require('otp-generator')
const key = ""
const db = require('../queries');


router.post('/validate_whatsapp', (req, res) => {
    const number = req.body
    const validate = {
        method: 'POST',
        url: 'https://api.sendchamp.com/api/v1/whatsapp/validate',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer sendchamp_live_$2a$10$AQwd7iGiRcZvCL5QSHNI7.58JR/MH.00mVtwj0uAMARtlIUHfdJJW'
        },
        data: { phone_number: number.phone_number }
    };
    axios
        .request(validate)
        .then(function(response) {
            if (response.data.data.is_valid == false) {
                console.log("Nomor Wa Tidak Terdaftar! Harap masukkan nomor Wa yang Aktif!");
            } else {
                console.log("Nomor Wa Terdaftar");
                db.findPhone({ phone_number: number.phone_number });
                db.findByToken();
                db.authenticate() = findNumber;
                if (findNumber == phone_status.true) {
                    db.signin();
                    console.log("Login Berhasil");
                } else {
                    console.log("Gagal Login");
                    // if (response.data.data.phone_number == verify) {
                    //     // login
                    // } else {
                    // verifikasi dengan mengirim OTP ke WA
                    // function createOTP(params, callback) {
                    // const otp = otpGenerator.generate(6, {
                    //     numeric: true,
                    //     alphabets: true,
                    //     upperCase: true,
                    //     specialChars: true
                    // });
                    // const ttl = 5 * 60 * 1000;
                    // const expires = Date.now() + ttl;
                    // const data = `${response.data.data.phone_number}.${otp}.${expires}`;
                    // const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
                    // const fullHash = `${hash}.${expires}`;
                    // const send = {
                    //     method: 'POST',
                    //     url: 'https://sendtalk-api.taptalk.io/api/v1/message/send_whatsapp',
                    //     headers: {
                    //         accept: 'application/json',
                    //         'content-type': 'application/json',
                    //         'API-Key': '977e9273aa133d2550255c0a14ebff7084e3a5cda4b77d1be1e109d7909051d2'
                    //     },
                    //     data: {
                    //         phone: `${response.data.data.phone_number}`,
                    //         messageType: 'otp',
                    //         body: `Hi, Thanks for your validation. Your OTP is ${otp}`
                    //     }
                    // };

                    // console.log(`OTP = ${otp}, Expires = ${expires}, Data = ${data}, Hash = ${hash}, FullHash = ${fullHash}`);

                    // axios
                    //     .request(send)
                    //     .then(function(feedback) {
                    //         console.log(feedback.data);
                    //         if (feedback.data.data.success == true) {
                    //             console.log(`OTP has been send to ${response.data.data.phone_number}`);
                    //             res.json(response.data)
                    //         } else {
                    //             console.log('Failed send OTP')
                    //         }
                    //     })
                    //     .catch(function(error) {
                    //         console.error(error);
                    //     });
                    // return callback(null, fullHash);
                    // }
                    // Verifikasi OTP
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
                    // }
                }
            }
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
})

module.exports = router