const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
const mongo = require('../mongo')
const mongoose = require('mongoose')
const banmodel = require('../models/ban-schema')
const PREFIX = '-'
module.exports = {
  name: 'bans',
  description: 'Ban List CMD',
  execute: async (message, args, MessageEmbed) => {
    const target = message.mentions.users.first()
    const targetmember = message.guild.members.cache.get(target.id)
    const argss = message.content.slice(PREFIX.length).trim().split(" ");
    mongoose.connect(process.env['srv1'], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const peruserbans = await banmodel.find({
      userId: target.id,
      guildId: message.guild.id,
    })
    const embedDis = peruserbans.map((ban) => {
      const mod = message.guild.members.cache.get(ban.moderatorId)
      return [
        `BanId: ${ban._id}`,
        `Issuer: <@${ban.moderatorId}>`,
        `Punished: <@${ban.userId}>`,
        `Reason: ${ban.reason}`
      ].join('\n')
    })
    .join('\n\n')
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**Alert!**')
    embed.setDescription(embedDis)
    embed.setColor('RANDOM')
    embed.setFooter('Express - Coded by Ceri')
    message.channel.send(embed)

    }
  }
