const pool = require('../config/connection')
const { handleHttpError } = require('../utils/handleError')

const getImpuesto = async(req, resp) => {
    try {
        const { rows } = await pool.query('SELECT * FROM IMPUESTO ORDER BY id ASC')
        resp.status(200).json(rows)
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_IMPUESTO')
    }
}

const createImpuesto = async(req, resp) => {
    try {
        const { object } = req.body
        const results = await pool.query('INSERT INTO IMPUESTO (descripcion, impuesto) VALUES ($1, $2) RETURNING *',
        [object.descripcion, object.impuesto])
        resp.status(201).send({status: true, mgs: `Impuesto agregado exitosamente con ID: ${results.rows[0].id}`})
    } catch (err) {
        handleHttpError(resp, 'ERROR_CREATE_IMPUESTO')
    }
}

const updateImpuesto = async(req, resp) => {
    try {
        const id = parseInt(req.params.id)
        const { object } = req.body
        await pool.query('UPDATE IMPUESTO SET descripcion = $2, impuesto = $3 WHERE id = $1',
        [id, object.descripcion, object.impuesto])
        resp.status(200).send({status: true, mgs: `Impuesto modificado exitosamente con ID: ${id}`})
    } catch (err) {
        handleHttpError(resp, 'ERROR_UPDATE_IMPUESTO')
    }
}

const deleteImpuesto = async(req, resp) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM IMPUESTO WHERE id = $1 RETURNING *', [id])
        resp.status(200).send({status: true, mgs: `El Impuesto ${results.rows[0].descripcion} fue eliminado exitosamente!`})
    } catch (err) {
        handleHttpError(resp, 'ERROR_DELETE_IMPUESTO')
    }
}

module.exports = {
    getImpuesto,
    createImpuesto,
    updateImpuesto,
    deleteImpuesto
}