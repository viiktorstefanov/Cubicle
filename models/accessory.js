const { Schema, model, Types: { ObjectId } } = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true , minlength: [5, 'imageUrl must be at least 5 characters long'] },
    cubes: { type: [ObjectId], default: [], ref: 'Cube' }

});
const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;