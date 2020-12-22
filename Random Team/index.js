const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('../config.json');
const random = require('./random')

var firstUser,duoUser, firstMember, duoMember;
var duoChannels = [];
var flexChannels = [];

client.on('ready', () => {
  console.log('The client is ready!')

  random(client, config.prefix, firstUser, duoUser,firstMember, duoMember,duoChannels, flexChannels)
})

client.login(config.token)
