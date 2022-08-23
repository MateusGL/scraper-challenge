import log4js from 'log4js'
import Sequence from './sequence'
import { home, validate } from '../steps'
import Context from '../interfaces/context'

export const logger = log4js.getLogger('scraper')

export async function scraper(context: Context) {
    logger.debug('init')

    const sequence = new Sequence('scraper', [
        home,
        validate
    ], {}, context)

    await sequence.exec()

    return sequence.result.output
}
