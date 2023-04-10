const pool = require('../config/connection')
const { handleHttpError } = require('../utils/handleError')

const getGastosByYear = async(req, resp) => {
    try {
        const year = parseInt(req.params.year)
        const yearStart = year + '-01-01'
        const yearEnd = year + '-12-31'
        const { rows } = await pool.query(`SELECT date_trunc('month', fecha_op)::date AS fecha,
        date_part('month', fecha_op) AS mes,
        sum(valor) FILTER (WHERE tipo = 1) AS ingresos,
        sum(valor) FILTER (WHERE tipo = 2) AS gastos,
        sum(valor)::float as total
        FROM operaciones where fecha_op between $1 and $2 GROUP BY fecha, mes order by fecha asc`, [yearStart, yearEnd])
        resp.status(200).json(rows)
    } catch (err) {
        handleHttpError(resp, 'ERROR_GET_GASTOS_BY_YEAR')
    }
}

const getYears = async(req, resp) => {
    try {
        const { rows } = await pool.query(`select date_part('year', generate_series('2000-01-01', now(), '1 year')) as year order by year desc`)
        resp.status(200).json(rows)
    } catch (err) {
        handleHttpError(resp, 'ERROR_GET_YEARS')
    }
}

module.exports = {
    getGastosByYear,
    getYears
}