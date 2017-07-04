const test = require('ava')
const runScript = require('../../lib/run-script')

test('run-script fail.sh', async t => {
  try {
    await runScript('fail.sh')
  } catch (e) {
    t.true(e.includes('Command failed'))
  }
})

test('run-script hello.sh', async t => {
  const res = await runScript('hello.sh')
  t.true(res.includes('Running dummy script'))
})

test('run-script hello.sh parameters', async t => {
  const res = await runScript('hello.sh parameter1 parameter2')
  t.true(res.includes('parameter1\nparameter2'))
})

test('run-script fail', async t => {
  try {
    await runScript('notexist.sh')
  } catch (e) {
    t.true(e.includes('No such file or directory'))
  }
})
