const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const mongoose = require('mongoose')
const mongo = require('../mongo')
const kickschema = require('../models/kick-schema')
const PREFIX = '-'

module.exports = {
  name: 'kick',
  description: 'Kick CMD',
  execute: async (message, args, MessageEmbed) => {
    const target = message.mentions.users.first()
    const tmember = message.guild.members.cache.get(target.id)
    const argss = message.content.slice(PREFIX.length).trim().split(" ");

    if (!target) return message.reply('Argument Error')

    const reason = argss[2]

    await mongo().then(async (mongoose) => {
      try {
        await kickschema.create({
          userId: target.id,
          guildId: message.guild.id,
          reason,
          moderatorId: message.author.id, 
        }
        )

      } finally {
        mongoose.connection.close()
      }
    })
    const embed = new Discord.MessageEmbed()
    embed.setTitle('**Alert**')
    embed.setDescription('New kick administered')
    embed.addField('**Issuer:**', message.author.tag)
    embed.addField('**Reciever:**', target.tag)
    embed.addField('**Reason:**', reason)
    embed.addField('**Reciever ID:**', target.id)
    embed.setColor('RANDOM')
    embed.setFooter('Express - Coded by Ceri')
    message.channel.send(embed)
    //tmember.kick()
  } 
  }