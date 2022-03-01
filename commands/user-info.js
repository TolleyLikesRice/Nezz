const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('Information about a given user'),
	async execute(interaction) {



		// Make + Send Embed
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setFooter({ text: 'Nezz by TolleyLikesRice', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
		return interaction.reply({ embeds: [embed] });
	},
};
