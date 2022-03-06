const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;
const tsjl = require('tsjl-node');
const logger = new tsjl.Logger('nezz', 'dadjoke');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dadjoke')
        .setDescription('Have a dad joke'),
    async execute(interaction) {
        axios({ url: 'https://icanhazdadjoke.com/', headers: { 'Accept': 'text/plain', 'User-Agent': 'nezz' } })
            .then(res => {
                interaction.reply(res.data);
            })
            .catch(err => {
                logger.error('Error: ', err.message);
            });
    },
};