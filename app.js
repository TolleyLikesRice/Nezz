const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const tsjl = require('tsjl-node');
const logger = new tsjl.Logger('nezz', 'app');
const axios = require('axios').default;
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    logger.success('Ready!');
    setInterval(function() {
        // Ping uptime kuma every 60 seconds
        axios.get('https://uptime.tolley.dev/api/push/vzGKZlaPK4?msg=OK');
    }, 60 * 1000);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    }
    catch (error) {
        logger.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.TOKEN);
