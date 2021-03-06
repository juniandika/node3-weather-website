const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andika'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        image: './img/robot.png',
        name: 'Andika'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some helpful text',
        title: 'Help',
        name: 'Andika'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {longtitude, latitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forcast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Andika'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: '404',
        name: 'Andika'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})