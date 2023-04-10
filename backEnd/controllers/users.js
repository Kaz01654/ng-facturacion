const pool = require('../config/connection')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const getUsers = async(req, resp) => {
    try {
        const { rows } = await pool.query('SELECT * FROM usuarios ORDER BY id ASC')
        resp.status(200).json(rows)
    } catch (err) {
        handleHttpError(resp, 'ERROR_GET_USERS')
    }
}

const getUserById = async(req, resp) => {
    try {
        req = matchedData(req)
        const { id } = req
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id])
        resp.status(200).json(rows)
    } catch (err) {
        handleHttpError(resp, 'ERROR_GET_USERS_BY_ID')
    }
}

const createUser = async(req, resp) => {
    try {
        const { nombre } = req.body
        const results = await pool.query('INSERT INTO usuarios (nombre) VALUES ($1) RETURNING *', [nombre])
        resp.status(201).send(`Usuario agregado existosamente con ID: ${results.rows[0].id}`)
    } catch (err) {
        handleHttpError(resp, 'ERROR_CREATE_USER')
    }
}

const updateUser = async(req, resp) => {
    try {
        const id = parseInt(req.params.id)
        const { nombre } = req.body
        await pool.query('UPDATE usuarios SET nombre = $1 WHERE id = $2', [nombre, id])
        resp.status(200).send(`Usuario modificado existosamente con ID: ${id}`)
    } catch (err) {
        handleHttpError(resp, 'ERROR_UPDATE_USER')
    }
}

const deleteUser = async(req, resp) => {
    try {
        const id = parseInt(req.params.id)
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id])
        resp.status(200).send(`Usuario eliminado exitosamente con ID: ${id}`)
    } catch (err) {
        handleHttpError(resp, 'ERROR_DELETE_USER')
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}