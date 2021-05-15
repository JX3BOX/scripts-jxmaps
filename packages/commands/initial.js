const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const figlet = require('figlet')

const { maplist2json,
  json2config,
  checkexits,
  config2img } = require('../libs/index')

const CURRENT_DIR = process.cwd()

const complete = () => {
  figlet('Kaa CLI', function(err, data) {
    if (err) {
      console.log(chalk.red(' Something about figlet has error!'))
    }

    console.log(chalk.yellow(data))
    console.log(chalk.green(` [success] Project ${projectName} init finished.`))
    console.log()
    console.log(' Install dependencies')
    console.log(chalk.magenta(` cd ${projectName} && yarn`))
    console.log()
    console.log(' Run the app')
    console.log(chalk.magenta(' yarn dev'))
  })
}

module.exports = function() {
  inquirer.prompt(QUESTIONS)
    .then(answer => {
      projectName = answer['project-name']
      let templateDir = getTemplateDir(answer['project-type'])
      const templatePath = path.join(__dirname, '../../', templateDir)

      fs.mkdirSync(`${CURRENT_DIR}/${projectName}`)

      setTimeout(() => complete(), 1000)

      createDirectoryContents(templatePath, projectName)
    })
}