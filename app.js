const yargs = require('yargs')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather.getWeather(results.latitude, results.longitude, (errorMessage, results) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`Temperature is ${results.temperature} but feels like ${results.apparentTemperature}`);
      }
    })
  }
})
