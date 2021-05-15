const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports = function() {
  console.log('正在执行 map.json -> map.txt')
  const data = fs.readFileSync('./map.json', 'utf-8');

  const _data = JSON.parse(data)
  let configPaths = []
  _data.forEach(d => {
    const _path = d.ID && d.ResourcePath

    // const exist = fs.existsSync(_path)
    // 去除 ID 为空的地图
    if (_path) {
      const __path = _path && path.dirname(_path)
  
      /* if (exist) {
        
        
        fs.renameSync(__path, `${__path}minimap`)
      } */
      
      configPaths.push(`${__path}minimap\\config.ini`)
  
      configPaths = [...new Set(configPaths)]
    }
    
  })
  fs.writeFileSync('config.txt', configPaths.join('\n'))
  console.log(chalk.green(`在 ${process.cwd()} 目录生成 map.txt 成功 :)`))
}
