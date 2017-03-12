# mike.cousins.io

[![Build Status][travis-shield]][travis]
[![devDependency status][david-dev-shield]][david-dev]

> Mike Cousins' home on the internet

<http://mike.cousins.io>

Minimal placeholder page while I work on my full portfolio site. My circa-2014 page just wasn't cutting it anymore...

## deploy

Cut a new version and push to GitHub to tell the CI server to build and deploy HTML and CSS to GitHub pages:

1. `$ npm version <level> -m <reason>`
2. `$ git push --follow-tags`

## develop

- `$ npm install` - Install dev dependencies
- `$ npm start` - Start a live-reloading dev server at <http://localhost:8080/>
- `$ npm run build` - Build HTML and CSS to `public`

### dependencies

- [normalize.css](https://github.com/necolas/normalize.css): A modern alternative to CSS resets
- [octicons](https://github.com/primer/octicons): A scalable set of icons handcrafted with <3 by GitHub.
- [tachyons-border-radius](https://github.com/tachyons-css/tachyons-border-radius): Border radius CSS module for Tachyons
- [tachyons-border-widths](https://github.com/tachyons-css/tachyons-border-widths): Border width CSS module for Tachyons
- [tachyons-borders](https://github.com/tachyons-css/tachyons-borders): Performance-first css module for styling borders.
- [tachyons-box-sizing](https://github.com/tachyons-css/tachyons-box-sizing): Css module for a smarter default box-model.
- [tachyons-display](https://github.com/tachyons-css/tachyons-display): Performance based css module.
- [tachyons-font-weight](https://github.com/tachyons-css/tachyons-font-weight): Performance based css module.
- [tachyons-heights](https://github.com/tachyons-css/tachyons-heights): Performance based css module.
- [tachyons-hovers](https://github.com/tachyons-css/tachyons-hovers): Performance based css module.
- [tachyons-images](https://github.com/tachyons-css/tachyons-images): Performance based css module.
- [tachyons-line-height](https://github.com/tachyons-css/tachyons-line-height): Performance based css module.
- [tachyons-skins](https://github.com/tachyons-css/tachyons-skins): Performance based css module.
- [tachyons-spacing](https://github.com/tachyons-css/tachyons-spacing): Performance based css module.
- [tachyons-text-align](https://github.com/tachyons-css/tachyons-text-align): Performance based css module.
- [tachyons-type-scale](https://github.com/tachyons-css/tachyons-type-scale): Performance based css module.
- [tachyons-utilities](https://github.com/tachyons-css/tachyons-utilities): Performance based css module.
- [tachyons-widths](https://github.com/tachyons-css/tachyons-widths): Performance based css module.

### dev dependencies

- [autoprefixer](https://github.com/postcss/autoprefixer): Parse CSS and add vendor prefixes to CSS rules using values from the Can I Use website
- [body-parser](https://github.com/expressjs/body-parser): Node.js body parsing middleware
- [css-mqpacker](https://github.com/hail2u/node-css-mqpacker): Pack same CSS media query rules into one media query rule.
- [cssnano](https://github.com/ben-eb/cssnano): A modular minifier, built on top of the PostCSS ecosystem.
- [express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework
- [gh-pages](https://github.com/tschaub/gh-pages): Publish to a gh-pages branch on GitHub (or any other branch on any other remote)
- [github-url-from-git](https://github.com/visionmedia/node-github-url-from-git): Parse a github git url and return the github repo url
- [glob](https://github.com/isaacs/node-glob): a little globber
- [inject-lr-script](https://github.com/mattdesl/inject-lr-script): inject live reload into HTML content
- [nodemon](https://github.com/remy/nodemon): Simple monitor script for use during development of a node.js app.
- [postcss](https://github.com/postcss/postcss): Tool for transforming styles with JS plugins
- [postcss-conditionals](https://github.com/andyjansson/postcss-conditionals): PostCSS plugin that enables @if statements in your CSS
- [postcss-css-variables](https://github.com/MadLittleMods/postcss-css-variables): PostCSS plugin to transform CSS Custom Properties(CSS variables) syntax into a static representation
- [postcss-custom-media](https://github.com/postcss/postcss-custom-media): PostCSS plugin to transform W3C CSS Custom Media Queries to more compatible CSS
- [postcss-discard-comments](https://github.com/ben-eb/postcss-discard-comments): Discard comments in your CSS files with PostCSS.
- [postcss-import](https://github.com/postcss/postcss-import): PostCSS plugin to import CSS files
- [pug](https://github.com/pugjs/pug): A clean, whitespace-sensitive template language for writing HTML
- [purify-css](https://github.com/purifycss/purifycss): Removed unused css. Compatible with single-page apps.
- [run-parallel](https://github.com/feross/run-parallel): Run an array of functions in parallel
- [run-waterfall](https://github.com/feross/run-waterfall): Run an array of functions in series, each passing its results to the next function (waterfall)
- [standard](https://github.com/feross/standard): JavaScript Standard Style
- [tiny-lr](https://github.com/mklabs/tiny-lr): Tiny LiveReload server, background-friendly
- [xtend](https://github.com/Raynos/xtend): extend like a boss

[travis]: https://travis-ci.org/mcous/mcous.github.io
[david-dev]: https://david-dm.org/mcous/mcous.github.io/master?type=dev
[travis-shield]: https://img.shields.io/travis/mcous/mcous.github.io/master.svg?style=flat-square&maxAge=3600	
[david-dev-shield]: https://img.shields.io/david/dev/mcous/mcous.github.io/master.svg?style=flat-square&maxAge=3600	
