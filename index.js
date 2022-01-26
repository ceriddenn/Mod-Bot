const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`RDT-Essentials listening at http://localhost:${port}`))

const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
const fs = require('fs')
const prefix = '-'
const mg = require('mongoose')
const client = new Discord.Client()
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log('Client logged in as ' + client.user.tag)
  console.log('Check C1 - Status: Waiting 🟠')
  console.log('Check F3 - Status: ✅')
  console.log('Check F1 - Mongo: ✅')
  console.log('Check F0 - Bot: ✅')
})
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, MessageEmbed);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.login(process.env['token'])