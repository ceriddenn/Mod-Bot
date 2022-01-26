const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
const mongo = require('../mongo')
const mongoose = require('mongoose')
const warnmodel = require('../models/warn-schema')
const PREFIX = '-'

module.exports = {
  name: 'warns',
  minArgs: 1,
  expectedArgs: "<Target user's @>",
  requiredRoles: ['Moderator'],
  execute: async (message, args, MessageEmbed) => {
    const target = message.mentions.users.first()
    const targetmember = message.guild.members.cache.get(target.id)
    const argss = message.content.slice(PREFIX.length).trim().split(" ");
    mongoose.connect(process.env['srv1'], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const peruserwarns = await warnmodel.find({
      userId: target.id,
      guildId: message.guild.id,
    })

    const embedDis = peruserwarns.map((warn) => {
      const mod = message.guild.members.cache.get(warn.moderatorId)
      return [
        `**WarnId**: ${warn._id}`,
        `**Moderator**: ${mod || 'Has Left'}`,
        `**Punished**: <@${warn.userId}>`,
        '**Date**: being worked on',
        `**Reason**: ${warn.reason}`
      ].join("\n")
    })
    .join("\n\n")

    const embed = new Discord.MessageEmbed()
    embed.setTitle(`<@${target.id}>'s warnings`)
    embed.setDescription(embedDis)
    embed.setColor("RANDOM")
    embed.setFooter('Express - Coded by Ceri')
    message.channel.send(embed)
  }
}