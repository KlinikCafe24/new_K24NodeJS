const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const db = require('./queries');
const path = require('path');
const cors = require('cors');
const RajaOngkir_apiRouter = require('./routes/rajaongkir_api')
const Midtrans_apiRouter = require('./routes/midtrans_api')
const Sendtalk_apiRouter = require('./routes/sendtalk_api')
const Users_apiRouter = require('./routes/users_api')
    // import pool from "../K24/queries";

router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(express.static(path.join(__dirname, 'public')))
router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
        extended: true
    })
)


router.use('/midtrans_api', Midtrans_apiRouter);
router.use('/sendtalk_api', Sendtalk_apiRouter);
router.use('/rajaongkir_api', RajaOngkir_apiRouter);
router.use('/users_api', Users_apiRouter);

module.exports = router;