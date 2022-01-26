const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'de',
  description: 'cmd',
  execute: (message, args, MessageEmbed) => {
    const member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    member.VoiceState.setDeaf(true)
  }
}