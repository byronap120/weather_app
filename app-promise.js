const yargs = require('yargs')
const axios = require('axios')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;


var encodeAddress = encodeURIComponent(argv.address);
var urlAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

axios.get(urlAddress).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }
  var latitude = response.data.results[0].geometry.location.lat;
  var longitude = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/049049ac7b65322821c21ca756f785c7/${latitude},${longitude}`

  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`Temperature is ${temperature} but feels like ${apparentTemperature}`);

}).catch((e) => {
  if (e.code) {
    console.log('Unable to connect to google server');
  } else {
    console.log(e.message);
  }
});
