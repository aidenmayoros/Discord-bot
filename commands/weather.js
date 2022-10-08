const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Replies with location weather data'),
	async execute(interaction) {
		await interaction.reply('');
	},
};
