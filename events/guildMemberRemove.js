const fs = require('node:fs');
const { MessageEmbed } = require('discord.js');
const tsjl = require('tsjl-node');
const logger = new tsjl.Logger('nezz', 'guildMemberRemove');
require('dotenv').config();
module.exports = {
    name: 'guildMemberRemove',
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
        if (!guildSettings.leaveEnabled) return;

        const leaveChannel = member.guild.channels.cache.get(guildSettings.leaveChannel);

        if (!leaveChannel) return logger.error('Leave channel was not fuond');

        let leaveTitle = guildSettings.leaveTitle;
        let leaveMessage = guildSettings.leaveMessage;

        // Replacing keywords in the welcome message with the correct value.
        const keywords = JSON.parse(fs.readFileSync('./data/keywords.json', 'utf8'));
        let temp;


        const leaveTSplit = leaveTitle.split(' ');
        const leaveMSplit = leaveMessage.split(' ');

        const size1 = leaveTSplit.length;
        const size2 = leaveMSplit.length;


        for (let i = 0;i < keywords.keyword.length;i++) {

            for (let y = 0; y < size2 ;y++) {
                if (leaveMSplit[y].includes(keywords.keyword[i])) {
                    temp = eval(keywords.replace[i]);
                    leaveMessage = leaveMessage.replace(keywords.keyword[i], temp);
                }

            }
            for (let x = 0; x < size1;x++) {
                if (leaveTSplit[x].includes(keywords.keyword[i])) {
                    temp = eval(keywords.replace[i]);
                    leaveTitle = leaveTitle.replace(keywords.keyword[i], temp);
                }

            }

        }


        const embed = new MessageEmbed()
            .setAuthor({ name: member.user.username, iconURL: member.displayAvatarURL({ dynamic: true }) })
            .setColor('#184c46')
            .setTitle(leaveTitle)
            .setDescription(leaveMessage)
            .setThumbnail(member.displayAvatarURL())
            .setTimestamp();

        leaveChannel.send({ embeds: [embed] });
    },
};
