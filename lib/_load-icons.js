'use strict'

const fs = require('fs')
const path = require('path')
const extend = require('xtend')
const glob = require('glob')
const octicons = require('octicons')
const runWaterfall = require('run-waterfall')
const runParallel = require('run-parallel')

const config = require('../package.json').config

const ICONS_EXT = '.svg'
const ICONS_DIR = path.join(__dirname, '..', config.build.iconsDir)
const ICONS_GLOB = path.join(ICONS_DIR, `*${ICONS_EXT}`)
const ICONS_BASE = Object.keys(octicons).reduce((result, name) => {
  const icon = octicons[name]

  if (icon.toSVG) {
    result[name] = icon.toSVG({class: 'w2 h2'})
  }

  return result
}, {})

module.exports = function loadIcons (done) {
  runWaterfall([
    (next) => glob(ICONS_GLOB, next),
    (files, next) => runParallel(
      files.map((f) => (done) => runWaterfall([
        (next) => fs.readFile(f, 'utf8', next),
        (svg, next) => next(null, {name: path.basename(f, ICONS_EXT), svg: svg})
      ], done)),
      next),
    (svgs, next) => next(null, extend(ICONS_BASE, svgs.reduce((result, icon) => {
      result[icon.name] = icon.svg
      return result
    }, {})))
  ], done)
}
