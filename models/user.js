const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, minlength: [6, 'Username must be at least 6 characters long !'] , required: true , unique: true },
    hashedPassword: { type: String, required: true },
    roles: { type: [{ type: String, enum: ['user', 'admin'] }], default: ['user'] }
    
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('user', userSchema);

module.exports = User;