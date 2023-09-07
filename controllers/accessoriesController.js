const { createAccessories, getAllAccessories, addAccessory } = require('../services/accessoryService');
const { getById } = require('../services/cubeService');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../utils/errorParser');

const imageUrlRegEx = /^https?:\/\/.+/;

const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('accessory');
});

router.post('/create', 
body('name')
.trim()
.isLength( { min: 5 }).withMessage('Name must be 5 characters at least long !').bail()
.isAlphanumeric().withMessage('Name must include only digits and english letters !'),
body('description')
.trim()
.isLength( { min: 10 } ).withMessage('Description must be at least 10 symbols !'),
body('imageUrl')
.trim()
.notEmpty().withMessage('imageUrl is required!').bail()
.custom((value, { req }) => {
    return urlRegex.test(value);
}).withMessage('ImageUrl must starts with http:// or https:// !')
,
async (req, res) => {
    const { errors } = validationResult(req);
    try {
        if(errors.length > 0) {
            throw errors;
        }
        await createAccessories(req.body.name,req.body.description,req.body.imageUrl);
        res.redirect('/');
    } catch(error) {
        res.render('accessory', {
            error: parseError(error),
            body: {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl
            }
        })
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