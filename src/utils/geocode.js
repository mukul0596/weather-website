const request = require('request');

function geocode(address, callback) {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibXVrdWwwNTk2IiwiYSI6ImNqdzF4empkczBvczkzenBzOWxpZTJrdzAifQ.skvI3yfkPhyRI9upXgU5tA";

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback("Unable to connect to weather services!", undefined);
        } else if(body.features.length == 0) {
            callback("Unable to find loaction. Try another search!", undefined);
        } else {
            callback(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;