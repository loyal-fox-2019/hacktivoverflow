const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hashPassword = require('../helpers/hashPassword');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email required'],
        validate: {
          validator: function (value) {
            return this.model("User")
              .findOne({
                email: value
              })
              .then(email => {
                if (email) {
                  return false;
                }
              });
          },
          message: props => `Email ${props.value} already taken`
        }
      },
    name: {
        type: String,
        require: [true, 'Name required']
    },
    username: {
        type: String,
        require: [true, 'Username required']
    },
    password: {
        type: String,
        require: [true, 'Password required'],
        minlength: [6, 'Password must be more than 5 length']
    },
    isConfirm: {
        type: Boolean,
        required: [true, 'isConfirm required']
    }
});

userSchema.pre('save', function (next) {
    hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema);
module.exports = User;