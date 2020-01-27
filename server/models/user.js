const mongoose = require('mongoose');
const bCrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [30, "Name max 30 characters"],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already registered'],
        validate: {
            validator: function (email) {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email);
            }, message: "Email is not valid"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password min 8 characters"],
        validate: {
            validator: function (password) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                return passwordRegex.test(password);
            }, message: "Password must contain at least 1 number, letters, symbol, Uppercase and lowercase"
        }
    },
    status: {
        type: String,
        required: [true, 'Status is required']
    },
    confirmationCode: {
        type: String
    }
}, {
    timestamps:
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
});

userSchema.pre('save', function (next) {
    let salt = bCrypt.genSaltSync(10);
    let hash = bCrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;