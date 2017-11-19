const { join: joinPath } = require('path')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

module.exports = async (cmd, payload = { push_data: {}, repository: {} }) => {
  const filePath = `${joinPath(__dirname, '../scripts/')}${cmd}`
  const env = {
    TAG: payload.push_data.tag,
    REPO_NAME: payload.repository.repo_name
  }
  try {
    const { stderr, stdout } = await exec(filePath, { env })
    return stderr || stdout
  } catch (e) {
    throw e.message
  }
}
