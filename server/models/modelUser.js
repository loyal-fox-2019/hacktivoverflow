const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require("../helpers/hashPassword.js")

const userSchema = new Schema({
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "please input valid email"],
        validate: {
            validator: function () {
                return new Promise((res, rej) => {
                    User.findOne({ email: this.email })
                        .then(data => {
                            if (data) {
                                res(false)
                            } else {
                                res(true)
                            }
                        })
                        .catch(err => {
                            res(false)
                        })
                })
            }
        }, message: "Email already taken"
    },
    password: {
        type: String,
        required: [true, "please input password"]
    },
    username: {
        type: String,
        required: [true, "please input username"]
    }
})

userSchema.pre("save", function () {
    let hashed = hashPassword(this.password)
    this.password = hashed
})

const User = mongoose.model("User", userSchema)

module.exports = User