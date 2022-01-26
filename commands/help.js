const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
const mongoose = require('mongoose')
const mongo = require('../mongo')

const PREFIX = '-'
module.exports = {
  name: 'help',
  description: 'help cmd',
  execute: async (message, args, MessageEmbed) => {
    const embed = new MessageEmbed()
    embed.setTitle('Commands!')
    embed.setDescription('-Ban\n-Bans\n-DBStatus\n-deafen\n-kick\n-kicks\n-ping\n-rmw\n-warn\n-warns')
    embed.setColor('RANDOM')
    embed.setFooter('Express - Coded by Ceri')
    message.channel.send(embed)
  }
}