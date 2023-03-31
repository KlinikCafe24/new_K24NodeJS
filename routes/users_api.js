const express = require('express');
const router = express.Router();
const db = require('../users/queries');


router.get('/get_user/:id', db.get_user)
router.post('/signup', db.signup)
router.post('/signin', db.signin)
router.patch('/update/:id', db.editUser)
router.post('/forgot_password', db.forgetPassword)
router.post('/reset_password/:id', db.reset_password)
    // router.post('/hashingOTP', db.hashingOTP)
router.post('/validateOTP_email/:email', db.validateOTP_email)
router.post('/verifyOTP_email/:email', db.verifyOTP_email)
router.post('/verifyOTP_phone/:phone_number', db.verifyOTP_phone)
router.post('/create_otp', db.createOTP)

module.exports = router;