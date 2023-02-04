const midtransClient = require('midtrans-client');
// const axios = require('axios');
// const { response } = require('express');
const { v4: uuidv4 } = require('uuid')

let core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-Lf-N95Mn-SP7K5V6IfmnmQy4',
    clientKey: 'SB-Mid-client-qFQNn1Kq-wFl4DVD'
});
let parameterCC = {
    'card_number': '5264 2210 3887 4659',
    'card_exp_month': '12',
    'card_exp_year': '2025',
    'card_cvv': '123',
    'client_key': core.apiConfig.clientKey,
};
core.cardToken(parameterCC)
    .then((cardTokenResponse) => {
        let cardToken = cardTokenResponse.token_id;
        let parameter = {
            "payment_type": "credit_card",
            "transaction_details": {
                "order_id": uuidv4(),
                "gross_amount": 145000
            },
            "credit_card": {
                "token_id": cardToken
            },
            "item_details": [{
                "id": "a1",
                "price": 145000,
                "quantity": 1,
                "name": "Apel",
                "brand": "Fuji Apple",
                "category": "Fruit",
                "merchant_name": "Fruit-store"
            }],
            "customer_details": {
                "first_name": "BUDI",
                "last_name": "UTOMO",
                "email": "test@midtrans.com",
                "phone": "+628123456",
                "billing_address": {
                    "first_name": "BUDI",
                    "last_name": "UTOMO",
                    "email": "test@midtrans.com",
                    "phone": "081 2233 44-55",
                    "address": "Sudirman",
                    "city": "Jakarta",
                    "postal_code": "12190",
                    "country_code": "IDN"
                },
                "shipping_address": {
                    "first_name": "BUDI",
                    "last_name": "UTOMO",
                    "email": "test@midtrans.com",
                    "phone": "0 8128-75 7-9338",
                    "address": "Sudirman",
                    "city": "Jakarta",
                    "postal_code": "12190",
                    "country_code": "IDN"
                }
            }
        }

        return core.charge(parameter);
    })
    .then((chargeResponse) => {
        console.log('chargeResponse:', JSON.stringify(chargeResponse));
    })
    .catch((e) => {
        console.log('Error occured:', e.message);
    });;

// axios
//     .request(options)
//     .then(function(response) {
//         console.log(response.data);
//         if (response.data.token_id != null) {
//             let parameterCC = {
//                 "payment_type": "credit_card",
//                 "transaction_details": {
//                     "order_id": uuidv4(),
//                     "gross_amount": 145000
//                 },
//                 "credit_card": {
//                     "token_id": `${response.data.token_id}`
//                 },
//                 "item_details": [{
//                     "id": "a1",
//                     "price": 145000,
//                     "quantity": 1,
//                     "name": "Apel",
//                     "brand": "Fuji Apple",
//                     "category": "Fruit",
//                     "merchant_name": "Fruit-store"
//                 }],
//                 "customer_details": {
//                     "first_name": "BUDI",
//                     "last_name": "UTOMO",
//                     "email": "test@midtrans.com",
//                     "phone": "+628123456",
//                     "billing_address": {
//                         "first_name": "BUDI",
//                         "last_name": "UTOMO",
//                         "email": "test@midtrans.com",
//                         "phone": "081 2233 44-55",
//                         "address": "Sudirman",
//                         "city": "Jakarta",
//                         "postal_code": "12190",
//                         "country_code": "IDN"
//                     },
//                     "shipping_address": {
//                         "first_name": "BUDI",
//                         "last_name": "UTOMO",
//                         "email": "test@midtrans.com",
//                         "phone": "0 8128-75 7-9338",
//                         "address": "Sudirman",
//                         "city": "Jakarta",
//                         "postal_code": "12190",
//                         "country_code": "IDN"
//                     }
//                 }
//             }
//             core.charge(parameterCC)
//                 .then((chargeResponse) => {
//                     console.log('chargeResponse:', JSON.stringify(chargeResponse));
//                 })
//                 .catch((e) => {
//                     console.log('Error occured:', e.message);
//                 });;
//         }
//     })
//     .catch(function(error) {
//         console.error(error);
//     });