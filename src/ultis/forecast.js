const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/81df9d43e691e7965902926d869b350d/${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('unable to connect to location services', undefined);
    } else if (response.body.error) {
      callback('unable to search result, please try again');
    } else {
      callback(undefined, `${response.body.daily.data[0].summary}it is currently${response.body.currently.temperature} degree, there is a ${response.body.currently.precipProbability} chance of rain.`);
    }
  });
};

module.exports = forecast;