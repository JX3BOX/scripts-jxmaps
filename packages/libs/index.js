const maplist2json = require('./maplist2json.js')
const json2config = require('./json2config.js')
const checkexits = require('./checkexist.js')
const config2img = require('./config2img.js')
const renderimg = require('./renderimg')
const compare = require('./compare')
const resizeimage = require('./resizeimage')

require('dotenv').config()

module.exports = {
    maplist2json,
    json2config,
    checkexits,
    config2img,
    renderimg,
    compare,
    resizeimage
}