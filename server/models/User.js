const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator').default;
const { hashPassword } = require('../helpers/bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name cannot be blank"]
  },
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
    unique: [true, "Email has been used"],
    validate: {
      validator: function (value) {
        const isValid = validator.isEmail(value);
        return isValid;
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"]
  }
});

userSchema.pre("save", function (next) {
  this.password = hashPassword(this.password);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;