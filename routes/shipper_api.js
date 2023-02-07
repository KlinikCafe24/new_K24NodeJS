const express = require('express')
const router = express.Router()
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')

router.get('/search_location', (req, res) => {
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_countries', (req, res) => {
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/countries',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_countryByID/:country_id', (req, res) => {
    const id = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/country/' + id.country_id,
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_province', (req, res) => {
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/provinces',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_provinceByID/:province_id', (req, res) => {
    const id = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/province/' + id.province_id,
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_provinceByCountryID/:country_id/provinces', (req, res) => {
    const id = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/country/' + id.country_id + '/provinces',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_cities', (req, res) => {
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/cities',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_citiesByID/:city_id', (req, res) => {
    const id = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/city/' + id.city_id,
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_citiesByProvinceID/:province_id', (req, res) => {
    const id = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/province/' + id.province_id + '/cities',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_suburbs', (req, res) => {
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/suburbs',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_suburbsByCityID/:city_id', (req, res) => {
    const id = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/city/' + id.city_id + '/suburbs',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_suburbsByID/:suburbs_id', (req, res) => {
    const id = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/suburb/' + id.suburbs_id,
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_areas', (req, res) => {
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/areas',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_areasByID/:area_id', (req, res) => {
    const id = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/area/' + id.area_id,
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_areasBySuburbsID/:suburb_id', (req, res) => {
    const id = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/location/suburb/' + id.suburb_id + '/areas',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.get('/get_active_logistic', (req, res) => {
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/logistic',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        }
    };
    axios
        .request(status)
        .then(function(response) {
            ddw
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

router.post('/create_order', (req, res) => {
    const order = req.body
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/order',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        },
        data: {
            consignee: {
                name: order.name,
                phone_number: order.phone_number
            },
            consigner: {
                name: order.name,
                phone_number: order.phone_number
            },
            courier: {
                rate_id: order.rate_id
            },
            coverage: order.coverage,
            destination: {
                address: order.address,
                area_id: order.area_id
            },
            origin: {
                address: order.address,
                area_id: order.area_id
            },
            package: {
                height: order.height,
                items: {
                    name: order.name,
                    price: order.price,
                    qty: order.qty
                },
                length: order.length,
                weight: order.weight,
                width: order.width
            },
            payment_type: order.payment_type
        }
    };
    axios
        .request(status)
        .then(function(response) {
            ddw
            console.log(response.data);
            res.json(response.data)
        })
        .catch(function(error) {
            console.error(error);
            res.send(error)
        });
});

module.exports = router