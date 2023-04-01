const express = require('express')
const router = express.Router()
const moota = require('../moota/query_moota');

// Auth API
router.post('/generate_token', moota.generate_token)
router.post('/destroy_token', moota.destroy_token)
router.post('/user_register', moota.user_register)
router.get('/get_user', moota.user_get)
router.post('/update_user', moota.user_update)

// Bank API
router.get('/get_bank_list', moota.list_bank)
router.get('/get_bank', moota.get_bank)
router.post('/create_bank', moota.create_bank)
router.post('/update_bank/:bank_id', moota.update_bank)
router.post('/delete_bank/:bank_id/destroy', moota.delete_bank)

// Mutation API
router.post('/refresh_mutation', moota.refresh_mutation)
router.get('/list_mutation/:type/:bank/:start_date/:end_date/:tag/:page/:per_page', moota.list_mutation)
router.post('/dummy_mutation/:bank_id', moota.create_dummy)
router.post('/note_mutation/:mutation_id', moota.note_mutation)

module.exports = router