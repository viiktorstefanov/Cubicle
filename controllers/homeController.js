const { getAll } = require('../services/cubeService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const search = req.query || "";
    const cubes = await getAll(search);
    res.render('home', {
        cubes,
        search
    });
})

module.exports = router;