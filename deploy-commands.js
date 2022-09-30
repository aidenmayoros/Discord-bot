const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [];

const rest = new REST({ version: '10' }).setToken(token);

rest
	.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) =>
		console.log(`Successfully registered ${data.length} application commands.`)
	)
	.catch(console.error);
