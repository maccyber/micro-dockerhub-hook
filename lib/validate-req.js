const { token } = require('../config')

module.exports = options => {
  const { pathname, payload, hooks } = options
  if (!pathname) {
    throw Error('No token given')
  } else if (pathname.replace('/', '') !== token) {
    throw Error('Invalid token')
  } else if (!payload) {
    throw Error('Missing payload')
  } else if (!payload.push_data) {
    throw Error('Missing payload.push_data')
  } else if (!payload.repository) {
    throw Error('Missing payload.repository')
  } else if (!payload.repository.repo_name) {
    throw Error('Missing payload.repository.repo_name')
  } else if (!hooks(payload.repository.repo_name, payload.push_data.tag)) {
    throw Error(`${payload.repository.repo_name} does not exist in scripts/index.js`)
  }
}
