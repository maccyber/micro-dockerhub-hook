const { json, send } = require('micro')
const { parse } = require('url')
const logger = require('./lib/log')
const validateReq = require('./lib/validate-req')
const runScript = require('./lib/run-script')

module.exports = async (req, res) => {
  const hooks = require('./scripts')
  const { pathname } = await parse(req.url, false) // gets url path
  const payload = await json(req) // gets payload

  logger('debug', `Requesting ${pathname}`)

  try {
    validateReq({pathname, payload, hooks}) // validates token and payload
  } catch (e) {
    logger('err', e.message)
    send(res, 400, e.message)
    return
  }
  // everything is on it's right place...
  send(res, 204) // sends 'no content' to client

  logger('debug', 'Payload from docker hub:')
  logger('debug', payload)
  logger('debug', `Running hook on repo: ${payload.repository.repo_name}`)

  const hook = hooks[`${payload.repository.repo_name}:${payload.push_data.tag}`] || hooks[payload.repository.repo_name] // looks for tag first
  try {
    const result = await runScript(hook) // runs script
    logger('debug', result)
  } catch (e) {
    logger('err', e)
  }
}
