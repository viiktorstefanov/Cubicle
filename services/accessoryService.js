const Accessory = require('../models/accessory');
const Cube = require('../models/cube');

async function getAllAccessories () {
    return Accessory.find({}).lean();
};

async function createAccessories(name, description, imageUrl) {
    return Accessory.create({
        name,
        description,
        imageUrl
    });
};

async function addAccessory(cubeId, accessoryId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();
};

module.exports = {
    getAllAccessories,
    createAccessories,
    addAccessory
}