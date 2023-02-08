const express = require('express')
const router = express.Router()
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')

router.post('/snap_transaction', (req, res) => {
    const amount = req.body
    const transaction = {
        method: 'POST',
        url: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Basic U0ItTWlkLXNlcnZlci1MZi1OOTVNbi1TUDdLNVY2SWZtbm1ReTQ6'
        },
        data: {
            transaction_details: { order_id: uuidv4(), gross_amount: amount.gross_amount },
            credit_card: {
                "secure": true,
                "bank": "bca",
                "installment": {
                    "required": false,
                    "terms": {
                        "bni": [3, 6, 12],
                        "mandiri": [3, 6, 12],
                        "cimb": [3],
                        "bca": [3, 6, 12],
                        "offline": [6, 12]
                    }
                },
                "whitelist_bins": [
                    "48111111",
                    "41111111"
                ]
            },
            enabled_payments: [
                "credit_card",
                "mandiri_clickpay",
                "cimb_clicks",
                "bca_klikbca",
                "bca_klikpay",
                "bri_epay",
                "echannel",
                "indosat_dompetku",
                "mandiri_ecash",
                "permata_va",
                "bca_va",
                "bni_va",
                "other_va",
                "gopay",
                "kioson",
                "indomaret",
                "gci",
                "danamon_online"
            ],
            callbacks: {
                "finish": "https://klinikcafe24.com"
            },
        }
    };
    axios
        .request(transaction)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
})


router.get('/transaction_status', (req, res) => {
    const status = {
        method: 'GET',
        url: 'https://api.sandbox.midtrans.com/v2/1/status',
        headers: {
            accept: 'application/json',
            authorization: 'Basic U0ItTWlkLXNlcnZlci1MZi1OOTVNbi1TUDdLNVY2SWZtbm1ReTQ6'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
})

module.exports = router


// router.post('/charge_cc', (req, res) => {
//     const cc = req.body
//     axios.post('/v2/charge', {
//             payment_type: cc.payment_type,
//             transaction_details: { gross_amount: cc.gross_amount, order_id: cc.order_id },
//             credit_card: { token_id: cc.token_id, authentication: true }
//         })
//         .then(response => res.json(response.data))
//         .catch(err => res.send(err))
// })


// router.post('/charge_dd', (req, res) => {
//     const cc = req.body
//     axios.post('/v2/charge', {
//             payment_type: cc.payment_type,
//             transaction_details: { gross_amount: cc.gross_amount, order_id: cc.order_id },
//             item_details: { id: cc.id, price: cc.price, quantity: cc.quantity, name: cc.name },
//             customer_details: { first_name: cc.first_name, last_name: cc.last_name, email: cc.email, phone: cc.phone },
//             bca_klikpay: { description: cc.description }
//         })
//         .then(response => res.json(response.data))
//         .catch(err => res.send(err))
// })