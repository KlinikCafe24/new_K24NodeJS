const axios = require('axios');
const otpGenerator = require('otp-generator');


var order = otpGenerator.generate(10);
const options = {
    method: 'POST',
    url: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic U0ItTWlkLXNlcnZlci1MZi1OOTVNbi1TUDdLNVY2SWZtbm1ReTQ6'
    },
    data: {
        transaction_details: { order_id: `Sandbox-${order}`, gross_amount: 5000000 },
        credit_card: { secure: true }
    }
};

axios
    .request(options)
    .then(function(response) {
        console.log(response.data);
        console.log(`Your url for this transaction are ${response.data.redirect_url} and token are ${response.data.token}`)
    })
    .catch(function(error) {
        console.error(error);
    });