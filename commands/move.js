const checker = require('../utils/nameChecker.js')
module.exports = {
  name: 'move',
  aliases: ['mv'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    const { channel } = message.member.voice

    let username = checker.checkName(message.member.user.username)

    if (!queue) return message.channel.send(`${client.emotes.error} | Đang không hát bài nào hết :|`)

    if (!channel)
      return message.channel.send({
        embeds: [
          {
            description: `Vào phòng trước rồi gọi hẵn move bài hát ${username}`,
            color: 'E91E63'
          }
        ]
      })

    if (!args[0] && !args[1])
      return message.channel.send({
        embeds: [
          {
            description: `Ông nhập hai thứ tự của hai bài hát vô nha ${username}`,
            color: 'E91E63'
          }
        ]
      })

    if (!args[0] || !args[1])
      return message.channel.send({
        embeds: [
          {
            description: `Ông nhập thiếu thứ tự bài hát kìa ${username}`,
            color: 'E91E63'
          }
        ]
      })

    if (isNaN(args[0]) || isNaN(args[1]))
      return message.channel.send({
        embeds: [
          {
            description: `Giá trị phải là số`,
            color: 'E91E63'
          }
        ]
      })

    //3 dấu bằng là xét theo type luôn chứ ko tolerate giá trị
    if (args[0] == 0 || args[1] == 0) {
      return message.channel.send({
        embeds: [
          {
            description: `Trong lệnh có bài tui đang hát, ông move mấy bài khác đỡ nha`,
            color: 'E91E63'
          }
        ]
      })
    }

    if (queue.songs.length === 1)
      return message.channel.send({
        embeds: [
          {
            description: `Không xài command move khi chỉ còn 1 bài trong queue`,
            color: 'E91E63'
          }
        ]
      })

    if (args[0] > queue.songs.length || args[1] > queue.songs.length)
      return message.channel.send({
        embeds: [
          {
            description: `Trong command có move một bài không có thứ tự hợp lệ trong queue`,
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

    let name1 = queue.songs[args[0]].name

    Array.prototype.moveSong = function (itemIndex, targetIndex) {
      let itemRemoved = this.splice(itemIndex, 1) // splice() returns the remove element as an array
      this.splice(targetIndex, 0, itemRemoved[0]) // Insert itemRemoved into the target index
      return this
    }

    queue.songs = queue.songs.moveSong(args[0], args[1])

    return message.channel.send({
      embeds: [
        {
          title: 'Đã move thứ tự bài hát',
          description: `Đã move bài \`${name1}\` lên vị trí số ${args[1]}`,
          color: 'E91E63'
        }
      ]
    })
  }
}
