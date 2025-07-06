const { readdirSync } = require('fs');

module.exports.loadCommands = (mainDir = './commands/', client) => {
    readdirSync(mainDir).forEach(dir => {
        // Load only js file from subdirs
        const commands = readdirSync(`${mainDir}/${dir}/`).filter(file => file.endsWith('.js'));
        
        for (const file of commands) {
            const getFileName = require(`${mainDir}/${dir}/${file}`); 
            client.commands.set(getFileName.help.name, getFileName);    // Set command in collection
            console.log(`Commande chargéee: ${getFileName.help.name}`);
        }
    });
}

module.exports.handleCd = (client, command, args, message) => {
    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 5) * 1000;

    if (tStamps.has(message.author.id)) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

        if (timeNow < cdExpirationTime) {
            let timeleft = (cdExpirationTime - timeNow) / 1000;
            return message.reply(`Merci d'attentre ${timeleft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\``);
        }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    // Run commands
    command.run(client, message, args);
}



module.exports.getMentionnedMembers = (message) => {
    let mentionedUsers = message.mentions.users;
    if(mentionedUsers?.size) {
        return  mentionedUsers.map(u => message.guild.member(u))
    }
    else {
        message.channel.send("Aucun membre mentionné");
    }
    
}

module.exports.moveMember = (message, mentionedMember, args) => {
    let argsWithTag = args.filter(a => a.includes('#'));
    let chosenChannelName = (argsWithTag[0]) ? argsWithTag[0].replace("#", "").replace("<","").replace(">","") : undefined;
    let chosenChannel = (chosenChannelName) ? 
                                message.guild.channels.cache.filter(c => c.type === 'voice').filter(c => c.id.toLowerCase().trim().includes(chosenChannelName.toLowerCase())).first()
                                : undefined;
    
    if (chosenChannel) {
        if(mentionedMember.voice.channel) {
            if(chosenChannel.id === mentionedMember.voice.channel.id) {
                message.channel.send(`${mentionedMember} est déjà dans ce channel...`);
            }

            else {
                message.channel.send(`${mentionedMember}, je te déplace dans le channel ${chosenChannel} dans 10 secondes...`);
                //mentionedMember.user.send(`Je te déplace dans le channel ${chosenChannel} dans 3 secondes...`);
                setTimeout(function(){
                    mentionedMember.voice.setChannel(chosenChannel);
                }, 10000);
            }
        }

        else {
            message.channel.send(`${mentionedMember.displayName} n'est pas connecté à un channel vocal.`)
        }
    }
    else {
        message.channel.send(`Tu n'as pas mentionné de channelID.`)
    }
}