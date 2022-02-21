module.exports = {
  name: 'speak',
  aliases: ['sp'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const voiceChannel = message.member.voice.channel
    voiceChannel.join().then(connection => {
      connection.play(message.content)
    })
  }
}
