const express = require('express')
const router = express.Router()
const db = require('../queries');
const { error } = require('console')
    // const environment = process.env.NODE_ENV || 'development';
    // const configuration = require('../knex')[environment];
    // const database = require('knex')(configuration);


router.get('/validate_whatsapp/:phone_number', (req, res) => {
    const form = req.params
    db.findPhone(form).then(getPhone => {
        switch (getPhone.phone_status) {
            case false:
                db.createOTP(form)
                    // .then(async() => db.verifyOTP)
                break;
            case true:
                db.signin
                break;
            default:
                res.json({
                    status: null
                })
        }
        console.log(getPhone.phone_status);
        res.json(getPhone);
    }).catch((err) => console.log(err))
})

// async function action(req, res) {

// }
// router.post('/validate_whatsapp', validateWhatsapp);

module.exports = router