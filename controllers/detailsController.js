const { getAllAccessories } = require('../services/accessoryService');
const { getById } = require('../services/cubeService');

const router = require('express').Router();

router.get('/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getById(cubeId);
    const accessories = await getAllAccessories();
    
    let haveAcessories;
    let isOwner;
    
    if(cube.accessories) {
        haveAcessories = accessories.filter(x => cube.accessories.some(a => a._id.toString() == x._id.toString()));
    } 
    
    if(cube) {
        if(req.user){
            isOwner = req.user._id == cube.owner
        }
        res.render('details', {
            cube,
            haveAcessories,
            isOwner
        });
    } else {
        res.render('404');
    }
    
})

module.exports = router;