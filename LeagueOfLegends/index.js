const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('../config.json');
const lol = require('./lol')
const fetch = require('node-fetch')

const { Kayn, REGIONS } = require('kayn')
const kayn = Kayn(config.lolApiToken)({
    region: REGIONS.EUROPE_WEST,
    apiURLPrefix: 'https://%s.api.riotgames.com',
    locale: 'en_US',
    debugOptions: {
        isEnabled: true,
        showKey: false,
    },
    requestOptions: {
        shouldRetry: true,
        numberOfRetriesBeforeAbort: 3,
        delayBeforeRetry: 1000,
        burst: false,
        shouldExitOn403: false,
    },
    cacheOptions: {
        cache: null,
        timeToLives: {
            useDefault: false,
            byGroup: {},
            byMethod: {},
        },
    },
})

client.on('ready', () => {
  console.log('The client is ready!')

  lol(client, config.prefix, kayn, config.lolApiToken,fetch)
})

client.login(config.token)
