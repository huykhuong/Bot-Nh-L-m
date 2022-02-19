const scheduleArray = require('../lplSchedule.js')

module.exports = {
  name: 'lpl',
  aliases: ['lpl'],
  inVoiceChannel: true,
  run: async (client, message) => {
    let matches = []
    const today = new Date()
    scheduleArray.forEach(element => {
      if (element.date.getDate() === today.getDate()) {
        matches.push(`${element.team1} vs ${element.team2}\n`)
      }
    })
    message.channel.send({
      embeds: [
        {
          title: 'Lịch LPL ngày ' + today.getDate() + '/' + (today.getMonth() + 1),
          description: matches.length === 0 ? 'Nay không đánh trận nào hết' : matches.toString().replace(/,/g, ''),
          color: 'E91E63'
        }
      ]
    })
  }
}
