const { maplist2json,
  json2config,
  checkexits,
  config2img,
  renderimg,
  compare
 } = require('../libs')
 

 const action = process.argv[3]

module.exports = function() {
  switch(action) {
    case '1':
    default:
      maplist2json()
      break
    case '2':
      json2config()
      break
    case '3':
      config2img()
      break
    case '4':
      checkexits()
      break
    case '5':
      renderimg()
      break
    case '0':
      compare()
      break
  }
}
