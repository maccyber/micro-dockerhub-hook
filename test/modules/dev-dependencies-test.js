const test = require('ava')
const pkg = require('../../package.json')
const dependencies = pkg.devDependencies || {}
const dropModules = ['micro-dev']
const isDropped = (module) => !dropModules.includes(module)

Object.keys(dependencies).filter(isDropped).forEach((dependency) => {
  test(`${dependency} loads ok`, t => {
    const module = require(dependency)
    t.truthy(module)
  })
})
