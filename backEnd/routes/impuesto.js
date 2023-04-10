const express = require('express')
const router = express.Router()
const { getImpuesto, createImpuesto, updateImpuesto, deleteImpuesto } = require('../controllers/impuesto')

router.get('/getImpuesto', getImpuesto)
router.post('/insertImp', createImpuesto)
router.put('/updateImp/:id', updateImpuesto)
router.delete('/deleteImp/:id', deleteImpuesto)

module.exports = router