const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rockpaperscissors')
        .setDescription('Play Rock, Paper, Scissors')
        .addStringOption(option =>
            option.setName('action')
                .setDescription('Your action')
                .setRequired(true)
                .addChoice('Rock', 'Rock')
                .addChoice('Paper', 'Paper')
                .addChoice('Scissors', 'Scissors')),
    async execute(interaction) {

        const actions = ['Rock', 'Paper', 'Scissors'];

        // Taken from https://realpython.com/python-rock-paper-scissors/ and converted into JS

        const user_action = interaction.options.getString('action');
        const computer_action = actions[Math.floor(Math.random() * actions.length)];

        if (user_action == computer_action) {interaction.reply(`We both chose ${computer_action}! It's a tie!`);}
        else if (user_action == 'Rock') {
            if (computer_action == 'Scissors') interaction.reply('Rock smashes scissors! You win!');
            else interaction.reply('Paper covers rock! You lose.');
        }
        else if (user_action == 'Paper') {
            if (computer_action == 'Rock') interaction.reply('Paper covers rock! You win!');
            else interaction.reply('Scissors cuts paper! You lose.');
        }
        else if (user_action == 'Scissors') {
            if (computer_action == 'Paper') interaction.reply('Scissors cuts paper! You win!');
            else interaction.reply('Rock smashes scissors! You lose.');
        }
    },
};