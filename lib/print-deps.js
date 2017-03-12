'use strict'

const githubUrl = require('github-url-from-git')

const pkg = require('../package.json')
const dependencies = pkg.dependencies || {}
const devDependencies = pkg.devDependencies || {}

const argv = process.argv.slice(2)
const headingLevel = Number(argv[0] || 2)

console.log(makeHeading('dependencies'))
printDepsFromObject(dependencies)
console.log(makeHeading('dev dependencies'))
printDepsFromObject(devDependencies)

function printDepsFromObject (obj) {
  Object.keys(obj).map(getDepPkg).forEach(printDep)
  console.log()
}

function getDepPkg (name) {
  return require(`${name}/package.json`)
}

function getDepUrl (pkg) {
  return (
    pkg.repository &&
    pkg.repository.url &&
    githubUrl(pkg.repository.url)) || `https://npmjs.org/package/${pkg.name}`
}

function getDepDescription (depPkg) {
  return (depPkg.description || '').trim()
}

function printDep (pkg) {
  console.log(`- [${pkg.name}](${getDepUrl(pkg)}): ${getDepDescription(pkg)}`)
}

function makeHeading (text) {
  return `${'#'.repeat(headingLevel)} ${text}\n`
}
