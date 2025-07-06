const { Collection, PermissionsBitField } = require('discord.js');

module.exports = (client, PREFIX) => {
    client.on('messageCreate', async message => {
        if (!message.content.startsWith(PREFIX) || message.author.bot) return;
        if (!message.member) return;

        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command =
            client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases?.map(a => a.toLowerCase()).includes(commandName));

        if (!command) return;

        const isAdmin = message.member.permissions.has(PermissionsBitField.Flags.Administrator);
        const isAgent = message.member.roles.cache.size > 1;
        const wrongArgs = command.args && args.length < (command.argsSize || 1);
        const missingMentions = command.mentionedArgs && !message.mentions.users.size && !message.mentions.roles.size;

        if (wrongArgs || missingMentions) {
            let reply = `Arguments manquants, ${message.author}!`;
            if (command.usage) {
                reply += `\nUsage : \`${PREFIX}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
        }

        if (command.isUserAdmin && message.mentions.members.first()?.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply("Tu n'as pas les permissions nécessaires pour utiliser cette commande.");
        }

        if (command.permissions && command.permissions.length > 0 && !message.member.permissions.has(command.permissions.map(p => PermissionsBitField.Flags[p]))) {
            return message.reply("Tu n'as pas les permissions nécessaires !");
        }

        if (command.newuser && isAgent && !isAdmin) {
            return message.reply("Cette commande ne t'est pas destinée.");
        }

        // Cooldowns
        if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 5) * 1000;

        if (timestamps.has(message.author.id)) {
            const expiration = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expiration) {
                const remaining = ((expiration - now) / 1000).toFixed(1);
                return message.reply(`Merci d'attendre ${remaining}s avant de réutiliser \`${command.name}\`.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            await command.run(client, message, args);
        } catch (err) {
            console.error(err);
            message.reply('Erreur lors de l\'exécution de la commande.');
        }
    });
};
