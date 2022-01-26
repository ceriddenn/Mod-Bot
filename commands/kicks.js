const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const kickschema = require('../models/kick-schema')
const mongoose = require('mongoose')
const mongo = require('../mongo')
const PREFIX = '-'

module.exports = {
  name: 'kicks',
  description: 'List a users kick history',
  execute: async (message, args, MessageEmbed) => {
    const target = message.mentions.users.first()
    const tmember = message.guild.members.cache.get(target.id)
    const argss = message.content.slice(PREFIX.length).trim().split(" ");
    if (!target) return message.reply('Argument Error..')

    mongoose.connect(process.env['srv1'], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const data = await kickschema.find({
      userId: target.id,
      guildId: message.guild.id,
    })
    const embedDis = data.map((kick) => {
      const mod = message.guild.members.cache.get(kick.moderatorId)
      return [
        `KickID: ${kick._id}`,
        `UserID: ${kick.userId}`
      ].join('\n')
    })
    .join('\n\n')
    const embed = new Discord.MessageEmbed()
    embed.setTitle(`Kicks for user` + mod)
    embed.setDescription(embedDis)
    embed.setColor('RANDOM')
    message.channel.send(embed)
    

  }
}