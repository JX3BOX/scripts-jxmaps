const fs = require('fs')
const path = require('path')
const tga2png = require('tga2png')
const chalk = require('chalk')

require('dotenv').config()

const sourcePath = process.env.SOURCE
const targetPath = process.env.TARGET
const imagePath = process.env.IMAGE_TARGET

module.exports = function() {
  console.log('正在执行图片转换与命名')

  /**
   * map 和 loading 图分开存放
   */
  const map = `${imagePath}\\images\\map`
  const loading = `${imagePath}\\images\\loading`

  // 创建对应的 map 和 loading 文件夹
  if (!fs.existsSync(map)) {
    fs.mkdirSync(map, { recursive: true })
  }
  if (!fs.existsSync(loading)) {
    fs.mkdirSync(loading, { recursive: true })
  }

  const data = fs.readFileSync(`${targetPath}\\image.json`, 'utf-8')

  const _data = JSON.parse(data)

  // const imgData = [...new S_data.map(d.path)]

  _data.forEach(_d => {

    const paths = path.resolve(sourcePath, _d.path)

    const extname = path.extname(paths)

    if (extname === '.dds') {

      if (_d.type.indexOf('loading') > -1) {

        fs.copyFileSync(paths, `${loading}\\loading_${_d.MAPID}_0.png`)

      } else {

        const index = _d.type.slice(10, _d.type.length - 1)
        const name = `map_${_d.MAPID}_${index}`

        fs.copyFileSync(paths, `${map}\\${name}.png`)

      }
    } else if (extname === '.tga') {

      if (_d.type.indexOf('loading') > -1) {
        
        tga2png(paths, `${loading}\\loading_${_d.MAPID}_0.png`)

      } else {

        const index = _d.type.slice(10, _d.type.length - 1)
        const name = `map_${_d.MAPID}_${index}`

        tga2png(paths, `${map}\\${name}.png`)

      }
    }
  })
  console.log(chalk.green(`图片转换与命名成功`))
}