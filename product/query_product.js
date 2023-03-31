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

function get_product(req, res) {
    const getparams = req.params
    findproduct(getparams)
        .then(foundProduct => {
            console.log(foundProduct)
            res.status(200).json(foundProduct)
        })

}

function create_product(req, res) {
    const product = req.body
    createProduct(product)
        .then(Product => {
            console.log(Product)
            res.status(200).json(Product)
        })
}

// Create Function Start
const createProduct = (product) => {
    const id = "Product-" + crypto.randomUUID();
    console.log(id);
    return database.raw(
            "INSERT INTO Product(id,product_name,product_desc,price ,old_price, rating,sold) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id,product_name,product_desc", [id, product.name, product.desc, product.price, product.old_price, product.rating, product.sold])
        .then((data) => data.rows[0])
}

// Create Function End

// Find Function Start
const findproduct = (getparams) => {
    return database.raw("SELECT * FROM Product WHERE id = ?", [getparams.id])
        .then((data) => data.rows[0])
}

// Find Function End

module.exports = {
    get_product,
    create_product
}