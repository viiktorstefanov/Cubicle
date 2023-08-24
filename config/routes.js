
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const defaultController = require('../controllers/defaultController');
const accessoriesController = require('../controllers/accessoriesController');
const authorizationController = require('../controllers/authorizationController');
const cubeController = require('../controllers/cubeController');
const { hasUser, hasRole} = require('../middlewares/guards.js');


module.exports = (app) => {
    app.use(homeController);
    app.use('/about', aboutController);
    app.use('/create', hasUser(), createController);
    app.use('/details', detailsController);
    app.use('/accessories',hasRole('admin'), accessoriesController);
    app.use('/auth', authorizationController);
    app.use('/cube', cubeController);

    app.all('*', defaultController);
}