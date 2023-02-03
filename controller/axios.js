const axios = require('axios');
const controller = {};


controller.getAll = function(req, res) {
    axios.get('https://y1jeig5s.directus.app/items/user_data').then(function(response) {
            res.status(200).json({
                message: 'Data Fetched',
                data: response.data
            })
        })
        .catch(function(error) {
            res.status(404).json({
                message: error.message
            })
        })
}
module.exports = controller;