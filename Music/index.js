const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('../config.json');
const music = require('./music')

client.on('ready', () => {
  console.log('The client is ready!')

  music(client, config.prefix)
})

client.login(config.token)
