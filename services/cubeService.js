const Cube = require('../models/cube');

function getAll(search) {
    return Cube.find({ }).lean();
};   

function getById(id) {
    return Cube.findById(id).lean();
};

async function createCube(cubeData, ownerId) {
    const cube = {
        name: cubeData.name,
        description: cubeData.description,
        imageUrl: cubeData.imageUrl,
        difficultyLevel: Number(cubeData.difficultyLevel),
        owner: ownerId
    };

    const missing = Object.entries(cube).filter(([k,v]) => !v);

    if(missing.length > 0) {
        throw new Error(missing.map(m => `${m[0]} is required!`).join('\n'));
    }

    const result = await Cube.create(cube);
    return result;
};

async function updateById(cubeData, cubeId){
    const cube = await Cube.findById(cubeId);

    const missing = Object.entries(cubeData).filter(([k, v]) => !v);
    if (missing.length > 0) {
        throw new Error(missing.map(([k, v]) => `${k} is required!`).join('\n'))
    }

    cube.name = cubeData.name;
    cube.imageUrl = cubeData.imageUrl;
    cube.description = cubeData.description;
    cube.difficultyLevel = cubeData.difficultyLevel

    await cube.save();
    return cube;
};

async function deleteById(cubeId) {
    return Cube.findByIdAndRemove(cubeId);
};

module.exports = {
    getAll,
    getById,
    createCube,
    updateById,
    deleteById,
}