const checker = require('../utils/nameChecker.js')
module.exports = {
  name: 'skip',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    let username = checker.checkName(message.member.user.username)

    if (!queue)
      return message.channel.send({
        embeds: [
          {
            description: `The queue is currently empty :|`,
            color: 'E91E63'
          }
        ]
      })
    try {
      const song = await queue.skip()
      return message.channel.send({
        embeds: [{ title: `${username} skips this song`, color: 'E91E63' }]
      })
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`)
    }
  }
}
