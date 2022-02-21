const { default: axios } = require('axios')

module.exports = {
  name: 'bot',
  aliases: ['b'],
  run: async (client, message, args) => {
    const res = await axios.get(
      `http://api.brainshop.ai/get?bid=163979&key=gQsYFGyg6onbcKEw&uid=1&msg=${encodeURIComponent(message.content)}`
    )
    message.channel.send(res.data.cnt)
  }
}
