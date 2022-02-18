module.exports = {
  name: 'play',
  aliases: ['p'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const { channel } = message.member.voice
    const queue = client.distube.getQueue(message)

    let username
    if (message.member.user.username === 'StrawberryCookie') username = 'Huy'
    else if (message.member.user.username === 'Subek') username = 'Đăng'
    else if (message.member.user.username === 'Darren') username = 'Khang Darren'
    else if (message.member.user.username === 'Light') username = 'Tiến'
    else if (message.member.user.username === 'Azul') username = 'Hảo'
    else if (message.member.user.username === 'Simoke') username = 'Tuyên'
    else if (message.member.user.username === 'KSlay') username = 'K Lầy'
    else if (message.member.user.username === 'Junsil') username = 'Béo'
    else if (message.member.user.username === 'Người Chơi Kỹ Lăng') username = 'Tuấn'
    else if (message.member.user.username === 'khangdaboi') username = 'Khangdaboi'
    else if (message.member.user.username === 'Friendly Rock') username = 'Long Phạm'
    else if (message.member.user.username === 'l0ngle') username = 'Long Valorant'
    else if (message.member.user.username === 'iamhoudini') username = 'Hoàng'

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
