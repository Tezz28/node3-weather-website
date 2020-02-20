const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : "Weather App",
        name : "Tejas B"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title : "About",
        name : "Tejas B"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message : 'What Help do you want??',
        title : 'Help',
        name : 'Tejas B'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : "address must be provided"
        })
    }
    geocode(req.query.address,(error,{ longitude, latitude, location } = {}) => {

        if(error) {
            return res.send({error})
        }
    
        forecast(latitude,longitude, (error, forecastData = {}) => {
            if(error){
                return res.send(error)
            }
    
            // console.log(location)
            // console.log(forecastData)
            res.send({
                location,
                forecastData,
                address : req.query.address
            })
        })
    })
})

// app.get('/products', (req, res) => {
//     if(!req.query.search) {
//         return res.send({
//             error : "you must provide search term"
//         })
//     }
//     res.send({
//         products : []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404',{
        title : '404',
        errorMessage : 'Help Article Not Found'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title : '404',
        errorMessage : 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}.`)
})