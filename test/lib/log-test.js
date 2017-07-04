const test = require('ava')

test('logger test false', t => {
  process.env.DEBUG = 'false'
  const logger = require('../../lib/log')
  logger('info', 'test')
  t.pass()
})

test('logger test true', t => {
  process.env.DEBUG = true
  const logger = require('../../lib/log')
  logger('info', 'test')
  t.pass()
})

test('logger test obj', t => {
  process.env.DEBUG = true
  const logger = require('../../lib/log')
  const obj = { something: true }
  logger('info', obj)
  t.pass()
})
