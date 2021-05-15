const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports = function () {
  console.log('正在执行检验图片操作')
  const data = fs.readFileSync('./config.txt', 'utf-8')

  const _data = data.split('\n')

  _data.forEach(d => {
    const parentPath = path.dirname(d)

   if (fs.existsSync(`${parentPath}`)) {

      fs.readFile(`${parentPath}\\image.txt`, 'utf-8', (err, imgData) => {
        if (err) {
          console.log(err)
        } else {
          const _imgData = imgData.split('\n');
  
          _imgData.forEach((img, index) => {
            if (!fs.existsSync(img)) {
              const extname = path.extname(img)
              if (extname === '.tga') {
                _imgData[index] = img.replace(/.tga/, '.dds')
              } else if (extname === '.dds') {
                _imgData[index] = img.replace(/.dds/, '.tga')
              }
            }
          })
          // console.log(_imgData)
          fs.writeFileSync(`${parentPath}\\image.txt`, _imgData.join('\n'))
        }
      })
    }
  })
  console.log(chalk.green(`图片校验完成`))
}
