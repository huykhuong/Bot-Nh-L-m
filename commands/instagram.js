const axios = require('axios')

module.exports = {
  name: 'instagram',
  aliases: ['ins'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const name = args.join(' ')
    if (!name) {
      return message.channel.send('Cho tên instagram để tìm man')
    }
    let res
    const url = `https://www.instagram.com/${name}/?__a=1`
    try {
      res = await axios.get(url)
    } catch (e) {
      return console.log(e)
    }
    console.log(res)
    // const result = await res.json()
    // const account = result.graphql.user
    // console.log(account.full_name)
  }
}
