const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dc84f60131d354e90ebc71a902a61f30&query=' + latitude + ',' +longtitude
    request({ url, json : true }, (error, response) => {
        const currentResponse = response.body.current
        const {
            temperature,
            feelslike,
            humidity
        } = currentResponse
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else {
            callback(undefined, 'It is currenty ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out. And the humidity is ' + humidity + 'percent')
        }
    });
}

module.exports = forecast