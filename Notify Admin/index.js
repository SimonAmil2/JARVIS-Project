const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('../config.json')
const notify = require('./notify-admin')

client.on('ready', () => {
  console.log('The client is ready!')

  notify(client)
})

client.login(config.token)
