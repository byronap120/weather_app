const request = require('request')


var getWeather = (Latitude, Longitude, callback) => {
request({
  url: `https://api.darksky.net/forecast/049049ac7b65322821c21ca756f785c7/${Latitude},${Longitude}`,
  json: true,
  }, (error, response, body) => {
      if(error) {
        callback('Unable to connect forecast.io');
      } else if (response.statusCode === 400) {
        callback('Unable to fetch weather');
      } else if (response.statusCode === 200){
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    })
}

module.exports = {
  getWeather: getWeather
};
