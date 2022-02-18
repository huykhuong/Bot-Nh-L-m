module.exports = {
  name: 'autoplay',
  inVoiceChannel: true,
  run: async (client, message) => {
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

    //Check to see if the member is not in a room before calling the command
    if (!channel)
      return message.channel.send({
        embeds: [
          {
            description: `Vào phòng trước rồi gọi hẵn autoplay ${username}`,
            color: 'E91E63'
          }
        ]
      })

    //Check to see if the autoplay command is called when the song queue is empty
    if (!queue || !queue.playing)
      return message.channel.send({
        embeds: [
          {
            description: `Không có đang chơi bài nào hết man`,
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

    const autoplay = queue.toggleAutoplay()
    message.channel.send(
      `${client.emotes.success} | \`${autoplay ? `${username} bật Autoplay` : `${username} tắt Autoplay`}\``
    )
  }
}
