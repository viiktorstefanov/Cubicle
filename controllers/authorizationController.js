const jwt = require('jsonwebtoken');
const router = require('express').Router();

const jwtSecret = 'mostDangerousPasswordSince1995';

router.get('/obtain', (req, res) => {
    const payload = {
        username: '',
        roles: ['user']
    };
    const token = jwt.sign(payload, jwtSecret);
    res.cookie('jwt', token);
    res.send('hello gey')
});

router.get('/validate', (req, res) => {
    const token = req.cookies.jwt;
    if(token) {
        const data = jwt.verify(token, jwtSecret);
        res.json(data);
    } else {
        res.send('no token broski')
    }
});

module.exports = router;