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
			.setTitle("About Me")
			.setColor('#184c46')
			.setDescription("I'm Bri'ish, I've used Discord since Nov 2016. I'm not a super experienced developer, but know my way around Node.js.\n\nI manage a dedicated server, if you need anything hosted, shoot me a PM on Twitter or Discord\n\nIf something is broken, open an issue on GitHub or shoot me a PM on Twitter or Discord")
			.addFields(
				{ name: 'Twitter', value: '@TolleyLikesRice', inline: true },
				{ name: 'Discord', value: 'Tolley#3216', inline: true },
				{ name: 'GitHub', value: 'TolleyLikesRice', inline: true },
			)
			.setFooter({ text: 'Nezz by TolleyLikesRice', iconURL: 'https://github.com/TolleyLikesRice/Nezz/raw/main/assets/icon-256.png' });
		return interaction.reply({ embeds: [embed], components: [row] });
	},
};
