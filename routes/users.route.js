const express = require('express');
const router = express.Router();

router.post("/createOTP", users.controller.createOTP);
router.post("/verifyOTP", users.controller.verifyOTP);

module.exports = router;