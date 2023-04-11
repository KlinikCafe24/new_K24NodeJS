const express = require('express');
const app = express();
const hostname = "127.0.0.1"
const port = 3002;
const Shipper_apiRouter = require('./routes/shipper_api')
const RajaOngkir_apiRouter = require('./routes/rajaongkir_api')
const Midtrans_apiRouter = require('./routes/midtrans_api')
const Users_apiRouter = require('./routes/users_api')
const Xendit_apiRouter = require('./routes/xendit_api')
const Product_apiRouter = require('./routes/product_api')
const Moota_apiRouter = require('./routes/moota_api')
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(express.urlencoded({
    extended: true,
}));

require('dotenv').config();
const {
    DB_USER,
    DB_HOST,
    DB_DATABASE,
    DB_PASSWORD,
    DB_PORT,
} = process.env;

const { Pool } = require("pg");
const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT
});

pool.connect((err) => {
    if (err) throw err;
    console.log('Postgre Connected...');
});

app.listen(port, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});

app.use('/shipper_api', Shipper_apiRouter);
app.use('/midtrans_api', Midtrans_apiRouter);
app.use('/rajaongkir_api', RajaOngkir_apiRouter);
app.use('/users_api', Users_apiRouter);
app.use('/xendit_api', Xendit_apiRouter);
app.use('/product_api', Product_apiRouter);
app.use('/moota_api', Moota_apiRouter);