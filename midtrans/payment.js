const otpGenerator = require('otp-generator');
const midtransClient = require('midtrans-client');

let core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-Lf-N95Mn-SP7K5V6IfmnmQy4',
    clientKey: 'SB-Mid-client-qFQNn1Kq-wFl4DVD'
});
var order = otpGenerator.generate(10);

function paymentBni() {
    let parameterBNI = {
        "payment_type": "bank_transfer",
        "transaction_details": {
            "gross_amount": 10000,
            "order_id": `sandbox-${order}`
        },
        "customer_details": {
            "email": "budi.utomo@Midtrans.com",
            "first_name": "budi",
            "last_name": "utomo",
            "phone": "+6281 1234 1234"
        },
        "item_details": [{
                "id": "1388998298204",
                "price": 5000,
                "quantity": 1,
                "name": "Ayam Zozozo"
            },
            {
                "id": "1388998298205",
                "price": 5000,
                "quantity": 1,
                "name": "Ayam Xoxoxo"
            }
        ],
        "bank_transfer": {
            "bank": "bni",
            "va_number": "111111"
        }
    }
    core.charge(parameterBNI)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
}

function paymentPermata() {
    let parameterPermata = {
        "payment_type": "bank_transfer",
        "transaction_details": {
            "gross_amount": 5000000,
            "order_id": `sandbox-${order}`,
        },
        "bank_transfer": {
            "bank": "permata",
            "permata": {
                "recipient_name": "Jamaludin Hakim Harsoyo"
            }
        }
    }
    core.charge(parameterPermata)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
};

function paymentBca() {
    let parameterBCA = {
        "payment_type": "bank_transfer",
        "transaction_details": {
            "gross_amount": 10000,
            "order_id": `sandbox-${order}`
        },
        "customer_details": {
            "email": "budi.utomo@Midtrans.com",
            "first_name": "budi",
            "last_name": "utomo",
            "phone": "+6281 1234 1234"
        },
        "item_details": [{
                "id": "1388998298204",
                "price": 5000,
                "quantity": 1,
                "name": "Ayam Zozozo"
            },
            {
                "id": "1388998298205",
                "price": 5000,
                "quantity": 1,
                "name": "Ayam Xoxoxo"
            }
        ],
        "bank_transfer": {
            "bank": "bca",
            "va_number": "111111",
            "bca": {
                "sub_company_code": "00000"
            }
        }
    }
    core.charge(parameterBCA)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
};

function paymentBri() {
    let parameterBRI = {
        "payment_type": "bank_transfer",
        "transaction_details": {
            "gross_amount": 10000,
            "order_id": `sandbox-${order}`
        },
        "customer_details": {
            "email": "budi.utomo@Midtrans.com",
            "first_name": "budi",
            "last_name": "utomo",
            "phone": "+6281 1234 1234"
        },
        "item_details": [{
                "id": "1388998298204",
                "price": 5000,
                "quantity": 1,
                "name": "Ayam Zozozo"
            },
            {
                "id": "1388998298205",
                "price": 5000,
                "quantity": 1,
                "name": "Ayam Xoxoxo"
            }
        ],
        "bank_transfer": {
            "bank": "bri",
            "va_number": "111111"
        }
    }
    core.charge(parameterBRI)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
};

function paymentMandiri() {
    let parameterMandiri = {
        "payment_type": "echannel",
        "transaction_details": {
            "order_id": `sandbox-${order}`,
            "gross_amount": 95000
        },
        "item_details": [{
                "id": "a1",
                "price": 50000,
                "quantity": 1,
                "name": "Apel"
            },
            {
                "id": "a2",
                "price": 45000,
                "quantity": 1,
                "name": "Jeruk"
            }
        ],
        "echannel": {
            "bill_info1": "Payment For:",
            "bill_info2": "debt",
            "bill_key": "081211111111"
        }
    }
    core.charge(parameterMandiri)
        .then((chargeResponse) => {
            console.log('chargeResponse:', JSON.stringify(chargeResponse));
        })
        .catch((e) => {
            console.log('Error occured:', e.message);
        });;
};

module.export = {
    paymentPermata,
    paymentBri,
    paymentBca,
    paymentMandiri,
    paymentBni
}