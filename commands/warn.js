const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
const client = new Discord.Client()
const mongo = require('../mongo')
const mongoose = require('mongoose')
const warnmodel = require('../models/warn-schema')
const PREFIX = '-'

module.exports = {
  name: 'warn',
  minArgs: 2,
  expectedArgs: "<Target user's @> <reason>",
  requiredRoles: ['Moderator'],
  execute: async (message, args, MessageEmbed) => {
    const target = message.mentions.users.first()
    const targetmember = message.guild.members.cache.get(target.id)
    const argss = message.content.slice(PREFIX.length).trim().split(" ");
    const reason = argss.slice(2).join(' ')
    if (!reason) return message.reply('Provide a reason after you @ the user you wish to warn')
    await mongo().then(async (mongoose) => {
      try {
        await warnmodel.create({
          userId: target.id,
          guildId: message.guild.id,
          moderatorId: message.author.id,
          reason,
          timestamp: Date.now(),
    })
    } finally {
      console.log('Done')
    }
    })
    const embed = new Discord.MessageEmbed()
    embed.setTitle("**Alert!**")
    embed.setDescription('`New warning administered`')
    embed.addField('Issuer:', message.author.tag)
    embed.addField('Reciever:', target.tag)
    embed.addField('Reason:', reason)
    embed.addField('Time:', Date.now())
    embed.setFooter('Express - Coded by Ceri')
    embed.setColor('RANDOM')
    message.channel.send(embed)
    targetmember.send(embed)
  }
}