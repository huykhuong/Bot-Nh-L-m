const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'queue',
  aliases: ['q'],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Am not singing any song!`)

    let embed = new MessageEmbed()
      .setColor(E91E63)
      .setTitle(`Song Queue`)

    let counter = 0;
    for (let i = 0; i < queue.songs.length; i += 20) {
      if (counter >= 10) break;
      let k = queue.songs;
      let songs = k.slice(i, i + 20);
      message.channel.send(embed.setDescription(songs.map((song, index) => `**${index + 1 + counter * 20}** [${song.name}](${song.url}) - ${song.formattedDuration}`)))
      counter++;
    }
    // const q = queue.songs
    //   .map((song, i) => `${i === 0 ? 'Singing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
    //   .join('\n')
    // message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`)
  }
}
