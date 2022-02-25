const checker = require('../utils/nameChecker.js')
module.exports = {
  name: 'remove',
  aliases: ['rm, r'],
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
            description: `${username}, you need to join a voice channel to remove a song`,
            color: 'E91E63'
          }
        ]
      })

    if (!args[0])
      return message.channel.send({
        embeds: [
          {
            description: `${username}, you did not provide the position of the song`,
            color: 'E91E63'
          }
        ]
      })

    if (isNaN(args[0]))
      return message.channel.send({
        embeds: [
          {
            description: `Value must be of type number`,
            color: 'E91E63'
          }
        ]
      })

    //3 dấu bằng là xét theo type luôn chứ ko tolerate giá trị
    if (args[0] == 0) {
      return message.channel.send({
        embeds: [
          {
            description: `Am singing this song, have some respect man 😠`,
            color: 'E91E63'
          }
        ]
      })
    }

    if (queue.songs.length === 1)
      return message.channel.send({
        embeds: [
          {
            description: `Cannot use this command when there is one song in the queue`,
            color: 'E91E63'
          }
        ]
      })

    if (args[0] > queue.songs.length)
      return message.channel.send({
        embeds: [
          {
            description: `Cannot find that song in the queue`,
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

    let name = queue.songs[args[0]].name
    queue.songs.splice(args[0], 1)
    return message.channel.send({
      embeds: [
        {
          title: 'Song removed',
          description: `Removed \`${name}\` from the queue`,
          color: 'E91E63'
        }
      ]
    })
  }
}
