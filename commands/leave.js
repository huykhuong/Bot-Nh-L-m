module.exports = {
  name: 'leave',
  aliases: ['dc'],
  run: async (client, message) => {
    client.distube.voices.leave(message)
  }
}
