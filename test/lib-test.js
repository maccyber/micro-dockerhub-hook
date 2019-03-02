process.env.DEBUG = 'false'
const test = require('ava')
const validateReq = require('../lib/validate-req')
const config = require('../config')
const hooks = require('../scripts')

test('no token given', t => {
  try {
    validateReq({})
  } catch (e) {
    t.is(e.message, 'No token given')
  }
})

test('invalid token', t => {
  try {
    const pathname = '/invalid'
    validateReq({ pathname })
  } catch (e) {
    t.is(e.message, 'Invalid token')
  }
})

test('missing payload', t => {
  try {
    const pathname = `/${config.token}`
    validateReq({ pathname })
  } catch (e) {
    t.is(e.message, 'Missing payload')
  }
})

test('Missing payload.push_data', t => {
  try {
    const pathname = `/${config.token}`
    const payload = {}
    validateReq({ pathname, payload })
  } catch (e) {
    t.is(e.message, 'Missing payload.push_data')
  }
})

test('missing payload.repository', t => {
  try {
    const pathname = `/${config.token}`
    const payload = {
      push_data: {}
    }
    validateReq({ pathname, payload })
  } catch (e) {
    t.is(e.message, 'Missing payload.repository')
  }
})

test('Missing payload.repository.repo_name', t => {
  try {
    const pathname = `/${config.token}`
    const payload = {
      push_data: {},
      repository: {
      }
    }
    validateReq({ pathname, payload })
  } catch (e) {
    t.is(e.message, 'Missing payload.repository.repo_name')
  }
})

test('Repo does not exist', t => {
  try {
    const pathname = `/${config.token}`
    const payload = {
      push_data: {
        tag: ''
      },
      repository: {
        repo_name: 'maccyber/notexist'
      }
    }
    validateReq({ pathname, payload, hooks })
  } catch (e) {
    t.is(e.message, 'maccyber/notexist does not exist in scripts/index.js')
  }
})
