const fs = require('fs')
const path = require('path')

function dir2minimap() {
  const data = fs.readFileSync('./map.json', 'utf-8');

  const _data = JSON.parse(data)
  const configPaths = []
  _data.forEach(d => {
    const _path = d.ResourcePath || ''

    const exist = fs.existsSync(_path)

    if (exist) {
      const __path = path.dirname(_path)
      
      configPaths.push(`${__path}minimap\\config.ini`)

      fs.renameSync(__path, `${__path}minimap`)
    }

  })
  // console.log(configPaths)
  fs.writeFileSync('config.txt', configPaths.join('\n'))
}

dir2minimap()