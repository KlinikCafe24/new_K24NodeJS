const { v4: uuidv4 } = require('uuid')

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-Lf-N95Mn-SP7K5V6IfmnmQy4',
    clientKey: 'SB-Mid-client-qFQNn1Kq-wFl4DVD'
});

let parameterSnap = {
    "transaction_details": {
        "order_id": uuidv4(),
        "gross_amount": 10000
    },
    "item_details": [{
        "id": "ITEM1",
        "price": 10000,
        "quantity": 1,
        "name": "Midtrans Bear",
        "brand": "Midtrans",
        "category": "Toys",
        "merchant_name": "Midtrans"
    }],
    "customer_details": {
        "first_name": "John",
        "last_name": "Watson",
        "email": "test@example.com",
        "phone": "+628123456",
        "billing_address": {
            "first_name": "John",
            "last_name": "Watson",
            "email": "test@example.com",
            "phone": "081 2233 44-55",
            "address": "Sudirman",
            "city": "Jakarta",
            "postal_code": "12190",
            "country_code": "IDN"
        },
        "shipping_address": {
            "first_name": "John",
            "last_name": "Watson",
            "email": "test@example.com",
            "phone": "0 8128-75 7-9338",
            "address": "Sudirman",
            "city": "Jakarta",
            "postal_code": "12190",
            "country_code": "IDN"
        }
    },
    "enabled_payments": ["credit_card", "mandiri_clickpay", "cimb_clicks", "bca_klikbca", "bca_klikpay", "bri_epay", "echannel", "indosat_dompetku", "mandiri_ecash", "permata_va", "bca_va", "bni_va", "other_va", "gopay", "kioson", "indomaret", "gci", "danamon_online"],
    "credit_card": {
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
    "bca_va": {
        "va_number": "12345678911",
        "free_text": {
            "inquiry": [{
                "en": "text in English",
                "id": "text in Bahasa Indonesia"
            }],
            "payment": [{
                "en": "text in English",
                "id": "text in Bahasa Indonesia"
            }]
        }
    },
    "bni_va": {
        "va_number": "12345678"
    },
    "permata_va": {
        "va_number": "1234567890",
        "recipient_name": "SUDARSONO"
    },
    "callbacks": {
        "finish": "https://demo.midtrans.com"
    },
    "expiry": {
        "start_time": "2025-12-20 18:11:08 +0700",
        "unit": "minute",
        "duration": 9000
    },
    "custom_field1": "custom field 1 content",
    "custom_field2": "custom field 2 content",
    "custom_field3": "custom field 3 content"
};

// create transaction
snap.createTransaction(parameterSnap)
    .then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        console.log('transactionToken:', transactionToken);

        // transaction redirect url
        let transactionRedirectUrl = transaction.redirect_url;
        console.log('transactionRedirectUrl:', transactionRedirectUrl);
    })
    .catch((e) => {
        console.log('Error occured:', e.message);
    });

// alternative way to create transactionToken
snap.createTransactionToken(parameterSnap)
    .then((transactionToken) => {
        console.log('transactionToken:', transactionToken);
    })
    .catch((e) => {
        console.log('Error occured:', e.message);
    });

// alternative way to create transactionRedirectUrl
snap.createTransactionRedirectUrl(parameterSnap)
    .then((transactionRedirectUrl) => {
        console.log('transactionRedirectUrl:', transactionRedirectUrl);
    })
    .catch((e) => {
        console.log('Error occured:', e.message);
    });

// Aync / await way
async function snapAsync() {
    let transactionToken = await snap.createTransactionToken(parameterSnap);
    console.log('transactionToken:', transactionToken);
}
snapAsync();