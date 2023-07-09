const winston = require('winston')
const util = require('util')
const { combine, timestamp, json, errors } = winston.format

const logger = winston.createLogger({
    exitOnError: false,
    level: 'info' || 'warn',
    format: combine(
        errors({ stack: true }),
        {
            transform: (info) => {
                const args = info[Symbol.for('splat')]
                if (args) info.message = util.format(info.message, ...args)
                return info
            },
        },
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        json()
    ),
    transports: [new winston.transports.Console()],
    exceptionHandlers: [new winston.transports.Console()],
    rejectionHandlers: [new winston.transports.Console()],
})

module.exports = logger
