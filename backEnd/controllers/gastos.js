const pool = require('../config/connection')
const { handleHttpError } = require('../utils/handleError')

const getGastos = async(req, resp) => {
    try {
        const { rows } = await pool.query(`select o.*, t.descripcion as tipo_desc, c.descripcion as cat_desc 
        from operaciones o
        inner join tipo_operacion t on o.tipo = t.id
        inner join categorias c on o.categoria = c.id ORDER BY o.id ASC`)
        resp.status(200).json(rows)
    } catch (err) {
        handleHttpError(resp, 'ERROR_GET_GASTOS')
    }
}

const getGastosByDate = async(req, resp) => {
    try {
        const fecha = req.params.fecha
        const { rows } = await pool.query(`select o.*, t.descripcion as tipo_desc, c.descripcion as cat_desc
        from operaciones o
        inner join tipo_operacion t on o.tipo = t.id
        inner join categorias c on o.categoria = c.id
        where o.fecha_op = $1 ORDER BY o.id ASC`, [fecha])
        resp.status(200).json(rows)
    } catch (err) {
        handleHttpError(resp, 'ERROR_GET_GASTOS_BY_DATE')
    }
}

const createGastos = async(req, resp) => {
    try {
        const { object } = req.body
        const results = await pool.query('INSERT INTO operaciones (descripcion, valor, cantidad, tipo, categoria, fecha_op) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [object.descripcion, object.valor, object.cantidad, object.tipo, object.categoria, object.fecha_op])
        resp.status(201).send({status: true, mgs: `Operacion agregada exitosamente con ID: ${results.rows[0].id}`, data: results.rows[0]})
    } catch (err) {
        handleHttpError(resp, 'ERROR_CREATE_GASTOS')
    }
}

const updateGastos = async(req, resp) => {
    try {
        const id = parseInt(req.params.id)
        const { object } = req.body
        await pool.query('UPDATE operaciones SET descripcion = $2, valor = $3, cantidad = $4, fecha_op = $5 WHERE id = $1',
        [id, object.descripcion, object.valor, object.cantidad, object.fecha_op])
        resp.status(200).send({status: true, mgs: `Operacion modificada exitosamente con ID: ${id}`})
    } catch (err) {
        handleHttpError(resp, 'ERROR_UPDATE_GASTOS')
    }
}

const deleteGastos = async(req, resp) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM operaciones WHERE id = $1 RETURNING *', [id])
        resp.status(200).send({status: true, mgs: `La Operacion ${results.rows[0].descripcion} fue eliminada exitosamente!` , data: results.rows[0]})
    } catch (err) {
        handleHttpError(resp, 'ERROR_DELETE_GASTOS')
    }
}

module.exports = {
    getGastos,
    getGastosByDate,
    createGastos,
    updateGastos,
    deleteGastos
}