module.exports = {
  name: 'skip',
  inVoiceChannel: true,
  run: async (client, message) => {
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

    if (!queue)
      return message.channel.send({
        embeds: [
          {
            description: `Chưa có bài nào trong queue hết :|`,
            color: 'E91E63'
          }
        ]
      })
    try {
      const song = await queue.skip()
      return message.channel.send({
        embeds: [{ title: `${username} skip bài này`, color: 'E91E63' }]
      })
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`)
    }
  }
}
