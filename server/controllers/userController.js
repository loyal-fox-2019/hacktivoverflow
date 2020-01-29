const User = require("../models/user.js");
const Question = require("../models/question.js");
const _ = require("underscore");
const comparePassword = require("../helpers/bcrypt").comparePassword;
const generateToken = require("../helpers/jwt").generateToken;

class UserController
{
    static registerUser(req, res, next)
    {
        const data = _.pick(req.body,'username','password','email');
        data.login_type = "standard";
        User.create(data)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            console.log(err);            
            res.status(400).json({
                msg: err.message
            });
        })
    }

    static loginUser(req, res, next)
    {
        const data = _.pick(req.body,'email','password');
        User.findOne({
            email: data.email
        })
        .exec()
        .then((user) => {
            if(user)
            {
                if(comparePassword(data.password,user.password))
                {
                    res.status(200).json({
                        token: generateToken({
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }),
                        username: user.username,
                        email: user.email
                    });
                }
                else
                {
                    res.status(400).json({
                        msg: "Wrong username/password"
                    });
                }
            }
            else
            {
                res.status(404).json({
                    msg: "Account does not exist"
                });
            }
        })
    }

    static getMyQuestions(req, res, next)
    {
        Question.find({
            user: req.userInfo.id
        })
        .exec()
        .catch((questions) => {
            res.status(200).json(questions)
        })
        .then((err) => {

            console.log(err);
            
        })
    }
}

module.exports = UserController;