import log4js from 'log4js'
import Context from "../interfaces/context"
import Outgoing from "../interfaces/outgoing"
import ILogService from "../interfaces/i-log-service"

const logger = log4js.getLogger('LogService')

export function logService(context: Context, init: number, outgoing: Outgoing) {
    try {
        const log: ILogService = {
            information: {
                incoming: context.incoming,
                latency: { ...context.latency, overall: Date.now() - init },
                result: outgoing
            },
            type: 'kibana-log',
            status: outgoing.RESULT
        }

        if (log.information.incoming.password_proxy) {
            log.information.incoming.password_proxy = '*****'
        }

        logger.info(JSON.stringify(log))

    } catch (error) {
        logger.info(JSON.stringify({
            information: { incoming: context.incoming },
            type: 'kibana-log',
            status: 'error',
            result: {
                message: error.message,
                stack: error.stack
            }
        }))
    }
}
