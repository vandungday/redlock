const { default: Redis } = require('ioredis')
const { logger } = require('../utils')
const redisURI = require('../configs').redis.uri

const redis = new Redis(redisURI)

redis.on('connect', () => {
    logger.info('Redis is connected')
})

redis.on('end', () => {
    logger.error('Redis is disconnected')
})

redis.on('disconnect', () => {
    logger.error('Redis is disconnected')
})

redis.on('error', () => {
    logger.error('Redis is disconnected')
})

module.exports = redis
