const Cheerio = require('cheerio')
const fs = require('fs')
const axios = require('axios')

/**
 * O desafio é:
Acessar esse site e pegar todos notebooks Lenovo ordenando do mais barato para o mais caro. Pegar todos os dados disponíveis dos produtos.

É interessante que o robô possa ser consumido por outros serviços. Recomendamos a criação de uma pequena REST Ful API JSON para deixar mais otimizado.
 */

const json = {
    'titulo': '',
    'descricao': '',
    'rating': '',
    'reviews': '',
    'price': ''
}

async function main() {
    const outcoming = []
    const res = await axios.get('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops')
    // console.log(res.data)

    const $ = Cheerio.load(res.data)
    const divSelector = 'body > div.wrapper > div.container.test-site > div > div.col-md-9 > div > div'
    const titleSelector = 'div > div.caption > h4:nth-child(2) > a'
    const descriptionSelector = 'div > div.caption > p'
    const ratingSelector = 'div > div.ratings > p'
    const reviesSelector = 'div > div.ratings > p.pull-right'
    const priceSelector = 'div > div.caption > h4.pull-right.price'

    const divs = $(divSelector)
    let cont = 0
    divs.each((i, element) => {
        const ele = $(element)
        const obj = {}
        if (ele.text().trim().includes('Lenovo')) {
            cont++
            obj.title = ele.find(titleSelector)[0].attribs.title
            obj.description = ele.find(descriptionSelector).text()
            obj.rating = ele.find(ratingSelector).length
            obj.reviews = ele.find(reviesSelector).text()
            obj.price = ele.find(priceSelector).text().slice(1)
            outcoming.push(obj)
        }
    })
    // console.log(cont)
    // console.log(outcoming)
    // console.log(outcoming.length)
    console.log(outcoming.sort((a, b) => { a > b }))
}

main()