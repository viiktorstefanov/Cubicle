const bcrypt = require('bcrypt');
const User = require('../models/user');

async function register(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Username is taken!')
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        hashedPassword
    });

    return {
        _id: user._id,
        username: user.username,
        roles: user.roles
    }
};

async function login(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!existing) {
        throw new Error('Incorrect username or password')
    }

    const match = await bcrypt.compare(password, existing.hashedPassword);

    if(!match) {
        throw new Error(`Passwords don't match`);
    }

    return {
        _id: existing._id,
        username: existing.username,
        roles: existing.roles
    }

};


module.exports = {
    login,
    register,
}