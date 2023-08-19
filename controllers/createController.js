const { createCube } = require('../services/cubeService');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', async (req, res) => {
    try {
        const result = await createCube(req.body);
        res.redirect('/details/' + result._id); 
    } catch(err) {
         res.render('create', {
            error: err.message.split('\n')
         })
    }
    
})

module.exports = router;