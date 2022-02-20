const { DisTube } = require('distube')
require('dotenv').config()
const Discord = require('discord.js')
const { addSpeechEvent } = require('discord-speech-recognition')

const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_PRESENCES
  ]
})

addSpeechEvent(client)

const fs = require('fs')
const config = require('./config.json')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

//Global variable
let username

client.config = require('./config.json')
client.distube = new DisTube(client, {
  leaveOnFinish: false,
  leaveOnEmpty: true,
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ],
  youtubeDL: false
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Could not find any commands!')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Could not find any commands!')
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})

client.on('ready', () => {
  console.log(`${client.user.tag} is ready to play music.`)
  client.user.setActivity(`music for the homies`, { type: 'PLAYING' })
})

client.on('speech', async message => {
  let channel = client.channels.cache.get('943670868872142898')
  const command = message.content?.toLowerCase()
  if (command.includes('hey dj play')) {
    let splitted = message.content.split('play') || message.content.split('Play')
    let second = splitted[1]
    channel.send('<p ' + second)
  }
  if (command.includes('hey dj skip')) {
    channel.send('<skip')
  }
  console.log(message.content)
  return
})

client.on('messageCreate', async message => {
  if (message.member.user.username === 'StrawberryCookie') username = 'Huy Bánh'
  else if (message.member.user.username === 'Subek') username = 'Đăng'
  else if (message.member.user.username === 'Darren') username = 'Khang Darren'
  else if (message.member.user.username === 'Light') username = 'Tiến'
  else if (message.member.user.username === 'Azul') username = 'Hảo'
  else if (message.member.user.username === 'Simoke') username = 'Tuyên'
  else if (message.member.user.username === 'KSlay') username = 'K Lầy'
  else if (message.member.user.username === 'Junsil') username = 'Béo'
  else if (message.member.user.username === 'Người Chơi Kỹ Lăng') username = 'Tuấn'
  else if (message.member.user.username === 'khangdaboi') username = 'Khangdaboi'
  else if (message.member.user.username === 'Friendly Rock') username = 'Long Phạm'
  else if (message.member.user.username === 'l0ngle') username = 'Long Valorant'
  else if (message.member.user.username === 'iamhoudini') username = 'Hoàng'

  if (!message.guild) return
  const prefix = config.prefix
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return

  try {
    cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
  }
})

//Check to see if Tiến is online
// client.on('presenceUpdate', (oldPresence, newPresence) => {
//   let member = newPresence.member
//   // User id of the user you're tracking status.
//   if (member.id === '406079794296651777') {
//     if (oldPresence.status !== newPresence.status) {
//       // Your specific channel to send a message in.
//       let channel = member.guild.channels.cache.get('409690970142015489')
//       // You can also use member.guild.channels.resolve('<channelId>');

//       let text = ''

//       if (newPresence.status === 'online') {
//         text = 'Tiến onl rồi anh em vô chơi game <@251341269656272897> <@251340811743133696>'
//       } else if (newPresence.status === 'idle') {
//         text = 'Tiến onl rồi anh em vô chơi game <@251341269656272897> <@251340811743133696>'
//       } else if (newPresence.status === 'dnd') {
//         text = 'Tiến onl rồi anh em vô chơi game <@251341269656272897> <@251340811743133696>'
//       } else if (newPresence.status === 'offline') {
//         return
//       }
//       // etc...

//       channel.send({
//         embeds: [
//           {
//             title: 'Alo anh em',
//             description: text,
//             color: 'E91E63'
//           }
//         ]
//       })
//     }
//   }
// })

const status = queue =>
  `Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({
      embeds: [
        {
          title: `Playing ${username}'s requested song`,
          description: `\`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`,
          color: 'E91E63'
        }
      ]
    })
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send({
      embeds: [
        {
          title: `${username} added a new song to the queue`,
          description: `\`${song.name}\` - \`${song.formattedDuration}\`\nBy: ${song.user}\n${status(queue)}`,
          color: 'E91E63'
        }
      ]
    })
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send({
      embeds: [
        {
          title: `Added playlist to the queue`,
          description: `\`${song.name}\` - \`${song.formattedDuration}\`\nBy: ${song.user}\n${status(queue)}`,
          color: 'E91E63'
        }
      ]
    })
  )
  .on('error', (channel, e) => {
    channel.send(`${client.emotes.error} | Lỗi rồi fackkk: ${e.toString().slice(0, 1974)}`)
    console.error(e)
  })
  .on('empty', queue => queue.textChannel.send('Ok bye, nobody is here anyway 😔'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} | Couldn't find this song :(( \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send('Business is done!'))

client.login(process.env.TOKEN)
