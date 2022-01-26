const mongoose = require('mongoose')
const mongo = require('../mongo')
const Discord = require('discord.js')
const PREFIX = '-'
module.exports = {
  name: 'db',
  description: 'Db Connection status cmd',
  execute: async (message, args, MessageEmbed) => {
  const args1 = message.content.slice(PREFIX.length).trim().split(" ");
    if (args1[1] == 'connect') {
      const embed1 = new Discord.MessageEmbed()
      embed1.setTitle('Trying to connect to cluster0..')
      embed1.setColor('#742845')
      embed.setFooter('Express - Coded by Ceri')
      message.channel.send(embed1)
      await mongo().then(async (mongoose) => {
    })
      const embed2 = new Discord.MessageEmbed()
      embed2.setTitle('Testing results')
      embed2.setDescription('Key')
      embed2.setColor('#425962')
      embed2.addField('0 = Disconnected', ',')
      embed2.addField('1 = Connected', ',')
      embed2.addField('2 = Connecting', ',')
      embed2.addField('3 = Disconnecting', ',')
      embed2.addField('Connection Response ', `**${mongoose.connection.readyState}**`)
      embed.setFooter('Express - Coded by Ceri')
      message.channel.send(embed2)
    } else {
      message.reply('An error occured')
    }
  }
}
