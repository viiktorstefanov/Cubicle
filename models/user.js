const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true , minlength: 3 },
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