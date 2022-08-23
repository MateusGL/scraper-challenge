require('dotenv').config()
import express from 'express'
import log4js from 'log4js'
import bodyParser from 'body-parser'
import routes from './src/routes'

const logger = log4js.getLogger('scraper-challenge')
log4js.configure('src/config/log4js.json')
const { PORT } = process.env

const app = express()
app.use(bodyParser.json())

app.use('/api', routes)

app.listen(PORT, () => {
    logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
