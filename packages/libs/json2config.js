const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

require('dotenv').config()

const targetPath = process.env.TARGET

module.exports = function () {
    console.log('正在执行 map.json -> config.txt')
    const data = fs.readFileSync(`${targetPath}\\map.json`, 'utf-8');

    const _data = JSON.parse(data)
    let configPaths = []
    _data.forEach(d => {
        // 大地图的 source path
        const _path = d.ID && d.ResourcePath

        const minimap = d.ID && d.MiniMapResourcePath

        // const exist = fs.existsSync(_path)
        // 去除 ID 为空的地图
        if (_path) {
            const __path = minimap || (_path && path.dirname(_path))

            /* if (exist) {
              
              
              fs.renameSync(__path, `${__path}minimap`)
            } */

            configPaths.push(`${__path}minimap\\config.ini`)

            configPaths = [...new Set(configPaths)]
        }

    })
    fs.writeFileSync(`${targetPath}\\config.txt`, configPaths.join('\n'))
    console.log(chalk.green(`在 ${targetPath} 目录生成 config.txt 成功 :)`))
}
