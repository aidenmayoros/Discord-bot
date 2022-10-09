const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Replies with current weather data for given location')
		.addStringOption((option) =>
			option
				.setName('location')
				.setDescription('Location to get weather data')
				.setRequired(true)
		),
	async execute(interaction) {
		const weatherLocation = interaction.options.getString('weather_location');

		await interaction.reply({
			content: `Weather response for ${weatherLocation}!`,
			ephemeral: true,
		});
	},
};
