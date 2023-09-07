const { createCube } = require('../services/cubeService');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../utils/errorParser');

const imageUrlRegEx = /^https?:\/\/.+/;

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', 
body('name')
.isLength( { min: 5 }).withMessage('Name must be at least 5 characters long !'),
body('description')
.isLength( { min: 10 } ).withMessage('Description must be at least 10 characters long !'),
body('imageUrl')
.custom((value, { req }) => {
    return imageUrlRegEx.test(value);
}).withMessage('ImageUrl must starts with http:// or https://'),
async (req, res) => {
    try {
        const { errors } = validationResult(req);

        if(errors.length > 0) {
            throw errors;
        }

        const result = await createCube(req.body, req.user._id);
        res.redirect('/details/' + result._id); 
    } catch(error) {
         res.render('create', {
             body: {
                 name: req.body.name,
                 description: req.body.description,
                 imageUrl: req.body.imageUrl,
             },
            error: parseError(error)
         })
    }
    
})

module.exports = router;