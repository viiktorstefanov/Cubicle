const { getAll } = require('../services/cubeService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    let { search, from, to } = req.query;
    // const search = req.query || "";
    const cubes = await getAll(search, from, to);
    res.render('home', {
        cubes,
        search,
        from,
        to
    });
})

module.exports = router;