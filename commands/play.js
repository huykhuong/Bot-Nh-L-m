const checker = require('../utils/nameChecker.js')

module.exports = {
  name: 'play',
  aliases: ['p'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const { channel } = message.member.voice
    const queue = client.distube.getQueue(message)

    let username = checker.checkName(message.member.user.username)

    const string = args.join(' ')
    if (!string) return message.channel.send(`Ông quên nhập tên bài hát kìa`)

    //Check to see if the member is not in a room before calling the command
    if (!channel)
      return message.channel.send({
        embeds: [
          {
            description: `Vào phòng trước rồi hẵn mở nhạc ${username}`,
            color: 'E91E63'
          }
        ]
      })

    //Check to see if the member and the bot is in the same room
    if (queue && channel.id !== message.guild.me.voice.channel.id)
      return message.channel.send({
        embeds: [
          {
            description: `Đang bận hát bên phòng ${message.guild.me.voice.channel.name} rồi man`,
            color: 'E91E63'
          }
        ]
      })

    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    })
  }
}
