const pathJoin = require('path').join
const promisify = require('util').promisify
const exec = promisify(require('child_process').exec)

module.exports = async cmd => {
  const filePath = `${pathJoin(__dirname, '../scripts/')}${cmd}`
  try {
    const { stderr, stdout } = await exec(filePath)
    return stderr || stdout
  } catch (e) {
    throw e.message
  }
}
