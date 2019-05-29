const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// to set paths of config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// to set handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// to host static folders
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        name: 'Mukul Gupta',
        title: 'Weather'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: "This is a help message!",
        name: 'Mukul Gupta',
        title: 'Help'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Mukul Gupta',
        title: 'About'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            Error: "Address must be provided!"
        })
    }

    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                Error: error
            });
        }

        forecast(lattitude, longitude, (error, {summary, temprature, precipProbability} = {}) => {
            if(error) {
                return res.send({
                    Error: error
                });
            }
            res.send({
                summary,
                temprature,
                precipProbability,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Mukul Gupta',
        title: '404',
        errorMessage: "Help article not found!"
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Mukul Gupta',
        title: '404',
        errorMessage: "Page not found!"
    })
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});