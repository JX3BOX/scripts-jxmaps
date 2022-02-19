const fs = require('fs')
const path = require('path')
const tga2png = require('tga2png')
const chalk = require('chalk')

require('dotenv').config()

const sourcePath = process.env.SOURCE
const targetPath = process.env.TARGET
const imagePath = process.env.IMAGE_TARGET

module.exports = function () {
	console.log('正在执行图片转换与命名')

	/**
	 * map 和 loading 图分开存放
	 */
	const map = `${imagePath}\\images\\map`
	const map_dds = `${imagePath}\\images\\map_dds`
	const loading = `${imagePath}\\images\\loading`
	const loading_dds = `${imagePath}\\images\\loading_dds`

	// 创建对应的 map 和 loading 文件夹
	if (!fs.existsSync(map)) {
		fs.mkdirSync(map, { recursive: true })
	}
	if (!fs.existsSync(map_dds)) {
		fs.mkdirSync(map_dds, { recursive: true })
	}
	if (!fs.existsSync(loading)) {
		fs.mkdirSync(loading, { recursive: true })
	}
	if (!fs.existsSync(loading_dds)) {
		fs.mkdirSync(loading_dds, { recursive: true })
	}

	const data = fs.readFileSync(`${targetPath}\\image.json`, 'utf-8')

	const _data = JSON.parse(data)

	// const imgData = [...new S_data.map(d.path)]

	const withoutFiles = []

	_data.forEach(_d => {

		const paths = path.resolve(sourcePath, _d.path)

		if (fs.existsSync) {
			const extname = path.extname(paths).toLocaleLowerCase()

			if (extname === '.dds') {

				if (_d.type.indexOf('loading') > -1) {
					// 文件不存在才copy
					if (!fs.existsSync(`${loading_dds}\\loading_${_d.MAPID}_0.dds`)) {
						fs.copyFileSync(paths, `${loading_dds}\\loading_${_d.MAPID}_0.dds`)
					}

				} else {
					const index = _d.type.slice(10, _d.type.length - 1)
					const name = `map_${_d.MAPID}_${index}`
					if (!fs.existsSync(`${map_dds}\\${name}.dds`)) {
						fs.copyFileSync(paths, `${map_dds}\\${name}.dds`)
					}
				}
			} else if (extname === '.tga') {

				if (_d.type.indexOf('loading') > -1) {
					if (!fs.existsSync(`${loading}\\loading_${_d.MAPID}_0.png`)) {
						tga2png(paths, `${loading}\\loading_${_d.MAPID}_0.png`)
					}
				} else {

					const index = _d.type.slice(10, _d.type.length - 1)
					const name = `map_${_d.MAPID}_${index}`

					if (!fs.existsSync(`${map}\\${name}.png`)) {
						tga2png(paths, `${map}\\${name}.png`)
					}

				}
			}
		} else {
			withoutFiles.push(_d.path)
		}
	})

	if (withoutFiles.length) {
		fs.writeFileSync(`${targetPath}\\缺图.txt`, withoutFiles.join('\n'), { encoding: 'utf-8' })
	}
	console.log(chalk.green(`图片转换中...`))
}