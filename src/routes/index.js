const lockController = require('../controllers/lock.controller')
const express = require('express')
const router = express.Router()

router.post('/create', lockController.create)

module.exports = router
