const { Schema, model } = require('mongoose');

cubeSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    imageUrl: { type: String, required: true},
    difficultyLevel: { type: Number, required: true, min: 1, max: 6 }
});

const cube = model('cube', cubeSchema);

module.exports = cube;