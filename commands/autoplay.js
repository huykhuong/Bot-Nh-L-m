const checker = require('../utils/nameChecker.js')

module.exports = {
  name: 'autoplay',
  inVoiceChannel: true,
  run: async (client, message) => {
    const { channel } = message.member.voice
    const queue = client.distube.getQueue(message)
    let username = checker.checkName(message.member.user.username)

    //Check to see if the member is not in a room before calling the command
    if (!channel)
      return message.channel.send({
        embeds: [
          {
            description: `${username}, you need to join a voice channel first before setting autoplay`,
            color: 'E91E63'
          }
        ]
      })

    //Check to see if the autoplay command is called when the song queue is empty
    if (!queue || !queue.playing)
      return message.channel.send({
        embeds: [
          {
            description: `Am not playing any song :|`,
            color: 'E91E63'
          }
        ]
      })

    //Check to see if the member and the bot is in the same room
    if (queue && channel.id !== message.guild.me.voice.channel.id)
      return message.channel.send({
        embeds: [
          {
            description: `Am busy singing at ${message.guild.me.voice.channel.name} room !`,
            color: 'E91E63'
          }
        ]
      })

    const autoplay = queue.toggleAutoplay()
    message.channel.send(
      `${client.emotes.success} | \`${
        autoplay ? `${username} turned on Autoplay` : `${username} turned off Autoplay`
      }\``
    )
  }
}
