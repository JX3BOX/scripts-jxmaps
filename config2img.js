const fs = require('fs')

function config2img() {
  fs.readFile('./config.txt', 'utf8', (err, data) => {
    const _data = data.split('\n')
    console.log(_data)
  })
}

config2img()