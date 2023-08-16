const { getAll } = require('../services/cubesService');

const router = require('express').Router();

router.get('/', (req, res) => {
    const search = req.query.search || '';
    const fromDifficult = Number(req.query.from) || 1;
    const toDifficult = Number(req.query.to) || 6;
    
    const cubes = getAll(search, fromDifficult, toDifficult);
    res.render('home', {
        cubes,
        search,
        fromDifficult,
        toDifficult
    });
})

module.exports = router;