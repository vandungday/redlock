const { logger } = require('../utils')

module.exports = (err, req, res, next) => {
    const { statusCode = 500 } = err
    const { message = 'Internal Server Error' } = err
    logger.error('[REQUEST_ERROR]', err)

    return res.status(statusCode).json({
        message,
    })
}
