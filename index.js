const express = require('express');
const port = 3000;
const hbs = require('express-handlebars');
const handlebars = hbs.create({
    extname: '.hbs'
});

const homeController = require('./controllers/homeController');
const aboutController = require('./controllers/aboutController');
const detailsController = require('./controllers/detailsController');
const createController = require('./controllers/createController');
const defaultController = require('./controllers/defaultController');

const app = express();
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.use(homeController);
app.use('/about', aboutController);
app.use('/create', createController);
app.use('/details/:id', detailsController);
app.all('*', defaultController);

app.listen(port);
