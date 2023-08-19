const { getById } = require('../services/cubeService');

const router = require('express').Router();

router.get('/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getById(cubeId);
    if(cube) {
        res.render('details', {
            cube
        });
    } else {
        res.render('404');
    }
    
})

module.exports = router;