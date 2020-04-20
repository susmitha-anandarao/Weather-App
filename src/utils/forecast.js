const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bf985ffa1874e38449f2a086b4e55be7&query=${latitude},${longitude}&units=f`

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const current = body.current
            callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`)
        }
    })
}

module.exports = forecast