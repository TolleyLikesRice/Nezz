const fs = require('node:fs');
const { Client, Collection, Intents, Message, MessageEmbed } = require('discord.js');
const tsjl = require('tsjl-node');
const logger = new tsjl.Logger('nezz', 'app');
const axios = require('axios').default;
require('dotenv').config();

const client = new Client({ intents: ['GUILD_MEMBERS'] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


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

if (process.env.WELCOMECHANNEL) {

    const welcomeChannel = client.channels.cache.get(process.env.WELCOMECHANNEL);

    if (!welcomeChannel) return logger.error('Welcome channel was not found');

    client.on('guildMemberAdd', (member) => {
        const embed = new MessageEmbed()
            .setAuthor({ name: member.username, iconURL: member.displayAvatarURL({ dynamic: true }) })
            .setColor('#184c46')
            .setTitle('Welcome to the server!')
            .setDescription(`Welcome to the server, ${member}!`)
            .setThumbnail(member.displayAvatarURL())
            .setTimestamp();

        welcomeChannel.send({ embeds: [embed] });


    });

}


client.login(process.env.TOKEN);
