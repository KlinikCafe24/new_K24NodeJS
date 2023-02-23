const express = require('express');
const router = express.Router();
const db = require('../queries');



router.post('/signup', db.signup)
router.post('/signin', db.signin)
router.patch('/update', db.editUser)
router.post('/forgot_password', db.forgetPassword)



module.exports = router;