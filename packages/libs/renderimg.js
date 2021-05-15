const fs = require('fs')
const path = require('path')
const tga2png = require('tga2png')
const chalk = require('chalk')

module.exports = function() {
  console.log('正在执行图片转换与命名')
  const current = process.cwd()

  /**
   * map 和 loading 图分开存放
   */
  const map = `${current}\\images\\map`
  const loading = `${current}\\images\\loading`

  // 创建对应的 map 和 loading 文件夹
  if (!fs.existsSync(map)) {
    fs.mkdirSync(map, { recursive: true })
  }
  if (!fs.existsSync(loading)) {
    fs.mkdirSync(loading, { recursive: true })
  }

  const data = fs.readFileSync(`${current}\\map.json`, 'utf-8')

  const _data = JSON.parse(data)

  /**
   * 先执行 filter 去除 map 数组中 id 为空的地图
   */
  _data.filter(d => d.ID).forEach(_d => {

    const parentPath = path.dirname(_d.ResourcePath)

    if (parentPath) {
      if (fs.existsSync(`${parentPath}minimap`)) {

        const imgFile = fs.readFileSync(`${parentPath}minimap\\image.txt`, 'utf-8')
    
        const imgPaths = imgFile.split('\n')

        imgPaths.forEach((imgPath, index) => {

          const extname = path.extname(imgPath)

          if (extname === '.dds') {
            /**
             * 当图片命中含有 loading 或者处于最后一个时，认定为 map 图
             */
            if (path.basename(imgPath).indexOf('loading') > -1 || index === imgPaths.length - 1) {
  
              fs.copyFileSync(imgPath, `${loading}\\loading_${_d.ID}_0.png`)
            } else {
              const name = `map_${_d.ID}_${index}`

              fs.copyFileSync(imgPath, `${map}\\${name}.png`)
            }
          } else if (extname === '.tga') {
            if (path.basename(imgPath).indexOf('loading') > -1 || index === imgPaths.length - 1) {
  
              tga2png(imgPath, `${loading}\\loading_${_d.ID}_0.png`)
            } else {
              const name = `map_${_d.ID}_${index}`

              tga2png(imgPath, `${map}\\${name}.png`)
            }
          }
        })
        console.log(chalk.green(`${parentPath} 图片转换与命名成功`))
      }
    }
  })

}