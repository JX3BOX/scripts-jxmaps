const fs = require('fs')
const path = require('path')
const iconv = require('iconv-lite')
const chalk = require('chalk')

require('dotenv').config()

const sourcePath = process.env.SOURCE
const targetPath = process.env.TARGET

module.exports = function () {
  console.log('正在执行检验图片操作')
  fs.readFile(`${targetPath}\\image.tab`, "binary", function(err, data){
    const _data = iconv.decode(data, 'gbk')
    var rows = _data.split("\n");
    var json = [];
    var keys = [];

    rows.forEach((value, index)=>{
        if (index < 1) {
          // get the keys from the first row in the tab space file
          keys = value.split("\t");
        } else {
          // put the values from the following rows into object literals
          values = value.split("\t");
          json[index-1] = values.map((value, index) => {
              return {
                  [keys[index]]: value
              }
          }).reduce((currentValue, previousValue) => {
              return {
                  ...currentValue,
                  ...previousValue
              }
          });
        }
    })
  
    json.forEach(tJson => {
      const paths = path.resolve(sourcePath, tJson['图片路径'])
      if (!fs.existsSync(paths)) {
        const extname = path.extname(tJson['图片路径'])
        if (extname === '.tga') {
          tJson['图片路径'] = tJson['图片路径'].replace(/.tga/, '.dds')
        } else if (extname === '.dds') {
          tJson['图片路径'] = tJson['图片路径'].replace(/.dds/, '.tga')
        }
        return tJson
      }
    })

    console.log(json)

    const _keys = ['MAPID', '名称', '图片类型', '图片格式', '图片路径']

    const _rows = []

    _rows.push(_keys.join('\t'))

    json.forEach(_json => {
      _rows.push([_json.MAPID, _json['名称'], _json['图片类型'], _json['图片格式'], _json['图片路径']].join('\t'))
    })
  
    fs.writeFileSync(`${targetPath}\\image.tab`, iconv.encode(_rows.join('\n'), 'gbk'), { encoding: 'binary'})
    console.log(chalk.green(`图片校验完成`))
  })

  const data = fs.readFileSync(`${targetPath}\\image.json`, 'utf-8')

  const _data = JSON.parse(data)

  _data.map(d => {

    if (!fs.existsSync(d.path)) {
      const extname = path.extname(d.path)
      if (extname === '.tga') {
        d.path = d.path.replace(/.tga/, '.dds')
      } else if (extname === '.dds') {
        d.path = d.path.replace(/.dds/, '.tga')
      }
      return d
    }
  })

  fs.writeFileSync(`${targetPath}\\image.json`, JSON.stringify(_data))

}
