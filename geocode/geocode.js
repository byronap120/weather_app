const request = require('request')


var geocodeAddress = (address, callback) => {
  var encodeAddress = encodeURIComponent(address);
  var urlAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`

  request({
    url: urlAddress,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to google server');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }
  } )

};

module.exports = {
  geocodeAddress: geocodeAddress
};
