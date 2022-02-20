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
    if (!string) return message.channel.send(`You did not provide the name of the song`)

    //Check to see if the member is not in a room before calling the command
    if (!channel)
      return message.channel.send({
        embeds: [
          {
            description: `${username}, you need to join a voice channel before playing a song`,
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

    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    })
  }
}
