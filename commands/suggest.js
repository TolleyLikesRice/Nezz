const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const usersOnCooldown = [];
const timeout = 1000 * 60 * 5;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Suggest a new feature!')
        .addStringOption(option =>
            option.setName('suggestion')
                .setDescription('Your suggestion')
                .setRequired(true)),
    async execute(interaction) {
        const suggestion = interaction.options.getString('suggestion');

        const embed = new MessageEmbed()
            .setTitle('Suggestion')
            .setDescription(suggestion)
            .addField('Submitted by', interaction.user.tag)
            .setColor('#184c46')
            .setTimestamp()
            .setFooter({ text: 'Nezz', iconURL: 'https://github.com/TolleyLikesRice/Nezz/raw/main/assets/icon-256.png' });

        interaction.client.channels.fetch(process.env.SUGGESTIONCHANNEL).then(channel => channel.send({ embeds: [embed] }).then((msg) => {
            msg.react('👍');
            msg.react('👎');
            interaction.reply('Thanks for your suggestion! It\'s now being voted on in the [SystemNezz server](https://discord.systemnezz.xyz).');
        }));
    },
};