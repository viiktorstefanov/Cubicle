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

module.exports = {
    getAll,
    getById
}