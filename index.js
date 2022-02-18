const { DisTube } = require('distube')
require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
  ]
})
const fs = require('fs')
const config = require('./config.json')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

//Global variable
let username

client.config = require('./config.json')
client.distube = new DisTube(client, {
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
    console.log(`Loaded ${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})

client.on('ready', () => {
  console.log(`${client.user.tag} is ready to play music.`)
  client.user.setActivity(`music for the homies`, { type: 'PLAYING' })
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

  if (message.author.bot || !message.guild) return
  const prefix = config.prefix
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return
  // if (cmd.inVoiceChannel && !message.member.voice.channel) {
  //   return message.channel.send({
  //     embeds: [
  //       {
  //         description: `Join room rồi hẵn chạy lệnh man`,
  //         color: 'E91E63'
  //       }
  //     ]
  //   })
  // }
  try {
    cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
  }
})

const status = queue =>
  `Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({
      embeds: [
        {
          title: `Đang chơi bài của ${username}`,
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
          title: `${username} mới thêm vào queue`,
          description: `\`${song.name}\` - \`${song.formattedDuration}\`\nNgười thêm: ${song.user}\n${status(queue)}`,
          color: 'E91E63'
        }
      ]
    })
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send({
      embeds: [
        {
          title: `Đã thêm playlist vào queue`,
          description: `\`${song.name}\` - \`${song.formattedDuration}\`\nNgười thêm: ${song.user}\n${status(queue)}`,
          color: 'E91E63'
        }
      ]
    })
  )
  .on('error', (channel, e) => {
    channel.send(`${client.emotes.error} | Lỗi rồi fackkk: ${e.toString().slice(0, 1974)}`)
    console.error(e)
  })
  .on('empty', channel => channel.send('Anh em out hết rồi, tôi đi luôn đây'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} | Kiếm không ra bài này rồi man :(( \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send('Đã hát xong!'))
// // DisTubeOptions.searchSongs = true
// .on("searchResult", (message, result) => {
//     let i = 0
//     message.channel.send(
//         `**Choose an option from below**\n${result
//             .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
//             .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
//     )
// })
// .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
// .on("searchInvalidAnswer", message =>
//     message.channel.send(
//         `${client.emotes.error} | Invalid answer! You have to enter the number in the range of the results`
//     )
// )
// .on("searchDone", () => {})

client.login(process.env.TOKEN)
