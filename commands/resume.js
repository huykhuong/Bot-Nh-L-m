module.exports = {
  name: 'resume',
  aliases: ['resume', 'unpause'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Đang không hát bài nào hết!`)
    queue.resume()
    message.channel.send('Đã resume :)')
  }
}
