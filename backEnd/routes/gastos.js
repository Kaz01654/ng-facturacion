const express = require('express')
const router = express.Router()
const { getGastos, getGastosByDate, createGastos, updateGastos, deleteGastos } = require('../controllers/gastos')

router.get('/getGastos', getGastos)
router.get('/getGastosByDate/:fecha', getGastosByDate)
router.post('/insertGasto', createGastos)
router.put('/updateGasto/:id', updateGastos)
router.delete('/deleteGasto/:id', deleteGastos)

module.exports = router