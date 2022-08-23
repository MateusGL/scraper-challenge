import express from 'express'
import { scraperController } from '../controller'

const router = express.Router()

router.post('/scraper', scraperController)

export default router