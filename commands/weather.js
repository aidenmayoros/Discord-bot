const { SlashCommandBuilder } = require('discord.js');
const forecast = require('../weather app/forecast');
const axios = require('axios');

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
		const weatherLocation = interaction.options.getString('location');

		//this is not working
		//use try catch
		//use await on api calls

		await axios
			.get(
				'https://api.myptv.com/geocoding/v1/locations/by-text?searchText=' +
					weatherLocation +
					'&apiKey=N2JiNzA0OWM4MzZiNGVmODgzNWI3ZGEzNGQ5Njk4ZDI6YmFlMTkyODYtOTYwMS00MGNjLWFhODEtNTkzNzVmZGU4MGZl'
			)
			.then((res) => {
				console.log(res.data.locations[0].referencePosition);
			})
			.catch((error) => {
				console.log(error);
			});

		await interaction.reply({
			content: `Weather response for ${weatherLocation}!`,
			ephemeral: true,
		});
	},
};
