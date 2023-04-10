const express = require('express')
const router = express.Router()
const { validatorsCreateUser, validatorsGetUserByID } = require('../validators/users')
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/users')

router.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

router.get('/users', getUsers)
router.get('/users/:id', validatorsGetUserByID, getUserById)
router.post('/users', validatorsCreateUser, createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

module.exports = router