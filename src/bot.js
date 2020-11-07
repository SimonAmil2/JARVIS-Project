require('dotenv').config();

const { Client } = require('discord.js');

const client = new Client();
const PREFIX = '$';

client.on('ready', () => {
    console.log(`${client.user.username} has logged in.`);
})

client.on('message', (message) => {
    if (message.author.bot) return;
    // console.log(`[${message.author.tag}] : ${message.content}`);
    // if (message.content === 'hello') {
    //     message.reply('Hello there!');
    // }

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/)   // Match spaces
        console.log(CMD_NAME);
        console.log(args);
    }

});

client.on('error', (error) => {
    console.log('Something goes wrong ...');
    console.log(error.message);
})

// Connect bot to the server
client.login(process.env.DISCORDJS_BOT_TOKEN); 
