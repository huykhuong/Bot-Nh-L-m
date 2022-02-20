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
        if (element.team1 === 'WEIBO GAMING') {
          matches.push(`\`${element.team1}\` vs ${element.team2}\n`)
          return
        } else if (element.team2 === 'WEIBO GAMING') {
          matches.push(`${element.team1} vs \`${element.team2}\`\n`)
          return
        }
        matches.push(`${element.team1} vs ${element.team2}\n`)
      }
    })
    message.channel.send({
      embeds: [
        {
          title: 'LPL schedule for ' + today.getDate() + '/' + (today.getMonth() + 1),
          description: matches.length === 0 ? 'No match found' : matches.toString().replace(/,/g, ''),
          color: 'E91E63'
        }
      ]
    })
  }
}
