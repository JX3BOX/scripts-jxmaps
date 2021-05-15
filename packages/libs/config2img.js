const fs = require('fs')
const iconv = require('iconv-lite')
const path = require('path')
const chalk = require('chalk')

module.exports = function() {
  console.log('正在生成图片存放路径')
  fs.readFile('./config.txt', 'utf8', (err, data) => {
    const _data = data.split('\n')

    _data.forEach(dPath => {
      if (fs.existsSync(dPath)) {
        fs.readFile(dPath, 'binary', (err, dPathData) => {
          if (err) {
            console.log(err)
          } else {
            // 需要转为 gbk 防止中文乱码
            const gbData = iconv.decode(dPathData, 'gbk')
            const _dPathData = gbData.split('\n')
            const images = []
            const parentPath = path.dirname(dPath)

            _dPathData.forEach(item => {
              // console.log(item.split(/\[\w+\]/g))
              if (item.indexOf('image=') > -1) {
                const imgName = item.split('=')[1]
                images.push(`${parentPath}\\${imgName}`)
              }
            })
            // 去重
            const sortedImgs = [...new Set(images)]
            fs.writeFileSync(`${parentPath}\\image.txt`, sortedImgs.join('\n'))

            console.log(chalk.green(`在 ${parentPath} 目录生成 image.txt 存放图片路径成功 :)`))
          }
        })
      }
    })
  })
}
