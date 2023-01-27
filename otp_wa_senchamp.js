const axios = require('axios');
const { response } = require('express');

//Validasi nomor hape yang diinput apakah sudah terdaftar di Wa atau belum
async function validateNumber() {
    const validate = {
        method: 'POST',
        url: 'https://api.sendchamp.com/api/v1/whatsapp/validate',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer sendchamp_live_$2a$10$AQwd7iGiRcZvCL5QSHNI7.58JR/MH.00mVtwj0uAMARtlIUHfdJJW'
        },
        data: { phone_number: '' }
    };

    axios
        .request(validate)
        .then(function(response) {
            console.log("Phone already active!")
            console.log(response.data);
        })
        .catch(function(error) {
            console.error(error);
        });
}

// if (axios.get(validate) != response.data) {

//Kirim kode OTP ke nomor WA yang belum aktivasi atau terdaftar pada database
async function sendOTP() {
    const send = {
        method: 'POST',
        url: 'https://api.sendchamp.com/api/v1/whatsapp/message/send',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer sendchamp_live_$2a$10$AQwd7iGiRcZvCL5QSHNI7.58JR/MH.00mVtwj0uAMARtlIUHfdJJW'
        },
        data: {
            sender: '',
            recipient: '',
            type: ''
        }
    };

    axios
        .request(send)
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.error(error);
        });
}

module.export = {
        validateNumber,
        sendOTP,
    }
    // }