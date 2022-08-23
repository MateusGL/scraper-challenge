const log4js = require('log4js')
const { preserve } = require("./preserve")
const logger = log4js.getLogger('Sequence')

class sequence {
    constructor(name, steps, ...args) {
        this.name = name
        this.steps = steps
        this.init = Date.now()
        this.result = { success: true, output: null, error: null, latency: null }
        logger.debug(name)
        this.intermediate = ''
    }

    async exec() {
        const promises = []
        for (let index = 0; index < this.steps.length; index++) {
            const id = '#' + (index + 1)
            const step = this.steps[index]
            try {
                await this.execute(step, id, this.result)
            } catch (error) {
                this.result.success = false
                this.result.output = null
                this.result.error = error
                logger.error(`processed ${index} steps of ${this.steps.length}`)
                logger.error(`error on step [${step.name}]`)
                logger.error(error)
                break
            }
        }

        await preserve(this.name, 'finish', this.intermediate, this.steps.length + 1)

        if (!this.result.success) {
            throw new Error(result.error)
        }
        this.result.latency = Date.now() - this.init
        return this.result

    }
    async execute(step, id) {
        await preserve(this.name, step.name, this.intermediate, id)
        logger.debug(`running step [${step.name}] ${id}...`)

        this.intermediate = await step(this.intermediate)
        logger.debug(`step [${step.name}] is complete`)

        this.result.output = this.intermediate
    }
}


module.exports = sequence