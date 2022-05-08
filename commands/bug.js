const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const usersOnCooldown = [];
const timeout = 1000 * 60 * 5;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bug')
        .setDescription('Report a bug')
        .addStringOption(option =>
            option.setName('bug')
                .setDescription('The bug')
                .setRequired(true)),
    async execute(interaction) {
        const bug = interaction.options.getString('bug');

        const embed = new MessageEmbed()
            .setTitle('Bug')
            .setDescription(bug)
            .addField('Submitted by', interaction.user.tag)
            .setColor('#184c46')
            .setTimestamp()
            .setFooter({ text: 'Nezz', iconURL: 'https://github.com/TolleyLikesRice/Nezz/raw/main/assets/icon-256.png' });

        interaction.client.channels.fetch(process.env.BUGCHANNEL).then(channel => channel.send({ embeds: [embed] }).then((msg) => {
            interaction.reply('Thanks for your report! I\'ve notified Tolley. If you don\'t mind, please join the [SystemNezz server](https://discord.systemnezz.xyz) so he can DM you if more details are needed.');
        }));
    },
};