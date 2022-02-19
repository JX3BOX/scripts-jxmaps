const fs = require('fs')

require('dotenv').config()

const IMAGE_TARGET = process.env.IMAGE_TARGET
const TARGET = process.env.TARGET

module.exports = function () {

    const images = fs.readFileSync(`${TARGET}\\image.json`, 'utf-8')

    const _images = JSON.parse(images)

    const imgNames = _images.map(img => img.exportImageName)

    const loadings = fs.readdirSync(`${IMAGE_TARGET}\\images\\loading`)

    const maps = fs.readdirSync(`${IMAGE_TARGET}\\images\\map`)

    const combine = new Set([...loadings, ...maps])

    const diff = new Set([...imgNames].filter(x => !combine.has(x)))

    console.log(diff)
}

