process.env.DEBUG = 'false'
const test = require('ava')
const listen = require('test-listen')
const axios = require('axios')
const micro = require('micro')
const srv = require('../../index')
const config = require('../../config')

const getUrl = fn => {
  const srv = micro(fn)
  return listen(srv)
}

test('full test', async t => {
  const url = await getUrl(srv)
  const payload = require('./payload.json')
  const result = await axios.post(`${url}/${config.token}`, payload)
  t.is(result.status, 204)
})
