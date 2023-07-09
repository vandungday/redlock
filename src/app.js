const express = require('express')
const handleError = require('./middlewares/handle-error')
const { logger } = require('./utils')
const router = require('./routes')

const app = express()
const PORT = 3000

app.get('/', (req, res, next) => {
    res.send('Hello World')
})

app.use(express.json())

app.use(router)

app.use(handleError)

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
})
