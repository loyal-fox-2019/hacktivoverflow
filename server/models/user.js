const { model, Schema } = require("mongoose");
const { encryptPassword } = require("../helpers/bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    validate: {
      validator: value => {
        const Model = model("User");
        return Model.findOne({ username: value }).then(user => {
          if (user) return false;
          return true;
        });
      },
      msg: "Username Already Registered"
    }
  },
  email: {
    type: String,
    required: true,
    validate: [
      {
        validator: function(value) {
          var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        },
        msg: "Email Format Invalid"
      },
      {
        validator: value => {
          const Model = model("User");
          return Model.findOne({ email: value }).then(user => {
            if (user) return false;
            return true;
          });
        },
        msg: "Email Already Registered"
      }
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Minimum Password Length is : 6"]
  }
});

userSchema.pre("save", function(next) {
  this.password = encryptPassword(this.password);
  next();
});

const User = model("User", userSchema);
module.exports = User;
