module.exports = (client, PREFIX) => {
   client.once('ready', () => {
        const logChannel = client.channels.cache.get('776102166842572840');
        console.log(`${client.user.tag} is online.`);

        /*if (logChannel) {
            logChannel.send(`${client.user.tag} is online.`);
            const selfCommands = client.commands.filter(cmd => cmd.help.selfcommand && !cmd.help.testcommand);
            logChannel.send('Ces commandes ont besoin d\'être initialisées :');
            selfCommands.forEach(cmd => logChannel.send(`${PREFIX}${cmd.help.name}`));
        }*/
    });
};