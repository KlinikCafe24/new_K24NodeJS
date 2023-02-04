const express = require('express')
const router = express.Router()
const axios = require('axios')


axios.defaults.baseURL = 'https://api.sandbox.midtrans.com'
axios.defaults.headers.common['Authorization'] = 'Basic U0ItTWlkLXNlcnZlci1MZi1OOTVNbi1TUDdLNVY2SWZtbm1ReTQ6'
axios.defaults.headers.post['Content-Type'] = 'application/json';

router.post('/snap_transaction', (req, res) => {
        const cc = req.body
        axios.post('snap/v1/transactions', {
                payment_type: cc.payment_type,
                transaction_details: { gross_amount: cc.gross_amount, order_id: cc.order_id },
                credit_card: { token_id: cc.token_id, authentication: true }
            })
            .then(response => res.json(response.data))
            .catch(err => res.send(err))
    })
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

router.get('/transaction_status', (req, res) => {
    axios.get('/v2/order_id/status')
        .then(response => res.json(response.data))
        .catch(err => res.send(err))
})


// router.get('/ongkos/:asal/:tujuan/:berat/:kurir', (req, res) => {
//   const param = req.params
//   axios.post('/cost', {
//       origin: param.asal,
//       destination: param.tujuan,
//       weight: param.berat,
//       courier: param.kurir
//     })
//     .then(response => res.json(response.data))
//     .catch(err => res.send(err))
// })

module.exports = router