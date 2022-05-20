const fs = require('node:fs');
const { MessageEmbed } = require('discord.js');
const tsjl = require('tsjl-node');
const logger = new tsjl.Logger('nezz', 'guildMemberAdd');
require('dotenv').config();
module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member) {


        // Getting the guild settings from the guilds folder.
        const file_path = './data/guilds/' + member.guild.id + '.json';

        let guildSettings;

        try {
            guildSettings = JSON.parse(fs.readFileSync(file_path, 'utf8'));
        }
        catch (err) {
            logger.error(err);
            if (err.code !== 'ENOENT') throw err;
            return;
        }

        if (!guildSettings.welcomeEnabled) return;


        const joinChannel = member.guild.channels.cache.get(guildSettings.leaveChannel);

        if (!joinChannel) return logger.error('Join channel was not found');

        let joinTitle = guildSettings.welcomeTitle;
        let joinMessage = guildSettings.welcomeMessage;

        // Replacing keywords in the welcome message with the correct value.
        const keywords = JSON.parse(fs.readFileSync('./data/keywords.json', 'utf8'));
        let temp;


        const joinTSplit = joinTitle.split(' ');
        const joinMSplit = joinMessage.split(' ');

        const size1 = joinTSplit.length;
        const size2 = joinMSplit.length;


        for (let i = 0;i < keywords.keyword.length;i++) {

            for (let y = 0; y < size2 ;y++) {
                if (joinMSplit[y].includes(keywords.keyword[i])) {
                    temp = eval(keywords.replace[i]);
                    joinMessage = joinMessage.replace(keywords.keyword[i], temp);
                }

            }
            for (let x = 0; x < size1;x++) {
                if (joinTSplit[x].includes(keywords.keyword[i])) {
                    temp = eval(keywords.replace[i]);
                    joinTitle = joinTitle.replace(keywords.keyword[i], temp);
                }

            }

        }


        const embed = new MessageEmbed()
            .setAuthor({ name: member.user.username, iconURL: member.displayAvatarURL({ dynamic: true }) })
            .setColor('#184c46')
            .setTitle(joinTitle)
            .setDescription(joinMessage)
            .setThumbnail(member.displayAvatarURL())
            .setTimestamp();

        joinChannel.send({ embeds: [embed] });
    },
};
