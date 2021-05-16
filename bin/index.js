#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const { program } = require('commander')
const actions = require('../packages/commands/actions')

let config = {}

if (fs.existsSync(path.resolve('jx3maps.config.js'))) {
  config = require(path.resolve('jx3maps.config.js'))
}

// 创建
program
  .version('1.0.0', '-v, --version')
  .command('init')
  .description('initialize your jx3maps config')

// 新建模块 vue or react
program
  .command('run [module]')
  .description('run a module')
  .action(actions)

program.parse(process.argv)
  
// console.log(process.argv)