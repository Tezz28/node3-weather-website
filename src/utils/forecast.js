const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/2053d779858a686db9cd6e6d7b9bb303/' + long + ',' + lat + '?units=si'
    
    request({url, json : true}, (error, { body }) => {
        if(error){
            callback('Unable To connect to weather service!',undefined)
        }else if(body.error) {
            callback('Unable To find location.',undefined)
        }else{
            const data = body.currently
            callback(undefined,`${body.daily.data[0].summary} It is currently ${data.temperature} degree centigrate out. There is a ${100*data.precipProbability}% chance of rain and the wind speed is ${3.6 * data.windSpeed} kmph.`)
        }
    })
}

module.exports = forecast
