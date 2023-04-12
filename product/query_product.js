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

// Product CRUD Start
function getAll_product(req, res) {
    findAllproduct()
        .then(foundProduct => {
            console.log(foundProduct)
            res.status(200).json(foundProduct)
        })
        .catch((err) => console.error(err))
        .catch((err) => res.status(500).json({ error: err.message }))
}

function get_product(req, res) {
    const getparams = req.params
    findproduct(getparams)
        .then(foundProduct => {
            console.log(foundProduct)
            res.status(200).json(foundProduct)
        })
        .catch((err) => console.error(err))
        .catch((err) => res.status(500).json({ error: err.message }))
}

function get_productbyCategory(req, res) {
    const getparams = req.params
    findproduct_category(getparams)
        .then(foundProduct => {
            console.log(foundProduct)
            res.status(200).json(foundProduct)
        })
        .catch((err) => console.error(err))
        .catch((err) => res.status(500).json({ error: err.message }))
}

function create_product(req, res) {
    const product = req.body
    createProduct(product)
        .then(Product => {
            console.log(Product)
            res.status(200).json(Product)
        })
        .catch((err) => console.error(err))
        .catch((err) => res.status(500).json({ error: err.message }))
}


function update_product(req, res) {
    let edit_product
    findproduct(getparams)
        .then(foundProduct => {
            edit_product = foundProduct
            console.log(foundProduct)
            if (edit_product) {
                updateProduct(req, edit_product)
                    .then(edit_product => {
                        console.log(edit_product)
                        res.status(200).json(edit_product)
                    })
                    .catch((err) => console.error(err))
                    .catch((err) => res.status(500).json({ error: err.message }))
            }
        })
        .catch((err) => console.error(err))
        .catch((err) => res.status(500).json({ error: err.message }))
}

function delete_product(req, res) {
    const getparams = req.params
    let erase_product
    findproduct(getparams)
        .then(foundProduct => {
            erase_product = foundProduct
            if (erase_product) {
                deleteProduct(getparams)
                    .then(deleted => {
                        console.log(deleted)
                        console.log("Product has been Deleted!")
                        res.status(200).json(deleted)
                    })
                    .catch((err) => console.error(err))
                    .catch((err) => res.status(500).json({ error: err.message }))
            }
        })
        .catch((err) => console.error(err))
        .catch((err) => res.status(500).json({ error: err.message }))
}

// Product CRUD End

// Create Function Start
const createProduct = (product) => {
    const id = "Product-" + crypto.randomUUID();
    console.log(id);
    return database.raw(
        "INSERT INTO Product(id,product_name,product_desc,product_size, product_category, price ,brand, machine_name,machine_model) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?) RETURNING id,product_name,product_desc,product_size, product_category, price, brand, machine_name,machine_model", [id, product.product_name, product.product_desc, product.product_size, product.product_category, product.price, product.brand, product.machine_name, product.machine_model])
        .then((data) => data.rows[0])
}

// Create Function End

// Update Function Start
const updateProduct = (req) => {
    const getparams = req.params
    const product = req.body
    return database.raw(
        "UPDATE Product SET product_name = ?,product_desc = ?,product_size = ?, product_category = ?,price = ?,brand = ?,machine_name = ?,machine_model = ? WHERE id = ? RETURNING id,product_name,product_desc,product_size, product_category, price, brand, machine_name,machine_model", [product.product_name, product.product_desc, product.product_size, product.product_category, product.price, product.brand, product.machine_name, product.machine_model, getparams.id]
    )
        .then((data) => data.rows[0])
}

// Update Function End

// Delete Function Start
const deleteProduct = (getparams) => {
    return database.raw(
        "DELETE FROM Product where id = ?"[getparams.id]
    )
        .then((data) => data.rows[0])
}

// Delete Function End

// Find Function Start
const findAllproduct = () => {
    return database.raw("SELECT * FROM Product ORDER BY product_category, product_name ASC")
        .then((data) => data.rows)
}

const findproduct = (getparams) => {
    return database.raw("SELECT * FROM Product WHERE id = ?", [getparams.id])
        .then((data) => data.rows[0])
}

const findproduct_category = (getparams) => {
    return database.raw("SELECT * FROM Product WHERE product_category = ? ORDER BY product_name ASC", [getparams.product_category])
        .then((data) => data.rows)
}

// Find Function End

module.exports = {
    getAll_product,
    get_product,
    get_productbyCategory,
    create_product,
    update_product,
    delete_product
}