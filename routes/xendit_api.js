const express = require('express')
const router = express.Router()
const xendit = require('../xendit/query_xendit');

router.get('/check_balance', xendit.get_Balance)
router.post('/card_charge', xendit.card_service)


// Customer API
router.post('/create_customer', xendit.create_customer)
router.get('/get_customer_ID/:id', xendit.getCustomerbyID)
router.get('/get_customer_Ref/:reference_id', xendit.getCustomerbyRef)

// CC API Endpoint
router.post('/charge_cc/:tokenID/:externalID/:authID', xendit.card_service)
router.post('/tokenization', xendit.tokenization)

// E-Wallet API Endpoint
router.post('/ovo_charge', xendit.create_ovo_charge)
router.post('/dana_charge', xendit.create_dana_charge)
router.post('/linkaja_charge', xendit.create_linkaja_charge)
router.post('/shoppepay_charge', xendit.create_shoppepay_charge)
router.post('/astrapay_charge', xendit.create_astrapay_charge)
    // router.post('/jeniuspay_charge', xendit.create_jeniuspay_charge)
router.post('/sakuku_charge', xendit.create_sakuku_charge)
router.get('/ewallet_charge_status/:charge_ID', xendit.ewallet_charge_status)
    // router.post('/ewallet_charge_void/:charge_ID/void', xendit.ewallet_charge_void)

// Virtual Account API Endpoint
router.get('/bank_va', xendit.getBank)
router.post('/va_charge_open', xendit.create_va_open)
router.post('/va_charge_close', xendit.create_va_close)
router.get('/get_va/:id', xendit.getVA)
router.patch('/update_va/:id', xendit.updateVA)
router.get('/get_paymentVA/:payment_id', xendit.getPaymentVAbyID)
    // router.post('/payment_va/:external_id/simulate_payment', xendit.VAPayment)

// Retail Outlet API Endpoint
router.post('/retail_charge', xendit.create_retail_charge)
router.get('/get_retail/:id', xendit.getRetail)
router.patch('/update_retail/:id', xendit.updateRetail)
router.post('/payment_retail/:id', xendit.retailPayment)
router.get('/get_payment/:id/payment', xendit.getPaymentbyID)

// Direct Debit API Endpoint
router.post('/dd_tokenization/:id_customer', xendit.DD_Tokenizatin)

// QRIS API Endpoint
router.post('/qris_charge', xendit.QR_charge)
router.get('/get_qris/:external_id', xendit.getQRbyID)
router.post('/payment_qris/:external_id', xendit.QRPayment)
    // router.get('/get_payment/:id/payment', xendit.getPaymentbyID)

// Paylater API Endpoint
router.post('/paylater_plan/:customer_id', xendit.paylaterPlan)
router.post('/paylater_charge/', xendit.paylaterCharge)
router.get('/get_charge/:id', xendit.getChargebyID)
router.post('/refund_charge/:id', xendit.refundCharge)

module.exports = router