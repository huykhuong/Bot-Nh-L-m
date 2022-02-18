module.exports = {
  name: 'remove',
  aliases: ['rm'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    const { channel } = message.member.voice

    if (!queue) return message.channel.send(`${client.emotes.error} | Đang không hát bài nào hết :|`)

    if (!channel)
      return message.channel.send({
        embeds: [
          {
            description: `Vào phòng trước rồi gọi hẵn remove bài ${username}`,
            color: 'E91E63'
          }
        ]
      })

    if (!args[0])
      return message.channel.send({
        embeds: [
          {
            description: `Ông quên nhập thứ tự bài hát kìa ${username}`,
            color: 'E91E63'
          }
        ]
      })

    if (isNaN(args[0]))
      return message.channel.send({
        embeds: [
          {
            description: `Giá trị phải là số`,
            color: 'E91E63'
          }
        ]
      })

    //3 dấu bằng là xét theo type luôn chứ ko tolerate giá trị
    if (args[0] == 0) {
      console.log('yay')
      return message.channel.send({
        embeds: [
          {
            description: `Tui đang hát bài này giữa chừng nên không remove được, ông xài command skip đi`,
            color: 'E91E63'
          }
        ]
      })
    }

    if (queue.songs.length === 1)
      return message.channel.send({
        embeds: [
          {
            description: `Không xài command remove khi chỉ còn 1 bài trong queue, ông xài command stop đi`,
            color: 'E91E63'
          }
        ]
      })

    if (args[0] > queue.songs.length)
      return message.channel.send({
        embeds: [
          {
            description: `Không tìm thấy bài hát với thứ tự đó trong queue`,
            color: 'E91E63'
          }
        ]
      })

    if (!queue)
      return message.channel.send({
        embeds: [
          {
            description: `Trong queue chưa có bài nào hết`,
            color: 'E91E63'
          }
        ]
      })

    var name = queue.songs[args[0]].name
    queue.songs.splice(args[0], 1)
    return message.channel.send({
      embeds: [
        {
          title: 'Đã remove',
          description: `Đã remove bài ' + \`${name}\` + ' ra khỏi queue`,
          color: 'E91E63'
        }
      ]
    })
  }
}
