'use strict'

const assert = require('assert')
const path = require('path')

const argv = process.argv.slice(2)
const valid = argv.length >= 2 && argv.length <= 3
const CWD = process.cwd()
const COMMAND = path.relative(CWD, process.argv[1])

assert(valid, `Usage: node ${COMMAND} <pug_source> <css_source>`)

const pugSource = path.resolve(CWD, argv[0])
const cssSource = path.resolve(CWD, argv[1])

module.exports = {
  pugSource: pugSource,
  cssSource: cssSource
}
