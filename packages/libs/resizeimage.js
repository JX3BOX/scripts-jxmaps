const images = require('images')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

const targetPath = process.env.TARGET
const imagePath = process.env.IMAGE_TARGET
const ddsPath = process.env.DDS2PNGPATH
const width = process.env.WIDTH
const height = process.env.HEIGHT

module.exports = function () {

  // 重设大小后放置的文件夹
  const resizeDir = `${imagePath}\\images\\loading`

  if (!fs.existsSync(resizeDir)) {
    fs.mkdirSync(resizeDir, { recursive: true })
  }

  const loading_maps = fs.readdirSync(`${ddsPath}`)

  // console.log(loading_maps)

  loading_maps.forEach((img) => {

    if (Number(height)) {

      images(`${ddsPath}\\${img}`)
      .size(Number(width), Number(height))
      .save(`${resizeDir}\\${img}`)

    } else {

      images(`${ddsPath}\\${img}`)
      .size(Number(width))
      .save(`${resizeDir}\\${img}`)

    }
  })

}
