module.exports = {
  name: 'queue',
  aliases: ['q'],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Đang không hát bài nào!`)
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Đang hát:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    console.log(queue.songs)
    message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`)
  }
}
