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
            title: "error"
         })
    }
    res.render('create');
})

module.exports = router;