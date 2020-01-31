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
        .populate("user","username")
        .exec()
        .then((questions) => {
            res.status(200).json(questions)
        })
        .catch((err) => {

            console.log(err);
            
        })
    }

    static getUserTags(req, res, next)
    {
        User.findById(req.userInfo.id)
        .exec()        
        .then((user) => {
            res.status(201).json({
                tags: user.watched_tags
            });
        })
        .catch((err) => {
            console.log(err);            
        });
    }

    static updateUserTags(req, res, next)
    {
        const data = _.pick(req.body,'watched_tags');
        User.findById(req.userInfo.id)
        .exec()
        .then((user) => {
            if(user)
            {
                for(let key in user)
                {
                    if(data.hasOwnProperty(key))
                    {
                        user[key] = data[key];
                    }
                }

                return user.save();
            }
            else
            {
                res.status(404).json({
                    msg: "User not found."
                });
            }
        })
        .then(() => {
            res.status(201).json({
                msg: "Update success."
            });
        })
        .catch((err) => {
            console.log(err);            
        });
    }
}

module.exports = UserController;