const axios = require('axios');

const check = {
    method: 'GET',
    url: 'https://api.sandbox.midtrans.com/v2/b579119c-f004-40c4-bdbc-6d9729aa73b6/status',
    headers: {
        accept: 'application/json',
        authorization: 'Basic U0ItTWlkLXNlcnZlci1MZi1OOTVNbi1TUDdLNVY2SWZtbm1ReTQ6'
    }
};

axios
    .request(check)
    .then(function(response) {
        console.log(response.data);
    })
    .catch(function(error) {
        console.error(error);
    });