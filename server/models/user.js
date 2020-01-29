const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'username is required']
  },
  profile_pic: {
    type: String
  },
  tags: [{
    type: String
  }],
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'],
    validate: {
      validator: function(value) {
        return User.findOne({ email: value }).then(user => {
          if (user) return false;
        });
      },
      message: props => 'Email already registered'
    }
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [6, 'password length min 6']
  }
})

userSchema.pre('save', function(next) {
  if(this.profile_pic == 'null') {
    this.profile_pic = 'https://image.flaticon.com/icons/svg/2427/2427293.svg'
  }
  this.password = hash(this.password)
  next()
})
const User = mongoose.model('User', userSchema)

module.exports = User
