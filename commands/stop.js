const checker = require('../utils/nameChecker.js')
module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave'],
  inVoiceChannel: true,
  run: async (client, message) => {
    let username = checker.checkName(message.member.user.username)

    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Không có bài nào trong queue hết :||`)
    queue.stop()
    return message.channel.send({
      embeds: [
        {
          title: `${username} kêu đừng hát nữa :(`,
          color: 'E91E63'
        }
      ]
    })
  }
}
