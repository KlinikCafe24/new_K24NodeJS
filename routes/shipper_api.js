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
            best_price: order.best_price,
            consignee: {
                name: order.name,
                phone_number: order.phone_number
            },
            consigner: {
                name: order.name,
                phone_number: order.phone_number
            },
            courier: {
                cod: order.cod,
                rate_id: order.rate_id,
                use_insurance: order.use_insurance
            },
            coverage: order.coverage,
            destination: {
                address: order.address,
                area_id: order.area_id,
                area_name: order.area_name,
                city_id: order.city_id,
                city_name: order.city_name,
                country_id: order.country_id,
                country_name: order.country_name,
                direction: order.direction,
                lat: order.lat,
                lng: order.lng,
                postcode: order.postcode,
                province_id: order.province_id,
                province_name: order.province_name,
                suburb_id: order.suburb_id,
                suburb_name: order.suburb_name
            },
            external_id: order.external_id,
            origin: {
                address: order.address,
                area_id: order.area_id,
                area_name: order.area_name,
                city_id: order.city_id,
                city_name: order.city_name,
                country_id: order.country_id,
                country_name: order.country_name,
                direction: order.direction,
                lat: order.lat,
                lng: order.lng,
                postcode: order.postcode,
                province_id: order.province_id,
                province_name: order.province_name,
                suburb_id: order.suburb_id,
                suburb_name: order.suburb_name
            },
            package: {
                height: order.height,
                items: {
                    id: order.id,
                    name: order.name,
                    price: order.price,
                    qty: order.qty
                },
                length: order.length,
                package_type: order.package_type,
                price: order.price,
                weight: order.weight,
                width: order.width
            },
            payment_type: order.payment_type,
            service_type: order.service_type
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

router.get('/get_orderDetails/:order_id', (req, res) => {
    const id = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/order/' + id.order_id,
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

router.get('/get_orderStatus/:status_id', (req, res) => {
    const id = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/order/status/' + id.status_id,
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

router.get('/get_availableOrder/', (req, res) => {
    const avail = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/order',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        },
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

router.put('/get_updateOrder/:order_id', (req, res) => {
    const avail = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/order/' + avail.order_id,
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        },
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

router.delete('/get_deleteOrder/:order_id', (req, res) => {
    const avail = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/order/' + avail.order_id,
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        },
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

router.post('/create_pickup_order', (req, res) => {
    const order = req.body
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/pickup',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        },
        data: {
            order_activation: {
                agent_id: order.agent_id,
                order_id: order.order_id,
                pickup_time: order.pickup_time
            }
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

router.patch('/cancel_pickup', (req, res) => {
    const order = req.body
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/pickup/cancel',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        },
        data: {
            pickupCode: order.pickupCode
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

router.post('/pickup_timeslot', (req, res) => {
    const order = req.body
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/pickup/timeslot',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        },
        data: {
            order_activation: {
                end_time: order.end_time,
                order_id: order.order_id,
                start_time: order.start_time,
                timezone: order.timezone
            }
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

router.get('/pickup_timeslot/:timezone/:request_time', (req, res) => {
    const order = req.params
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/pickup/timeslot' + order.timezone + order.request_time,
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        },
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

router.post('/pricing_domestic', (req, res) => {
    const pricing = req.body
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/pricing/domestic',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        },
        data: {
            destination: {
                area_id: pricing.area_id,
                lat: pricing.lat,
                lng: pricing.lng,
                suburb_id: pricing.suburb_id
            },
            for_order: pricing.for_order,
            height: pricing.height,
            item_value: pricing.item_value,
            length: pricing.length,
            limit: pricing.limit,
            origin: {
                area_id: pricing.area_id,
                lat: pricing.lat,
                lng: pricing.lng,
                suburb_id: pricing.suburb_id
            },
            page: pricing.page,
            sort_by: pricing.sort_by,
            weight: pricing.weight,
            width: pricing.width
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

router.post('/pricing_domesticByRate/:rate_type', (req, res) => {
    const pricing = req.body
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/pricing/international',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        },
        data: {
            destination: {
                area_id: pricing.area_id,
                lat: pricing.lat,
                lng: pricing.lng,
                suburb_id: pricing.suburb_id
            },
            for_order: pricing.for_order,
            height: pricing.height,
            item_value: pricing.item_value,
            length: pricing.length,
            limit: pricing.limit,
            origin: {
                area_id: pricing.area_id,
                lat: pricing.lat,
                lng: pricing.lng,
                suburb_id: pricing.suburb_id
            },
            page: pricing.page,
            sort_by: pricing.sort_by,
            weight: pricing.weight,
            width: pricing.width
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

router.post('/pricing_domestic', (req, res) => {
    const pricing = req.body
    const status = {
        method: 'GET',
        url: 'https://merchant-api-sandbox.shipper.id/v3/pricing/domestic',
        headers: {
            accept: 'application/json',
            'X-API-Key': 'QF22PVYG9RodVcDDFpaydXo8isGtd0TERtBPztxiQq1cODbypQuKszCE2361HPLT'
        },
        data: {
            destination: {
                area_id: pricing.area_id,
                lat: pricing.lat,
                lng: pricing.lng,
                suburb_id: pricing.suburb_id
            },
            for_order: pricing.for_order,
            height: pricing.height,
            item_value: pricing.item_value,
            length: pricing.length,
            limit: pricing.limit,
            origin: {
                area_id: pricing.area_id,
                lat: pricing.lat,
                lng: pricing.lng,
                suburb_id: pricing.suburb_id
            },
            page: pricing.page,
            sort_by: pricing.sort_by,
            weight: pricing.weight,
            width: pricing.width
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