const path = require('path');

const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

const geocode = require('./ultis/geocode');
const forecast = require('./ultis/forecast');

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//register static file, must provide absolute path.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'roy'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about me',
    name: 'mead'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'this is help message.',
    title: 'help',
    name: 'mead'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'address must be provided.'
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  //req.query is an object.
  if (!req.query.search) {
    return res.send({
      error: 'you must provide a search term'
    });
  }
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'help article not found',
    name: 'mead'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'page not found',
    name: 'mead'
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}.`);
});