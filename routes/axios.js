const express = require('express');
const router = express.Router();
const controller = require('./controller/axios');

router.get('/', controller.axios.getAll);
module.exports = router;