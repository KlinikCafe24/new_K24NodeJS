const express = require('express');
const router = express.Router();
const db = require('../queries');



router.post('/signup', db.signup)
router.post('/signin', db.signin)
    // router.put('/update', db.updateUser)


module.exports = router;