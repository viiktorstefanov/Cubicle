const express = require('express');
const port = 3000;
const hbs = require('express-handlebars');
hbs.create({
    extname: '.hbs'
});

const app = express();
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true}));
app.use('/static', express.static('static'));

app.listen(port);
