
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const detailsController = require('../controllers/detailsController');
const createController = require('../controllers/createController');
const defaultController = require('../controllers/defaultController');


module.exports = (app) => {
    app.use(homeController);
    app.use('/about', aboutController);
    app.use('/create', createController);
    app.use('/details', detailsController);

    app.all('*', defaultController);
    
}