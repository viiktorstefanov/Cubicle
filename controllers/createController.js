const { createCube } = require('../services/cubesService');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', async (req, res) => {
    try {
        const result = await createCube(req.body);
        res.redirect('/details/' + result.id); 
    } catch(err) {
         res.render('create', {
            error: err.message.split('\n')
         })
    }
    
})

module.exports = router;