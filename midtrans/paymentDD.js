const midtransClient = require('midtrans-client');
const { v4: uuidv4 } = require('uuid')

let core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-Lf-N95Mn-SP7K5V6IfmnmQy4',
    clientKey: 'SB-Mid-client-qFQNn1Kq-wFl4DVD'
});



function paymentBCAKlik() {
    let parameterBCAKlik = {
        "payment_type": "bca_klikpay",
        "transaction_details": {
            "order_id": uuidv4(),
            "gross_amount": 11000
        },
        "item_details": [{
            "id": "1",
            "price": 11000,
            "quantity": 1,
            "name": "Mobil"
        }],
        "customer_details": {
            "first_name": "John",
            "last_name": "Baker",
            "email": "john.baker@email.com",
            "phone": "08123456789"
        },
        "bca_klikpay": {
            "description": "Pembelian Barang"
        }
    }
    core.charge(parameterBCAKlik)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
};

function paymentKlikBCA() {
    let paramaterKlikBCA = {
        "payment_type": "bca_klikbca",
        "bca_klikbca": {
            "description": "testing transaction",
            "user_id": "midtrans1012"
        },
        "transaction_details": {
            "order_id": uuidv4(),
            "gross_amount": 50000
        },
        "item_details": [{
            "id": "1",
            "price": 50000,
            "quantity": 2,
            "name": "Mobil"
        }],
        "customer_details": {
            "first_name": "Budi",
            "last_name": "435547",
            "email": "budi.utomo@yahoo.com"
        }
    }
    core.charge(paramaterKlikBCA)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
};

function paymentBRIMO() {
    let paramaterBRIMO = {
        "payment_type": "bri_epay",
        "transaction_details": {
            "order_id": uuidv4(),
            "gross_amount": 11000
        },
        "item_details": [{
            "id": "1",
            "price": 11000,
            "quantity": 2,
            "name": "Mobil "
        }],
        "customer_details": {
            "first_name": "Andri",
            "last_name": "Litani",
            "email": "andri@litani.com",
            "phone": "081122334455"
        }
    }
    core.charge(paramaterBRIMO)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
};

function paymentCIMBClick() {
    let parametCIMBClick = {
        "payment_type": "cimb_clicks",
        "cimb_clicks": {
            "description": "Purchase of a special event item"
        },
        "item_details": [{
            "id": "1",
            "price": 11000,
            "quantity": 1,
            "name": "Mobil "
        }],
        "transaction_details": {
            "order_id": uuidv4(),
            "gross_amount": 11000
        },
        "customer_details": {
            "first_name": "Andri",
            "last_name": "Litani",
            "email": "andri@litani.com",
            "phone": "081122334455"
        }
    }
    core.charge(parametCIMBClick)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
};

function paymentDOB() {
    let parameterDOB = {
        "payment_type": "danamon_online",
        "item_details": [{
            "id": "1",
            "price": 11000,
            "quantity": 1,
            "name": "Mobil "
        }],
        "transaction_details": {
            "order_id": uuidv4(),
            "gross_amount": 11000
        },
        "customer_details": {
            "first_name": "Andri",
            "last_name": "Litani",
            "email": "andri@litani.com",
            "phone": "081122334455"
        }
    }
    core.charge(parameterDOB)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
};

function paymentUOB() {
    let parameterUOB = {
        "payment_type": "uob_ezpay",
        "item_details": [{
            "id": "1",
            "price": 11000,
            "quantity": 1,
            "name": "Mobil "
        }],
        "transaction_details": {
            "order_id": uuidv4(),
            "gross_amount": 11000
        },
        "customer_details": {
            "first_name": "Andri",
            "last_name": "Litani",
            "email": "andri@litani.com",
            "phone": "081122334455"
        },
        "uob_ezpay": {
            "callback_url": "http://example.com/uobezpay?order_id=sample-001"
        }
    }
    core.charge(parameterUOB)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
};



module.exports = {
    paymentBCAKlik,
    paymentKlikBCA,
    paymentBRIMO,
    paymentCIMBClick,
    paymentUOB,
    paymentDOB
}