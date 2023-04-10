const { body, check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorsCreateUser = [
    body('nombre').exists().not().isEmpty().withMessage('Este campo viene vacio o no existe.'),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorsGetUserByID = [
    check('id').exists().not().isEmpty().withMessage('Este campo viene vacio o no existe.'),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {
    validatorsCreateUser,
    validatorsGetUserByID
}