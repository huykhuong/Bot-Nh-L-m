module.exports = {
  name: 'clear',
  aliases: ['cl'],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    const { channel } = message.member.voice

    if (!queue) return message.channel.send(`${client.emotes.error} | Am not singing any song :|`)

    if (!channel)
      return message.channel.send({
        embeds: [
          {
            description: `you need to join a room before clearing the queue`,
            color: 'E91E63'
          }
        ]
      })

    if (queue.songs.length === 1)
      return message.channel.send({
        embeds: [
          {
            description: `Can't use this command when the queue has 1 song`,
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

    Array.prototype.clearQueue = function () {
      this.splice(1, this.length - 1)
      return this
    }

    queue.songs = queue.songs.clearQueue()

    return message.channel.send({
      embeds: [
        {
          title: 'Queue cleared',
          description: `The queue has been cleared`,
          color: 'E91E63'
        }
      ]
    })
  }
}
