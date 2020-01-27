const bcryptjs = require('bcryptjs')
const { Schema, models, model } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email format',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Passowrd min length is 6 characters'],
  },
  platform: {
    type: String,
    required: [true, 'User platform is required'],
    default: 'normal',
    enum: ['normal', 'google', 'github', 'twitter'],
    validate: {
      validator: function(platform) {
        return models.User.findOne({ email: this.email, platform }).then(
          user => {
            if (user) return false
            return true
          },
        )
      },
      msg: 'Email already registered',
    },
  },
})

userSchema.post('validate', function(user) {
  user.password = bcryptjs.hashSync(user.password, 10)
})

const user = model('User', userSchema)

module.exports = user
