const { kayn } = require('../../utils/kaynConfig');
const { getRankedStats } = require('../../utils/leagueUtils');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    try {
        const { id, name, summonerLevel, profileIconId } = await kayn.Summoner.by.name(args[0]);
        const { soloRank, soloRatio, soloBo, flexRank, flexRatio, flexBo } = await getRankedStats(id);

        const embed = new MessageEmbed()
            .setAuthor(`${name} (Lvl. ${summonerLevel})`)
            .setColor('#03A9F4')
            .setDescription('Ranked stats for solo/flex games')
            .addField('Ranked (SoloQ)', `${soloRank} ${soloRatio}`)
            .addField('SoloQ BO', soloBo)
            .addField('Ranked (Flex)', `${flexRank} ${flexRatio}`)
            .addField('Flex BO', flexBo)
            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${profileIconId}.png`)
            .setTimestamp()
            .setFooter(message.author.username);
        
        message.channel.send(embed);
    } catch (err) {
        if (err.statusCode === 404) {
            return message.channel.send(`L'invocateur ${args[0]} n'existe pas`);
        } else {
            return message.channel.send(err.message);
        }
    }
}

module.exports.help = {
    aliases: ['getrank', 'grank'],
    args: true,
    cooldown: 10,
    description: "Informations sur le classement du joueur",
    isUserAdmin: false,
    name: 'getrankedstats',
    permissions: false,
    usage: '<player_name>'
}