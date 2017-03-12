'use strict'

const fs = require('fs')
const path = require('path')
const url = require('url')
const express = require('express')
const bodyParser = require('body-parser')
const tinyLr = require('tiny-lr')
const injectLr = require('inject-lr-script')

const build = require('./build')
const config = require('../package.json').config

const HOST = config.server.host
const PORT = config.server.port
const BASE_PATH = config.basePath
const STATIC_DIR = path.join(__dirname, '../', config.server.staticDir)

const URI = url.format({
  protocol: 'http:',
  hostname: HOST,
  port: PORT,
  pathname: BASE_PATH
})

module.exports = createServer

if (require.main === module) {
  const argv = require('./_argv')
  const pugSource = argv.pugSource
  const cssSource = argv.cssSource
  const app = createServer(pugSource, cssSource)

  app
    .listen({host: HOST, port: PORT}, () => console.log(`Serving at ${URI}`))
    .once('error', (error) => console.error(error))

  fs.watch(argv.pugSource, handleChange)
  fs.watch(argv.cssSource, handleChange)
}

function createServer (pugSource, cssSource) {
  const cssRelPath = path.join(BASE_PATH, path.basename(cssSource))
  const app = express()

  return app
    .use(injectLr({port: PORT}))
    .get(BASE_PATH, (req, res) => get('html', req, res))
    .get(cssRelPath, (req, res) => get('css', req, res))
    .use(bodyParser.json())
    .use(tinyLr.middleware({app: app}))
    .use(logStaticRequest)
    .use(BASE_PATH, express.static(STATIC_DIR))

  function get (type, req, res) {
    build(pugSource, cssSource, (error, assets) => {
      if (error) {
        console.error('error building')
        console.error(error)
        return res.status(500).send(error)
      }

      if (!assets[type]) {
        console.error(`asset type not found`)
        console.log(Object.keys(assets))
        return res.status(500).send('asset missing')
      }

      console.log(`built ${type} for ${req.method} ${req.url}`)
      res.type(type).send(assets[type])
    })
  }
}

function handleChange (change, path) {
  console.log(`${path} ${change}d`)
  tinyLr.changed(path)
}

function logStaticRequest (req, res, next) {
  console.log(`static: ${req.method} ${req.url}`)
  next()
}
