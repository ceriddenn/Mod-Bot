const Discord = require('discord.js')
const MessageEmbed = require('discord.js')

module.exports = {
  name: 'ping',
  description: 'Latency cmd',
  execute(message, MessageEmbed) {
    message.channel.send('Latency Currently is ' + `${message.client.ws.ping}` + 'ms')


  }
}