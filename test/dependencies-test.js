const test = require('ava')
const pkg = require('../package.json')
const dependencies = pkg.dependencies || {}
const devDependencies = pkg.devDependencies || {}
const dropModules = ['micro-dev', 'nsp']
const isDropped = module => !dropModules.includes(module)

test('ava works ok', t => {
  t.true(true)
})

Object.keys(dependencies).forEach(dependency => {
  test(`${dependency} loads ok`, t => {
    const module = require(dependency)
    t.truthy(module)
  })
})

Object.keys(devDependencies).filter(isDropped).forEach(dependency => {
  test(`${dependency} loads ok`, t => {
    const module = require(dependency)
    t.truthy(module)
  })
})
