const checker = require('../utils/nameChecker.js')
module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave'],
  inVoiceChannel: true,
  run: async (client, message) => {
    let username = checker.checkName(message.member.user.username)

    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | The queue is currently empty`)
    queue.stop()
    return message.channel.send({
      embeds: [
        {
          title: `Ok, guess you don't want to hear me singing anymore 😔`,
          color: 'E91E63'
        }
      ]
    })
  }
}
