const { getById } = require('../services/cubesService');

const router = require('express').Router();

router.get('/:id', (req, res) => {
    const cubeId = req.params.id;
    const cube = getById(cubeId);
    if(cube) {
        res.render('details', {
            cube
        });
    } else {
        res.render('404');
    }
    
})

module.exports = router;