const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoianVuaWFuZGlrYSIsImEiOiJja3hoNHg1c2cyampsMm5vY3g0N2p6aWYzIn0.jKjNP-WHzs7zvAjQRpMzOA&limit=1'
    request({ url, json : true }, (error, { body }) => {
        if(error) {
            console.log('Unable to connect to map servive')
        } else if(body.features.length === 0) {
            console.log('Unable to find the location')
        } else {
            callback(undefined, {
                longtitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    });
}

module.exports = geocode
