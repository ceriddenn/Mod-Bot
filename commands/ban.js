const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
const mongoose = require('mongoose')
const mongo = require('../mongo')
const banmodel = require('../models/ban-schema')
const punishtype = 'Ban'
var bid = Math.floor(1000 + Math.random()*9000);

const PREFIX = '-'
module.exports = {
  name: 'ban',
  description: 'ban cmd',
  execute: async (message, args, MessageEmbed) => {
    const target = message.mentions.users.first()
    const targetmember = message.guild.members.cache.get(target.id)
    const argss = message.content.slice(PREFIX.length).trim().split(" ");

    const reason = argss.slice(2).join(' ')
    if (!reason) return message.reply('Please provide a reason')
    
    await mongo().then(async (mongoose) => {
      try {
        await banmodel.create({
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
    embed.setTitle('**Alert!**')
    embed.setDescription('`Ban Issued`')
    embed.addField('Issuer:', message.author.tag)
    embed.addField('Reciever:', target.tag)
    embed.addField('Reason:', reason)
    embed.addField('Time:', Date.now())
    embed.addField('RecieverId:', target.id)
    embed.setFooter('Express - Coded by Ceri')
    embed.setColor('#008000')
    message.channel.send(embed)
    targetmember.send(embed)
    //target.ban()
    
  }
}