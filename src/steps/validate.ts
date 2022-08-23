import * as Cheerio from 'cheerio'
import log4js from 'log4js'
const logger = log4js.getLogger('scraper-challenge')
log4js.configure('src/config/log4js.json')

export default function validate(previosStepData) {
    try {
        logger.debug('validate')
        const $ = Cheerio.load(previosStepData)
        const validate = getData($)
        return validate
    } catch (error) {
        error.message += '\n Erro na validação, nao foi possivel validar'
        throw error
    }
}

function getData($) {
    const outcoming = [] as any
    const divSelector = 'body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div'
    const titleSelector = 'div > div.caption > h4:nth-child(2) > a'
    const descriptionSelector = 'div > div.caption > p'
    const ratingSelector = 'div > div.ratings > p'
    const reviesSelector = 'div > div.ratings > p.pull-right'
    const priceSelector = 'div > div.caption > h4.pull-right.price'
    const divs = $(divSelector)

    divs.each((i, element) => {
        const ele = $(element)
        const obj = {} as any
        if (ele.text().trim().includes('Lenovo')) {
            obj.title = ele.find(titleSelector)[0].attribs.title
            obj.description = ele.find(descriptionSelector).text()
            obj.rating = ele.find(ratingSelector).length
            obj.reviews = ele.find(reviesSelector).text()
            obj.price = ele.find(priceSelector).text()
            outcoming.push(obj)
        }
    })

    return outcoming.sort((a, b) => { a > b })
}