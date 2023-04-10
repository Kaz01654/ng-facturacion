const express = require('express')
const router = express.Router()
const { getGastosByYear, getYears } = require('../controllers/graficas')

router.get('/getGastosByYear/:year', getGastosByYear)
router.get('/getYears/', getYears)

module.exports = router