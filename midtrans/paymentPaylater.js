const otpGenerator = require('otp-generator');
const midtransClient = require('midtrans-client');

let core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-Lf-N95Mn-SP7K5V6IfmnmQy4',
    clientKey: 'SB-Mid-client-qFQNn1Kq-wFl4DVD'
});

function paymentAKULAKU(){
let parameterAkulaku =
{
    "payment_type": "akulaku",
    "transaction_details": {
      "order_id": "orderid-01",
      "gross_amount": 11000
    },
    "item_details": [
      {
        "id": "1",
        "price": 11000,
        "quantity": 1,
        "name": "Sepatu "
      }
    ],
    "customer_details":{
      "first_name": "John",
      "last_name": "Baker",
      "email": "john.baker@email.com",
      "phone": "08123456789"
    }
  }
  core.charge(parameterAkulaku)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
    }

    let parameterKredivo = {
        "payment_type": "kredivo",
        "transaction_details": {
          "order_id": "orderid-3413",
          "gross_amount": 40000,
          "currency": "IDR"
        },
        "customer_details": {
          "email": "john.baker@email.com",
          "first_name": "John",
          "last_name": "Baker",
          "phone": "08123456789",
          "shipping_address": {
            "first_name": "John",
            "last_name": "Baker",
            "phone": "08123456789",
            "address": "Jl. Kemanggisan",
            "city": "Jakarta",
            "postal_code": 12353,
            "country_code": "IND"
          }
        },
        "item_details": [
          {
            "id": "1",
            "name": "Sepatu",
            "price": 40000,
            "category": "Fashion",
            "quantity": 1,
            "url": "http://toko/toko1?item=abc"
          }
        ],
        "seller_details": [
          {
            "id": "sellerId-01",
            "name": "John Seller",
            "email": "seller@email.com",
            "url": "https://tokojohn.com",
            "address": {
              "first_name": "John",
              "last_name": "Seller",
              "phone": "081234567890",
              "address": "Kemanggisan",
              "city": "Jakarta",
              "postal_code": "12190",
              "country_code": "IDN"
            }
          }
        ],
        "custom_expiry": {
              "expiry_duration": 60,
              "unit": "minute"
          }
      }
      core.charge(parameterKredivo)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;