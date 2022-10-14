const request = require('request');

const forecast = (latitude, longitude, callback) => {
	//Openweather API
	const url =
		'https://api.openweathermap.org/data/2.5/onecall?lat=' +
		latitude +
		'&lon=' +
		longitude +
		'&units=imperial&exclude=hourly,minutely,alerts&appid=88b895fa4815bc85c2b6ee08540fbf86';

	request({ uri: url, json: true }, (error, { body }) => {
		if (error) {
			callback(undefined, 'Unable to connect to the weather service');
		} else if (body.cod) {
			callback(undefined, 'Unable to find weather location');
		} else {
			callback({
				timezone: body.timezone,
				current: body.current,
				daily: body.daily,
			});
		}
	});
};

module.exports = forecast;
