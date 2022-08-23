import log4js from 'log4js'
import * as express from 'express'

import { incomingValidate } from '../schemas'
import { scraper } from '../services/scraper-service'
import Context from '../interfaces/context'
import Outgoing from '../interfaces/outgoing'
import { logService } from "../services/logService"

const logger = log4js.getLogger('CONTROLLER')

export async function scraperController(req: express.Request, res: express.Response) {
    const init = Date.now()
    const outgoing = {
        RESULT: 'sucess' as string,
        DATA: '' as any,
        ERRORS: [] as any
    } as Outgoing

    const context = { incoming: null, outgoing, latency: {} } as Context

    try {
        const incoming = incomingValidate(req.body)
        context.incoming = incoming

        outgoing.DATA = await scraper(context)
        logger.info(outgoing.DATA)

    } catch (error) {
        outgoing.RESULT = 'error'
        const msg = error.message
        outgoing.ERRORS.push(msg)
        logger.error(error)
        res.status(400)
    } finally {
        res.send(outgoing)
        logService(context, init, outgoing)
    }

}