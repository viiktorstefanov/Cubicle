const { createAccessories, getAllAccessories, addAccessory } = require('../services/accessoryService');
const { getById } = require('../services/cubeService');

const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('accessory');
});

router.post('/create', async (req, res) => {
    try {
        await createAccessories(req.body.name,req.body.description,req.body.imageUrl);
        res.redirect('/');
    } catch(err) {
        res.render('accessory')
    }
});

router.get('/attach/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getById(cubeId);
    const accessories = await getAllAccessories();

    let nonExisting;

    if(cube.accessories) {
        nonExisting = accessories.filter(a => cube.accessories.every(x => x._id.toString() != a._id.toString()));
    } else {
        nonExisting = accessories;
    }

    res.render('attachAccessory', {
        cube,
        nonExisting

    });
});

router.post('/attach/:id', async (req, res) => {
    const cubeId = req.params.id;
    await addAccessory(cubeId, req.body.accessory);
    res.redirect('/details/' + cubeId);
});

module.exports = router;