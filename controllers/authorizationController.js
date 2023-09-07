const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { register, login } = require('../services/authService');
const { parseError } = require('../utils/errorParser');


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register',
body('username')
.trim()
.isLength( { min: 6 }).withMessage('Username must be at least 6 characters long !'),
body('password')
.trim()
.isLength( { min: 8 } ).withMessage('Password must be at least 8 charecters long !'),
body('repeatPassword')
.trim()
.custom(async (value, { req }) => {
    if(value != req.body.password) {
        throw new Error('Passwords do not match !');
    }
})
.withMessage('Passwords do not match !'),
async (req, res) => {
    try {
        const { errors } = validationResult(req);
        if(errors.length > 0 ) {
            throw errors;
        } 
        const result = await register(req.body.username, req.body.password);
        const token = req.signJwt(result);
        
        res.cookie('jwt', token);
        res.redirect('/');

    } catch(error) {
        // const fields = error.map(e => [e.path, e.path]);
        res.render('register', {
            body: {
                username: req.body.username
            },  
            error: parseError(error),
            // fields
        })
    }

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', 
body('username')
.trim()
.notEmpty().withMessage('Username is required !'),
body('password')
.trim()
.notEmpty().withMessage('Password is required !'),
async (req, res) => {
    try {
        const { errors } = validationResult(req);
        if(errors.length > 0 ) {
            throw errors;
        } 
        const result = await login(req.body.username, req.body.password);
        const token = req.signJwt(result);

        res.cookie('jwt', token);
        res.redirect('/');

    } catch(error) {
        // const fields = Object.fromEntries(error.map(e => [e.path, e.path]));
        res.render('login', {
            body: {
                username: req.body.username
            },  
            error: parseError(error),
            // fields
        })
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

module.exports = router;