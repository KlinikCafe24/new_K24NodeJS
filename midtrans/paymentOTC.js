const midtransClient = require('midtrans-client');


let core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-Lf-N95Mn-SP7K5V6IfmnmQy4',
    clientKey: 'SB-Mid-client-qFQNn1Kq-wFl4DVD'
});

function paymentINDOMARET(){
let parameterIndomaret = 
{
    "payment_type": "cstore",
    "transaction_details": {
      "gross_amount": 162500,
      "order_id": "order04"
    },
    "cstore": {
      "store": "Indomaret",
      "message": "Tiket1 transaction"
    },
    "customer_details": {
      "first_name": "Budi",
      "last_name": "Utomo",
      "email": "budi.utomo@midtrans.com",
      "phone": "0811223344"
    },
    "item_details": [
      {
        "id": "id1",
        "price": 162500,
        "quantity": 1,
        "name": "tiket1"
      }
    ]
  }
  core.charge(parameterIndomaret)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
    }
    
    function paymentALFAMART(){
    let parameterAlfamart =
    {
        "payment_type": "cstore",
        "transaction_details": {
          "gross_amount": 162500,
          "order_id": "order05"
        },
        "cstore": {
          "store": "alfamart",
          "alfamart_free_text_1": "Thanks for shopping with us!,",
          "alfamart_free_text_2": "Like us on our Facebook page,",
          "alfamart_free_text_3": "and get 10% discount on your next purchase."
        },
        "customer_details": {
          "first_name": "Budi",
          "last_name": "Utomo",
          "email": "budi.utomo@midtrans.com",
          "phone": "0811223344"
        },
        "item_details": [
          {
            "id": "id1",
            "price": 162500,
            "quantity": 1,
            "name": "tiket2"
          }
        ]
      }
      core.charge(parameterAlfamart)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
      }

      module.exports = {
        paymentALFAMART,
        paymentINDOMARET
      }