const Discord = require('discord.js')
const warnmodel = require('../models/warn-schema')
const mongoose = require('mongoose')
const mongo = require('../mongo')
const PREFIX = '-'

module.exports = {
  name: 'rmw',
  description: 'Remove a warning from a users Document',
  execute: async (message, args, MessageEmbed) => {
    const argss = message.content.slice(PREFIX.length).trim().split(" ");
    const warnId = argss[1]
    mongoose.connect(process.env['srv1'], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const data = await warnmodel.findById(warnId)
    console.log(data)

    if (!data) {
      message.reply('User has no current warnings, or there is an error with the database connection, or the warnId was invalid')
    } else {
      data.delete()
      const embed = new Discord.MessageEmbed()
      embed.setTitle('**Alert**')
      embed.setDescription(message.author.tag + " Removed 1 of " + "<@" + message.guild.members.cache.get(data.userId) + ">" + " warnings!")
      embed.setColor('RANDOM')
      message.channel.send(embed)
    }



  }
}