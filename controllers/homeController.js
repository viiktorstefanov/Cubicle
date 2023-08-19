const { getAll } = require('../services/cubeService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const search = req.query.search || '';
    const fromDifficult = Number(req.query.from) || 1;
    const toDifficult = Number(req.query.to) || 6;
    
    const cubes = await getAll(search, fromDifficult, toDifficult);
    res.render('home', {
        cubes,
        search,
        fromDifficult,
        toDifficult
    });
})

module.exports = router;