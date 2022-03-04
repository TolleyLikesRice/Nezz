const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Generate a random number')
        .addIntegerOption(option =>
            option.setName('min')
                .setDescription('Minimum of the random number')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('max')
                .setDescription('Maximum of the random number')
                .setRequired(true)),
    async execute(interaction) {
        const min = interaction.options.getInteger('min');
        const max = interaction.options.getInteger('max');
        interaction.reply(`Your random number between ${min} and ${max} is: ${Math.floor(Math.random() * (max - min) + min).toString()}`);
    },
};