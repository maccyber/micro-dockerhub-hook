process.env.DEBUG = 'false'
const test = require('ava')
const listen = require('test-listen')
const axios = require('axios')
const micro = require('micro')
const srv = require('../index')
const config = require('../config')

const getUrl = fn => {
  const srv = micro(fn)
  return listen(srv)
}

test('full test', async t => {
  const url = await getUrl(srv)
  const payload = require('./data/payload.json')
  const result = await axios.post(`${url}/${config.token}`, payload)
  t.is(result.status, 204)
})

test('wrong token', async t => {
  const url = await getUrl(srv)
  const payload = require('./data/payload.json')
  try {
    await axios.post(`${url}/wrongtoken`, payload)
  } catch (e) {
    t.is(e.message, 'Request failed with status code 400')
  }
})

test('wrong hook', async t => {
  const url = await getUrl(srv)
  const payload = require('./data/payload-wrong-hook.json')
  try {
    await axios.post(`${url}/${config.token}`, payload)
  } catch (e) {
    t.is(e.response.status, 400)
    t.is(e.message, 'Request failed with status code 400')
  }
})

test('fail script', async t => {
  const url = await getUrl(srv)
  const payload = require('./data/payload-with-error-hook.json')
  const result = await axios.post(`${url}/${config.token}`, payload)
  t.is(result.status, 204)
})

test('with tag', async t => {
  const url = await getUrl(srv)
  const payload = require('./data/payload-tag.json')
  const result = await axios.post(`${url}/${config.token}`, payload)
  t.is(result.status, 204)
})

test('regex test', async t => {
  const url = await getUrl(srv)
  const payload = require('./data/payload-version-tag.json')
  const result = await axios.post(`${url}/${config.token}`, payload)
  t.is(result.status, 204)
})
