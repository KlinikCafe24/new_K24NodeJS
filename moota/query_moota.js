const axios = require('axios')
const request = require('request')
require('dotenv').config();
const {
    AUTH_MOOTA,
    // EMAIL_MOOTA,
    // PASSWORD_MOOTA
} = process.env;


const moota = {
    // email: EMAIL_MOOTA,
    // password: PASSWORD_MOOTA,
    Authorization: AUTH_MOOTA
};

// Auth Start
function generate_token(req, res) {
    const pay = req.body
    const token = {
        method: 'POST',
        url: 'https://app.moota.co/api/v2/auth/login',
        headers: {
            'Location': '/api/v2/auth/login',
            'Accept': 'application/json',
            'Authorization': moota.Authorization
        },
        body: {
            email: pay.email,
            password: pay.password,
            scopes: "api"
        }
    }
    axios
        .request(token)
        .then(function(response) {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(function(error) {
            console.log(error)
            res.status(500).json(error)
        })
}

function destroy_token(req, res) {
    const token = {
        method: 'POST',
        url: 'https://app.moota.co/api/v2/auth/logout',
        headers: {
            'Location': '/api/v2/auth/logout',
            'Accept': 'application/json',
            'Authorization': moota.Authorization
        },
    }
    axios
        .request(token)
        .then(function(response) {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(function(error) {
            console.log(error)
            res.status(500).json(error)
        })
}

function user_register(req, res) {
    const reg = req.body
    const user = {
        method: 'POST',
        url: 'https://app.moota.co/api/v2/auth/register',
        headers: {
            'Location': '/api/v2/auth/register',
            'Accept': 'application/json',
        },
        body: {
            name: reg.name,
            email: reg.email,
            password: reg.password,
            password_confirmation: reg.password_confirmation
        }
    }
    axios
        .request(user)
        .then(function(response) {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(function(error) {
            console.log(error)
            res.status(500).json(error)
        })
}

function user_get(req, res) {
    const user = {
        method: 'GET',
        url: 'https://app.moota.co/api/v2/user',
        headers: {
            'Location': '/api/v2/auth/user',
            'Accept': 'application/json',
            'Authorization': moota.Authorization
        },
    }
    axios
        .request(user)
        .then(function(response) {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(function(error) {
            console.log(error)
            res.status(500).json(error)
        })
}

function user_update(req, res) {
    const update = req.body
    const user = {
        method: 'POST',
        url: 'https://app.moota.co/api/v2/user',
        headers: {
            'Location': '/api/v2/auth/user',
            'Accept': 'application/json',
            'Authorization': moota.Authorization
        },
        body: {
            name: update.name,
            email: update.email,
            no_ktp: update.no_ktp,
            alamat: update.alamat
        }
    }
    axios
        .request(user)
        .then(function(response) {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(function(error) {
            console.log(error)
            res.status(500).json(error)
        })
}

// Auth End

// Bank Start
function list_bank(req, res) {
    const bank = {
        method: 'GET',
        url: 'https://app.moota.co/api/v2/bank/available',
        headers: {
            'Location': 'api/v2/bank/available',
            'Accept': 'application/json',
            'Authorization': moota.Authorization
        },
    }
    axios
        .request(bank)
        .then(function(response) {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(function(error) {
            console.log(error)
            res.status(500).json(error)
        })
}

function get_bank(req, res) {
    // const getParam = req.params
    const bank = {
        method: 'GET',
        url: 'https://app.moota.co/api/v2/bank',
        headers: {
            'Location': 'api/v2/bank',
            'Accept': 'application/json',
            'Authorization': moota.Authorization
        },
    }
    axios
        .request(bank)
        .then(function(response) {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(function(error) {
            console.log(error)
            res.status(500).json(error)
        })
}

function create_bank(req, res) {
    const create = req.body
    const bank = {
        method: 'POST',
        url: 'https://app.moota.co/api/v2/bank/store',
        headers: {
            'Location': '/api/v2/store',
            'Accept': 'application/json',
            'Authorization': moota.Authorization
        },
        body: {
            corporate_id: create.corporate_id,
            bank_type: create.bank_type,
            username: create.username
        }
    }
    axios
        .request(bank)
        .then(function(response) {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(function(error) {
            console.log(error)
            res.status(500).json(error)
        })
}

function update_bank(req, res) {
    const update = req.body
    const getParam = req.params
    const bank = {
        method: 'POST',
        url: 'https://app.moota.co/api/v2/bank/update/' + getParam.bank_id,
        headers: {
            'Location': '/api/v2/update/' + getParam.bank_id,
            'Accept': 'application/json',
            'Authorization': moota.Authorization
        },
        body: {
            corporate_id: update.corporate_id,
            bank_type: update.bank_type,
            username: update.username,
            password: update.password,
            name_holder: update.name_holder,
            account_number: update.account_number,
            is_active: update.is_active
        }
    }
    axios
        .request(bank)
        .then(function(response) {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(function(error) {
            console.log(error)
            res.status(500).json(error)
        })
}

function delete_bank(req, res) {
    const getParam = req.params
    const bank = {
        method: 'POST',
        url: 'https://app.moota.co/api/v2/bank/' + getParam.bank_id + '/destroy',
        headers: {
            'Location': 'api/v2/bank/' + getParam.bank_id + '/destroy',
            'Accept': 'application/json',
            'Authorization': moota.Authorization
        },
    }
    axios
        .request(bank)
        .then(function(response) {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(function(error) {
            console.log(error)
            res.status(500).json(error)
        })
}

// Bank End

// Mutation Start
function refresh_mutation(req, res) {
    const getParam = req.params
    const bank = {
        method: 'POST',
        url: 'https://private-anon-2e98711558-mootaapiv2.apiary-mock.com/api/v2/bank/' + getParam.bank_id + '/refresh',
        headers: {
            'Location': '/api/v2/bank/store',
            'Accept': 'application/json',
            'Authorization': moota.Authorization
        },
    }
    axios
        .request(bank)
        .then(function(response) {
            console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(function(error) {
            console.log(error)
            res.status(500).json(error)
        })
}


// Mutation End

module.exports = {
    generate_token,
    destroy_token,
    user_register,
    user_get,
    user_update,
    list_bank,
    get_bank,
    create_bank,
    update_bank,
    delete_bank,
    refresh_mutation,

}