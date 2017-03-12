'use strict'

const assert = require('assert')
const fs = require('fs')
const path = require('path')
const pug = require('pug')
const runParallel = require('run-parallel')
const runWaterfall = require('run-waterfall')
const postcss = require('postcss')
const cssNano = require('cssnano')
const cssMqPacker = require('css-mqpacker')
const cssAutoPrefixer = require('autoprefixer')
const cssImport = require('postcss-import')
const cssCustomMedia = require('postcss-custom-media')
const cssVariables = require('postcss-css-variables')
const cssConditionals = require('postcss-conditionals')
const cssDiscardComments = require('postcss-discard-comments')
const purifyCss = require('purify-css')

const pkg = require('../package.json')
const loadIcons = require('./_load-icons')

const config = pkg.config
const BASE_PATH = config.basePath
const OUTPUT_DIR = config.build.outputDir
const PURIFY_OPTIONS = {minify: true, info: true}

let cssProcessor

module.exports = build

if (require.main === module) {
  const argv = require('./_argv')
  const pugSource = argv.pugSource
  const cssSource = argv.cssSource
  const htmlOut = getOutputFile(pugSource, 'html')
  const cssOut = getOutputFile(cssSource, 'css')

  runWaterfall([
    (next) => build(pugSource, cssSource, next),
    (assets, next) => runParallel([
      (done) => fs.writeFile(htmlOut, assets.html, done),
      (done) => fs.writeFile(cssOut, assets.css, done)
    ], next)
  ], (error) => {
    assert.ifError(error)
    console.log(`built ${pugSource} to ${htmlOut}`)
    console.log(`built ${cssSource} to ${cssOut}`)
  })
}

function build (pugSource, cssSource, done) {
  const cssRelPath = path.join(BASE_PATH, path.basename(cssSource))

  runWaterfall([
    (next) => buildHtml(pugSource, cssRelPath, next),
    (html, next) => runWaterfall([
      (next) => buildCss(cssSource, html, next),
      (css, next) => next(null, {html: html, css: css})
    ], next)
  ], done)
}

function buildHtml (pugSource, cssPath, done) {
  runWaterfall([
    (next) => fs.readFile(pugSource, 'utf8', next),
    (template, next) => runWaterfall([
      (next) => loadIcons(next),
      (icons, next) => pug.render(template, {
        inlineRuntimeFunctions: false,
        filename: pugSource,
        title: pkg.title,
        description: pkg.description,
        author: pkg.author,
        css: cssPath,
        icons: icons
      }, next)
    ], next)
  ], done)
}

function buildCss (cssSource, htmlContent, done) {
  runWaterfall([
    (next) => fs.readFile(cssSource, 'utf8', next),
    (css, next) => getCssProcessor()
      .process(css, {from: cssSource, to: cssSource})
      .then((result) => next(null, result.css))
      .catch((error) => next(error)),
    (css, next) => next(null, purifyCss(htmlContent, css, PURIFY_OPTIONS))
  ], done)
}

function getCssProcessor () {
  if (!cssProcessor) {
    cssProcessor = postcss([
      cssImport(),
      cssVariables(),
      cssConditionals(),
      cssCustomMedia(),
      cssMqPacker(),
      cssAutoPrefixer(),
      cssNano(),
      cssDiscardComments()
    ])
  }

  return cssProcessor
}

function getOutputFile (sourceFile, extension) {
  const oldExtension = path.extname(sourceFile)
  const basename = path.basename(sourceFile, oldExtension)

  return path.join(OUTPUT_DIR, `${basename}.${extension}`)
}
