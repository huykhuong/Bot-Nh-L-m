const checker = require('../utils/nameChecker.js')
module.exports = {
  name: 'move',
  aliases: ['mv'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    const { channel } = message.member.voice

    let username = checker.checkName(message.member.user.username)

    if (!queue) return message.channel.send(`${client.emotes.error} | Am not singing any song :|`)

    if (!channel)
      return message.channel.send({
        embeds: [
          {
            description: `${username}, you need to join a room before moving the position of a song`,
            color: 'E91E63'
          }
        ]
      })

    if (!args[0] && !args[1])
      return message.channel.send({
        embeds: [
          {
            description: `${username}, you need to provide 2 values (one for the current position of the song, the other for the desired position)`,
            color: 'E91E63'
          }
        ]
      })

    if (!args[0] || !args[1])
      return message.channel.send({
        embeds: [
          {
            description: `${username}, you're missing position value`,
            color: 'E91E63'
          }
        ]
      })

    if (isNaN(args[0]) || isNaN(args[1]))
      return message.channel.send({
        embeds: [
          {
            description: `The provided values must be numbers`,
            color: 'E91E63'
          }
        ]
      })

    //3 dấu bằng là xét theo type luôn chứ ko tolerate giá trị
    if (args[0] == 0 || args[1] == 0) {
      return message.channel.send({
        embeds: [
          {
            description: `You're requesting to move a song that I'm singing, try to move other songs`,
            color: 'E91E63'
          }
        ]
      })
    }

    if (queue.songs.length === 1)
      return message.channel.send({
        embeds: [
          {
            description: `Can't use this command when the queue has 1 song`,
            color: 'E91E63'
          }
        ]
      })

    if (args[0] > queue.songs.length || args[1] > queue.songs.length)
      return message.channel.send({
        embeds: [
          {
            description: `You're requesting to move the position of a song that does not exist in the queue`,
            color: 'E91E63'
          }
        ]
      })

    if (!queue)
      return message.channel.send({
        embeds: [
          {
            description: `The queue is currently empty`,
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
          title: 'Moved song',
          description: `Moved song \`${name1}\` to position ${args[1]} in the queue`,
          color: 'E91E63'
        }
      ]
    })
  }
}
