const { MessageEmbed } = require('discord.js')

module.exports.sendAnonymously = (client, message, picExt, videoExt) => {
  if (message.author.bot) return
  if (message.content.length > 1024) return message.channel.send('Confession only allows 1024 word count')
  else {
    message.channel.send('Confession sent')
    const cfsChannel = client.channels.cache.get('409690970142015489')
    // const embed = new MessageEmbed().setDescription()
    // if (message.attachments.array().length > 0) {
    //   let attachment = message.attachments.array()[0]
    //   picExt.forEach(ext => {
    //     if (attachment.name.endsWith(ext)) embed.setImage(attachment.attachment)
    //   })
    //   videoExt.forEach(ext => {
    //     if (attachment.name.endsWith(ext)) cfsChannel.send(attachment)
    //   })
    // }
    cfsChannel.send({
      embeds: [
        {
          title: 'A message has been dropped',
          description: `${message.content}\n\n From an anonymous sender`,
          color: 'E91E63'
        }
      ]
    })
  }
}
