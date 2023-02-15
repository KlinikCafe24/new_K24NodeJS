const express = require('express')
const router = express.Router()
const axios = require('axios')
const request = require('request')
const app = express();

// Config Defaults Axios dengan Detail Akun Rajaongkir
// axios.defaults.baseURL = 'https://pro.rajaongkir.com/api/province'
// axios.defaults.headers.post['key'] = 'b4f5bd013cd49cab7d2d46f815bd07a9'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
app.use(express.urlencoded({
    extended: true,
}));
// Router GET province
router.get('/provinsi', (req, res) => {
    const province = {
        method: 'GET',
        url: 'https://pro.rajaongkir.com/api/province',
        headers: {
            key: 'b4f5bd013cd49cab7d2d46f815bd07a9'
        }
    };
    axios
        .request(province)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
})

// Router GET city
router.get('/kota', (req, res) => {
    const city = {
        method: 'GET',
        url: 'https://pro.rajaongkir.com/api/city',
        headers: {
            key: 'b4f5bd013cd49cab7d2d46f815bd07a9'
        }
    };
    axios
        .request(city)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
})


// Router GET subdistrict
router.get('/kecamatan/:city', (req, res) => {
    const param = req.params
    const subdistrict = {
        method: 'GET',
        url: 'https://pro.rajaongkir.com/api/subdistrict/' + param.city,
        headers: {
            key: 'b4f5bd013cd49cab7d2d46f815bd07a9'
        }
    };
    axios
        .request(subdistrict)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
})


router.post('/ongkos', (req, res) => {
    const price = req.body
    const subdistrict = {
        method: 'POST',
        url: 'https://pro.rajaongkir.com/api/cost',
        headers: {
            key: 'b4f5bd013cd49cab7d2d46f815bd07a9',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            origin: price.origin,
            originType: price.originType,
            destination: price.destination,
            destinationType: price.destinationType,
            weight: price.weight,
            courier: price.courier
        }
    };
    axios
        .request(subdistrict)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
})

module.exports = router
return router;