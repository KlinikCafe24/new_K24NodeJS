const express = require('express');
const app = express();
const port = 5000;
// const Shipper_apiRouter = require('./routes/shipper_api')
const RajaOngkir_apiRouter = require('./routes/rajaongkir_api')
const Midtrans_apiRouter = require('./routes/midtrans_api')
const Sendtalk_apiRouter = require('./routes/sendtalk_api')
const Users_apiRouter = require('./routes/users_api')
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(express.urlencoded({
    extended: true,
}));

const { Pool } = require("pg");
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'directus_k24',
    password: '123456',
    port: 5432
});

pool.connect((err) => {
    if (err) throw err;
    console.log('Postgre Connected...');
});

app.listen(port, () => {
    console.log("Server is running on " + port);
});

// app.use('/shipper_api', Shipper_apiRouter);
app.use('/midtrans_api', Midtrans_apiRouter);
app.use('/sendtalk_api', Sendtalk_apiRouter);
app.use('/rajaongkir_api', RajaOngkir_apiRouter);
app.use('/users_api', Users_apiRouter);

// module.exports = pool, port, Shipper_apiRouter, RajaOngkir_apiRouter, Midtrans_apiRouter, Sendtalk_apiRouter