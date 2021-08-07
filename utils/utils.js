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