
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const defaultController = require('../controllers/defaultController');
const accessoriesController = require('../controllers/accessoriesController');


module.exports = (app) => {
    app.use(homeController);
    app.use('/about', aboutController);
    app.use('/create', createController);
    app.use('/details', detailsController);
    app.use('/accessories', accessoriesController);

    app.all('*', defaultController);
    
}