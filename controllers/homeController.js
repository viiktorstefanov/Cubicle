const { getAll } = require('../services/cubesService');

const router = require('express').Router();

router.get('/', (req, res) => {
    const cubes = getAll();
    res.render('home', {
        cubes
    });
})

module.exports = router;