const { Redis, Redlock } = require('../connections')
const { logger, sleep } = require('../utils')

const LOCK_KEY = 'locks:create:data'
const TTL = 60000
const REDLOCK_PREFIX = '[REDLOCK]'

exports.create = async (req, res, next) => {
    Redlock.lock(LOCK_KEY, TTL).then(async (lock) => {
        try {
            const { key, value } = req.body
            logger.info(`${REDLOCK_PREFIX}: Locking resource ${LOCK_KEY}...`)
            logger.info(
                `${REDLOCK_PREFIX}: Setting key=${key} | value=${value} ...`
            )
            await Redis.set(key, value)
            logger.info(`${REDLOCK_PREFIX}: Waiting for 10s...`)
            await sleep(10000)

            logger.info(
                `${REDLOCK_PREFIX}: Successfully set key=${key} | value=${value}`
            )
            res.send('OK')
        } catch (error) {
            next(error)
        } finally {
            await lock.unlock().catch(function (error) {
                next(error)
            })
        }
    })
}
