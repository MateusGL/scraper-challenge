const fs = require('fs')
const path = require('path')

const log4js = require('log4js')
const logger = log4js.getLogger('[Sequence] - preserve')

const SEQUENCE_DEBUG = !!process.env.SEQUENCE_DEBUG
const SEQUENCE_DIR = process.env.SEQUENCE_DIR || '.sequence'

async function preserve(name, step, intermediate, id) {
    if (SEQUENCE_DEBUG) {
        const filename = normalizeFileName(name, id, step) + '.json'
        const filepath = path.join(SEQUENCE_DIR, filename)
        try {

            if (!fs.existsSync(SEQUENCE_DIR)) {
                fs.mkdirSync(SEQUENCE_DIR)
            }

            fs.writeFile(filepath, JSON.stringify(intermediate), (err) => {
                logger.debug('step has been preserved')
            })

        } catch (error) {
            logger.warn(`failed to preserve intermediate of: '${filename}'`)
        }
    }
}

function normalizeFileName(...params) {
    return params.join('-')
}

exports.preserve = preserve
