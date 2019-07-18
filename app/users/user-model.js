const mongoose = require('mongoose');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: [/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'],
    },
   password: {
       type: String,
       required: [true, 'password is required'],
       minlength: [6, 'password should contain at least 6 characters'],
    },
    username: {
		type: String,
		required: [true, 'user name is required'],
		minlength: [4, 'user name should contain at least 4 characters'],
    },
});

// validations
// TODO use mongoose schema validation

// hash password before saving the user
userSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        user.password = await bcrypt.hash(user.password, 10);
        return next();
    } catch (e) {
        return next(e);
    }
});

userSchema.methods.generateToken = function () {
    //TODO
};

userSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

module.exports = mongoose.model('User', userSchema);