var axios = require('axios');

var config = {
    method: 'post',
    url: 'https://api.wsapp.com.br/getWhaValid',
    headers: {},
    data: data
};

var data = {
    "token": "free",
    "phone": '6282111860613',
    "await": "N"
};

axios(config)
    .then(function(response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function(error) {
        console.log(error);
    });