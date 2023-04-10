const pool = require('../config/connection')
const { handleHttpError } = require('../utils/handleError')

const getProducts = async(req, resp) => {
    try {
        const { rows } = await pool.query('SELECT * FROM PRODUCTOS P INNER JOIN IMPUESTO I ON P.imp_prod = I.id ORDER BY id_prod ASC')
        resp.status(200).json(rows)
    } catch (err) {
        handleHttpError(resp, 'ERROR_GET_PRODUCTS')
    }
}

const getProductById = async(req, resp) => {
    try {
        const id = parseInt(req.params.id)
        const { rows } = await pool.query('SELECT * FROM productos WHERE id_prod = $1', [id])
        resp.status(200).json(rows)
    } catch (err) {
        handleHttpError(resp, 'ERROR_GET_PRODUCT_BY_ID')
    }
}

const createProduct = async(req, resp) => {
    try {
        const { object } = req.body
        const results = await pool.query('INSERT INTO productos (nombre_prod, img_prod, cant_prod, precio_prod, imp_prod, ganancia_prod) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [object.nombre_prod, object.img_prod, object.cant_prod, object.precio_prod, object.imp_prod, object.ganancia_prod])
        resp.status(201).send({status: true, mgs: `Producto agregado exitosamente con ID: ${results.rows[0].id_prod}`})
    } catch (err) {
        handleHttpError(resp, 'ERROR_CREATE_PRODUCT')
    }
}

const updateProduct = async(req, resp) => {
    try {
        const id = parseInt(req.params.id)
        const { object } = req.body
        await pool.query('UPDATE productos SET nombre_prod = $2, img_prod = $3, cant_prod = $4, precio_prod = $5, imp_prod = $6, ganancia_prod = $7 WHERE id_prod = $1',
        [id, object.nombre_prod, object.img_prod, object.cant_prod, object.precio_prod, object.imp_prod, object.ganancia_prod])
        resp.status(200).send({status: true, mgs: `Producto modificado exitosamente con ID: ${id}`})
    } catch (err) {
        handleHttpError(resp, 'ERROR_UPDATE_PRODUCT')
    }
}

const prodControl = async(req, resp) => {
    try {
        const id = parseInt(req.params.id)
        const { cant } = req.body
        await pool.query('UPDATE productos SET cant_prod = $2 WHERE id_prod = $1',
        [id, cant])
        resp.status(200).send({status: true, mgs: `Producto modificado exitosamente con ID: ${id}`})
    } catch (err) {
        handleHttpError(resp, 'ERROR_UPDATE_PRODUCT_CONTROL')
    }
}

const deleteProduct = async(req, resp) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM productos WHERE id_prod = $1 RETURNING *', [id])
        resp.status(200).send({status: true, mgs: `El Producto ${results.rows[0].nombre_prod} fue eliminado exitosamente!`})
    } catch (err) {
        handleHttpError(resp, 'ERROR_DELETE_PRODUCT')
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    prodControl,
    deleteProduct
}