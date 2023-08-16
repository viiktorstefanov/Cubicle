const fs = require('fs');

const filename = './config/database.json';
const data = JSON.parse(fs.readFileSync(filename));

async function persist() {
    return new Promise((res, rej) => {
        fs.writeFile(filename, JSON.stringify(data), (err) => {
            if (err == null) {
                res();
            } else {
                rej(err);
            }
        })
    })
}

function getAll() {
    return data;
}

function getById(id) {
    return data.find(x => x.id == id);
}

async function createCube(cubeData) {
    const cube = {
        id: createId(),
        name: cubeData.name,
        description: cubeData.description,
        imageUrl: cubeData.imageUrl,
        difficultyLevel: Number(cubeData.difficultyLevel)
    };

    const missing = Object.entries(cube).filter(([k,v]) => !v);

    if(missing.length > 0) {
        throw new Error(missing.map(m => `${m[0]} is required!`).join('\n'));
    }

    data.push(cube);
    await persist();
    return cube;
};

function createId() {
    return ('000000' +  (Math.random() * 999999 | 0).toString(16)).slice(-6);
}

module.exports = {
    getAll,
    getById,
    createCube
}