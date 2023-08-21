const { Schema, model, Types } = require('mongoose');

const cubeSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    imageUrl: { type: String, required: true},
    difficultyLevel: { type: Number, required: true, min: 1, max: 6 },
    accessories: { type: [Types.ObjectId], default: [], ref: 'Accessory'}
});

const cube = model('Cube', cubeSchema);

module.exports = cube;