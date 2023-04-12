const express = require('express')
const router = express.Router()
const product = require('../product/query_product');

router.get('/getAll_product', product.getAll_product)
router.get('/get_product/:id', product.get_product)
router.get('/get_productbyCategory/:product_category', product.get_productbyCategory)
router.post('/add_product', product.create_product)
router.patch('/update_product/:id', product.update_product)
router.delete('/delete_product/:id', product.delete_product)

module.exports = router