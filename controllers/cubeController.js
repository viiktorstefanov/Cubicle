const { getById, updateById, deleteById } = require("../services/cubeService");
const router = require('express').Router();

router.get('/edit/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getById(cubeId);
    res.render('edit', {
        cube
    });
});

router.post('/edit/:id', async (req, res) => {
    try {
        const cubeId = req.params.id;
        const result = await updateById(req.body,cubeId);
        res.redirect('/details/' + result._id);
    } catch(err) {
        req.body._id = req.params.id;
        res.render('edit', {
            cube: req.body,
            error: err.message.split('\n')
        })
    }
});

router.get('/delete/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getById(cubeId);
    res.render('delete', {
        cube
    });
});

router.post('/delete/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getById(cubeId);

    try {
        await deleteById(cubeId);
        res.redirect('/');
    } catch (err) {
        req.body._id = cubeId;
        res.render('edit', {
            cube: req.body,
            error: err.message.split('\n')
        })
    }
    res.render('delete', { cube });
});
 
module.exports = router;