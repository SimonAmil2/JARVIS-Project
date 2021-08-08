require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { handleCd, loadCommands } = require('./utils/utils');
const path = require('path');

const client = new Client();
const PREFIX = process.env.PREFIX;

['commands', 'cooldowns'].forEach(x => client[x] = new Collection());   // New collections for commands and cd
loadCommands(path.join(__dirname, 'commands'), client);                 // Loads commands

client.on('ready', () => {
    const botLoggedIn = `${client.user.username} has logged in.`
    const channelBotLog = client.channels.cache.get('776102166842572840');
    const allCommands = client.commands;
    const allSelfCommands = allCommands.filter(cmd => cmd.help.selfcommand && !cmd.help.testcommand);

    console.log(botLoggedIn);
    //channelBotLog.send(botLoggedIn);
    
    // Self commands that need to be init

    /*channelBotLog.send('Ces commandes ont besoin d\'être intialisées : ')
    allSelfCommands.forEach(cmd => channelBotLog.send('$'+cmd.help.name));*/
});

client.on('message', (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;  // Ignore message without prefix or bot messages

    const args = message.content.slice(PREFIX.length).split(/ +/);  // Remove prefix and stack all args in arr / ex:  [user, bla, bla] 
    const commandName = args.shift().toLowerCase();                 // Get the command in a string / ex : user 
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    
    if (!command) return;
    
    const isAgent = !(message.member.roles.cache.size === 1);
    const isAdmin = message.member.permissions.has('ADMINISTRATOR');
    const wrongArgsSize = (command.help.args && (!args.length || (args.length <  command.help.argsSize)));
    const noMentions = !(message.mentions.users.size || message.mentions.roles.size);
    const needMentionedArgs = (command.help.mentionedArgs && noMentions);

    // check if command exist
    

    // Handle args
    if (wrongArgsSize || needMentionedArgs) {
        let noArgsReply = `Missings args ${message.author} !`;
        // In case of missing args
        if (needMentionedArgs) {
            if (command.help.usage) noArgsReply += `\n>> \`${PREFIX}${command.help.name} ${command.help.usage}\` with mentions`;  
        }
        else {
            if (command.help.usage) noArgsReply += `\n>> \`${PREFIX}${command.help.name} ${command.help.usage}\``;
        }
        return message.channel.send(noArgsReply);
    }

    // Check status (Can not ban Admin or Mod) 
    if (command.help.isUserAdmin && message.guild.member(message.mentions.users.first()) && message.guild.member(message.mentions.users.first()).hasPermission('BAN_MEMBERS')) return message.reply("Tu n'as pas les permissions nécessaires pour lancer cette commande!");

    // Check permissions
    if (command.help.permissions && !isAdmin) return message.reply("Tu n'as pas les permissions nécessaires!");

    // Prevent useless command spam
    if (command.help.newuser) {
        if (isAgent && !isAdmin) {
            return message.reply("Bruhh, ce n'est pas une commande pour toi");
        }
    }

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
