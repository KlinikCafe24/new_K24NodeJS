const otpGenerator = require('otp-generator');
const midtransClient = require('midtrans-client');

let core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-Lf-N95Mn-SP7K5V6IfmnmQy4',
    clientKey: 'SB-Mid-client-qFQNn1Kq-wFl4DVD'
});

function paymentQRIS(){
let parameterQris = {
    "payment_type": "qris",
    "transaction_details": {
      "order_id": "134143",
      "gross_amount": 275000
    },
    "item_details": [
      {
        "id": "id1",
        "price": 275000,
        "quantity": 1,
        "name": "Bluedio H+ Turbine Headphone with Bluetooth 4.1 -"
      }
    ],
    "customer_details": {
      "first_name": "Budi",
      "last_name": "Utomo",
      "email": "budi.utomo@midtrans.com",
      "phone": "081223323423"
    },
    "qris": {
      "acquirer": "gopay"
    }
  }
  core.charge(parameterQris)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
    }

    function paymentGOPAY(){
        let parameterGopay = {
            "payment_type": "gopay",
            "transaction_details": {
              "order_id": "1341341",
              "gross_amount": 275000
            },
            "item_details": [
              {
                "id": "id1",
                "price": 275000,
                "quantity": 1,
                "name": "Bluedio H+ Turbine Headphone with Bluetooth 4.1 -"
              }
            ],
            "customer_details": {
              "first_name": "Budi",
              "last_name": "Utomo",
              "email": "budi.utomo@midtrans.com",
              "phone": "081223323423"
            },
            "gopay": {
              "enable_callback": true,
              "callback_url": "someapps://callback"
            }
          }
          core.charge(parameterGopay)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
    }

    let parameterShoppepay = {
        "payment_type": "shopeepay",
        "transaction_details": {
            "order_id": "test-order-shopeepay-001",
            "gross_amount": 25000
        },
        "item_details": [
            {
                "id": "id1",
                "price": 25000,
                "quantity": 1,
                "name": "Brown sugar boba milk tea"
            }
        ],
        "customer_details": {
            "first_name": "John",
            "last_name": "Brandon",
            "email": "john.brandon@go-jek.com",
            "phone": "0819323212312"
        },
        "shopeepay": {
            "callback_url": "https://midtrans.com/"
        }
    }
    core.charge(parameterShoppepay)
    .then((chargeResponse) => {
        console.log('chargeResponse:', JSON.stringify(chargeResponse));
    })
    .catch((e) => {
        console.log('Error occured:', e.message);
    });;