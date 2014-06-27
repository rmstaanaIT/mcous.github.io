# gonna need fs to read the files and exec to do stuff
fs = require 'fs'
{exec} = require 'child_process'
# also use node static as a basic webserver
stat = require 'node-static'

# jade options
jadeDir = 'jade'
jadeOut = '.'
jadeOpts = "--out #{jadeOut}"

# stylus options
stylusDir = 'stylus'
stylusOut = '.'
stylusOpts = "--out #{stylusOut}"

# coffeescript options
coffeeDir = 'coffee'
coffeeOut = '.'
coffeeOpts = "--compile --map --output #{coffeeOut}"

# dev server
port = 8080

# build all
task 'build', 'build the html, javascript, and css', (options) ->
  invoke 'build:coffee'
  invoke 'build:jade'
  invoke 'build:stylus'

# build the js
task 'build:coffee', 'compile the coffeescript to javascript', (options) ->
  console.log "compiling coffeescript to javascript"
  exec "coffee #{coffeeOpts} #{coffeeDir}/*.coffee", (error, stdout, stderr) ->
    if error then throw error
    console.log "...done compiling coffee"
    console.log stdout + stderr

# build the html
task 'build:jade', 'compile jade index to html', (options) ->
  console.log "compiling jade to html"
  exec "jade #{jadeOpts} #{jadeDir}/*.jade", (error, stdout, stderr) ->
    if error then throw error
    console.log "...done compiling jade"
    console.log stdout + stderr

# build the stylesheet
task 'build:stylus', 'build the stylus files into css files', (options) ->
  console.log "compiling stylus to css"
  exec "stylus #{stylusOpts} #{stylusDir}/*.styl", (error, stdout, stderr) ->
    if error then throw error
    console.log "...done compiling stylus"
    console.log stdout + stderr

# watch task
task 'watch', 'watch files for changes and compile as necessary', (options) ->
  # do a build for safety
  invoke 'build'

  # watch coffeescript files
  fs.watch(coffeeDir, (event, filename) ->
    console.log "#{filename} was #{event}d; rebuilding #{filename[..-8]}.js"
    invoke 'build:coffee'
  )

  # watch jade files
  fs.watch(jadeDir, (event, filename) ->
    console.log "#{filename} was #{event}d; rebuilding #{filename[..-6]}.html"
    invoke 'build:jade'
  )

  # watch stylus files
  fs.watch(stylusDir, (event, filename) ->
    console.log "#{filename} was #{event}d; rebuilding #{filename[..-6]}.css"
    invoke 'build:stylus'
  )

# serve task
task 'serve', 'watch and serve the files to localhost:8080', (options) ->
  invoke 'watch'
  # start up a dev server
  devServer = new stat.Server '.'
  require('http').createServer( (request, response) ->
    request.addListener( 'end', ->
      devServer.serve(request, response, (error, result)->
        if error then console.log "error serving #{request.url}"
        else console.log "served #{request.url}"
      )
    ).resume()
  ).listen port
  console.log "server started at http://localhost:#{port}\n"
