const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('developer')
		.setDescription('Little bit about me'),
	async execute(interaction) {

		// Buttons
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setURL('https://github.com/TolleyLikesRice')
					.setLabel('GitHub')
					.setStyle('LINK'),
					new MessageButton()
					.setURL('https://twitter.com/TolleyLikesRice')
					.setLabel('Twitter')
					.setStyle('LINK'),
			);

		// Make + Send Embed
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setDescription("I'm Bri'ish, I've used Discord since Nov 2016. I'm not a super experienced developer, but know my way around Node.js. GEORGE WHAT ELSE DO I PUT HERE")
			.setFooter({ text: 'Nezz by TolleyLikesRice', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
		return interaction.reply({ embeds: [embed], components: [row] });
	},
};
