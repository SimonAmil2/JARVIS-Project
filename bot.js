require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { handleCd, loadCommands } = require('./utils/utils');
const path = require('path');

const client = new Client();
const PREFIX = process.env.PREFIX;

['commands', 'cooldowns'].forEach(x => client[x] = new Collection());   // New collections for commands and cd
loadCommands(path.join(__dirname, 'commands'), client);                 // Loads commands

client.on('ready', () => {
    console.log(`${client.user.username} has logged in.`);
});

client.on('message', (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;  // Ignore message without prefix or bot messages

    const args = message.content.slice(PREFIX.length).split(/ +/);  // Remove prefix and stack all args in arr / ex:  [user, bla, bla] 
    const commandName = args.shift().toLowerCase();                 // Get the command in a string / ex : user 
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

    // check if command exist
    if (!command) return;  
    
    // Handle args
    if (command.help.args && !args.length) {
        let noArgsReply = `Missings args ${message.author} !`;
        // In case of missing args
        if (command.help.usage) noArgsReply += `\n>> \`${PREFIX}${command.help.name} ${command.help.usage}\``;
        return message.channel.send(noArgsReply);
    }

    // Check status (Can not ban Admin or Mod) 
    if (command.help.isUserAdmin && message.guild.member(message.mentions.users.first()) && message.guild.member(message.mentions.users.first()).hasPermission('BAN_MEMBERS')) return message.reply("Tu n'as pas les permissions nécessaires pour lancer cette commande!");

    // Check permissions
    if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("Tu n'as pas les permissions nécessaires!");

    // Handle cooldowns
    if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection());
    }
    handleCd(client, command, args, message);
});

client.on('error', (error) => {
    console.log('Something goes wrong ...');
    console.log(error.message);
});

// Connect bot to the server
client.login(process.env.DISCORDJS_BOT_TOKEN); 
