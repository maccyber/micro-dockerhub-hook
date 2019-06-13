const scripts = {
  'maccyber/testhook': 'hello.sh parameter1 parameter2',
  'maccyber/maccyber.io': 'maccyber.io.sh',
  'maccyber/tagtest:prod': 'tag.sh', // repo/image:tag
  'maccyber/fail': 'fail.sh',
  'anshkathuria/tagtest:release-[0-9.]+': 'tag.sh'
}

module.exports = (repoName, tag) => {
  const hook = Object.keys(scripts)
    .find(key => {
      const regex = new RegExp(`^${key}$`, 'gm')
      const image = tag ? `${repoName}:${tag}` : repoName
      const match = image.match(regex)

      return match && match[0] === image
    })

  return scripts[hook]
}
