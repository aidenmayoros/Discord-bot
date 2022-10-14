const { SlashCommandBuilder } = require('discord.js');
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

    // This means tell Discord that this might possibly take 3+ seconds
    interaction.deferReply({ ephemeral: true });

    const GEOCODE_LOCATION_URL = `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${weatherLocation}&apiKey=N2JiNzA0OWM4MzZiNGVmODgzNWI3ZGEzNGQ5Njk4ZDI6YmFlMTkyODYtOTYwMS00MGNjLWFhODEtNTkzNzVmZGU4MGZl`;

    const geocodeData = await axios.get(GEOCODE_LOCATION_URL);

    const { latitude, longitude } =
      geocodeData.data.locations[0].referencePosition;

    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=hourly,minutely,alerts&appid=88b895fa4815bc85c2b6ee08540fbf86`;

    const weatherData = await axios.get(WEATHER_URL);

    await interaction.editReply({
      content: `The temperature of ${weatherLocation} is ${weatherData.data.current.temp.toString()}!`,
      ephemeral: true
    });
  }
};
