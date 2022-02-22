const { MessageEmbed } = require('discord.js')
const superagent = require('superagent')

module.exports = {
  name: 'google',
  aliases: ['gl'],
  run: async (client, message, args) => {
    let query = args.join(' ')
    if (!query) return message.channel.send('Tell me what you want to search for')
    const res = await superagent
      .get('https://customsearch.googleapis.com/customsearch/v1')
      .query({ q: query, cx: '62e70fe849e84e8f4', key: 'AIzaSyD12EjI5v4pHZZXf49VI2e1jE2kdDSYVD8' })

    if (!res.body.items) return message.channel.send('No result')
    if (res.status >= 400) return message.channel.send('Error').then(console.log(res.message))

    let result = res.body.items[0]

    const embed = new MessageEmbed()
      .setColor(0xe91e63)
      .setTitle(result.title)
      .setDescription(result.snippet)
      .setURL(result.link)
      .setImage(
        !result.pagemap.cse_image || !result.pagemap.cse_thumbnail
          ? null
          : result.pagemap.cse_image[0].src || result.pagemap.cse_thumbnail[0].src
      )
    return message.channel.send({ embeds: [embed] })
  }
}

// {
//     embeds: [
//       {
//         title: result.title,
//         description: result.snippet,
//         url: result.url,
//         image: result.pagemap.cse_image[0].src || result.pagemap.cse_thumbnail[0].src,
//         color: 'E91E63'
//       }
//     ]
//   }
