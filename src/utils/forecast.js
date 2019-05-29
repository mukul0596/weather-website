const request = require('request');

function forecast(lattitude, longitude, callback) {
    const url = "https://api.darksky.net/forecast/0153502d81dd81fe58c4dc930f9d9f70/" + lattitude + "," + longitude + "?units=si";

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback("Unable to connect to weather services!", undefined);
        } else if(body.error) {
            callback("Unable to find location!", undefined);
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temprature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            });
        }
    });
}

module.exports = forecast;