module.exports = {
  name: 'pause',
  aliases: ['pause', 'hold'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    if (queue.pause) {
      queue.resume()
      return message.channel.send('Resumed')
    }
    queue.pause()
    message.channel.send('Tạm dừng')
  }
}
