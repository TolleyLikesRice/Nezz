const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flip a coin'),
    async execute(interaction) {
        let coin = Math.round(Math.random());
        if (coin == 0) coin = 'Tails';
        else if (coin == 1) coin = 'Heads';
        else coin = 'Error';
        interaction.reply(coin);
    },
};