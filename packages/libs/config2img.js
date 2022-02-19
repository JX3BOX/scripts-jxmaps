const fs = require('fs')
const iconv = require('iconv-lite')
const path = require('path')
const chalk = require('chalk')

require('dotenv').config()

const sourcePath = process.env.SOURCE
const targetPath = process.env.TARGET

module.exports = function () {
    console.log('正在生成图片存放路径')

    const keys = ['MAPID', '名称', '图片类型', '图片格式', '图片路径']

    const mapJson = fs.readFileSync(`${targetPath}\\map.json`, 'utf-8')

    const _mapJson = JSON.parse(mapJson)

    const rows = []

    rows.push(keys.join('\t'))

    const imagePaths = []

    _mapJson.forEach(_map => {

        // 拼接源文件地址
        const paths = path.resolve(sourcePath, _map.ConfigPath)

        if (fs.existsSync(paths)) {
            const data = fs.readFileSync(paths, 'binary')

            const gbData = iconv.decode(data, 'gbk')

            const formatData = gbData.match(/\[\w+\]/g).filter(f => !f.includes('config'))

            const _data = gbData.split('\n').map(d => d.replace('\r', ''))

            const parentPath = path.dirname(_map.ConfigPath)

            _data.filter(da => da.includes('image')).forEach((_d, index) => {
                const imgName = _d.split('=')[1]
                const extname = imgName.split('.')[1]
                const fIndex = formatData[index].slice(10, formatData[index].length - 1)
                const exportImageName = formatData[index].includes('loading') ? `loading_${_map.ID}_0.png` : `map_${_map.ID}_${fIndex}.png`
                const item = [_map.ID, _map.Name, formatData[index], extname, `${parentPath}\\${imgName}`, exportImageName].join('\t')

                const obj = {
                    "MAPID": _map.ID,
                    "name": _map.Name,
                    "type": formatData[index],
                    "pattern": extname,
                    "path": `${parentPath}\\${imgName}`.trim(),
                    exportImageName
                }

                imagePaths.push(obj)
                rows.push(item)
            })
        }
    })

    fs.writeFileSync(`${targetPath}\\image.tab`, iconv.encode(rows.join('\n'), 'gbk'), { encoding: 'binary' })
    fs.writeFileSync(`${targetPath}\\image.json`, JSON.stringify(imagePaths))
    console.log(chalk.green(`在 ${targetPath} 目录生成 image.txt 存放图片路径成功 :)`))
}
