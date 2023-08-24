const router = require('express').Router();
const { register, login } = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        if(req.body.username.trim() == "" || req.body.password.trim() == "") {
            throw new Error('All fields are required!')
        }
        if(req.body.password.trim() != req.body.repeatPassword.trim()) {
            throw new Error(`Passwords do not match`)
        }
        const result = await register(req.body.username.trim(), req.body.password.trim());
        const token = req.signJwt(result);
        
        res.cookie('jwt', token);
        res.redirect('/');

    } catch(err) {
        res.render('register', {
            error: err.message.split('\n')
        })
    }

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        if(req.body.username.trim() == "" || req.body.password == "") {
            throw new Error('All fields are required!');
        }

        const result = await login(req.body.username.trim(), req.body.password.trim());
        const token = req.signJwt(result);

        res.cookie('jwt', token);
        res.redirect('/');

    } catch(err) {
        res.render('login', {
            error: err.message.split('\n')
        });
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
});

module.exports = router;