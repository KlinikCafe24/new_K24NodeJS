const express = require('express');
const app = express();
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const axios = require('axios')
const environment = process.env.NODE_ENV || 'production';
const configuration = require('../knex')[environment];
const database = require('knex')(configuration);
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.urlencoded({
    extended: true,
}));

// Order Function Start
function Orders(request, response) {
    const ord = request.body
    const getparams = request.params
    const Order = [{
        orderid: 'ORDER-' + crypto.randomUUID,
        orderdate: Date.now(),
        customer: ord.customer_name,
        customer_email: ord.customer_email,
        items: [{
                item: 'apple',
                qty: 2,
                UOM: 'pcs',
                unitprice: 0.8
            },
            {
                item: 'orange',
                qty: 3,
                UOM: 'pcs',
                unitprice: 1
            }
        ]
    }]
}

// Order Function End

// Transaction Start
function Transaction(request, response) {
    const trans = request.body
    const getparams = request.params
    findproduct(getparams)
        .then(async foundProduct => {
            if (foundProduct) {
                await insertCart(trans)
            } else {

            }
        })
}
// Transaction End

// Find Function Start
const findproduct = (getparams) => {
    return database.raw("SELECT * FROM Product WHERE id = ?", [getparams.id])
        .then((data) => data.rows[0])
}

// Find Function End

// Insert Function Start
const insertCart = (trans) => {
    const id = crypto.randomUUID();
    return database.raw(
            "INSERT INTO cart(id, total_price, promo_id,payment_id,product_id) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ? , ? , ? , ?) RETURNING id, total_price, promo_id,payment_id,product_id", [id])
        .then((data) => data.rows[0])
}

// Insert Function End


module.exports = {
    Transaction
}