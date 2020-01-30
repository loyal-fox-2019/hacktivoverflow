const modelUser = require('../models/modelUser.js')
const generateToken = require('../helpers/generateToken.js')
const cocokPass = require("../helpers/cocokPass.js")

class ControlUser {
    static register(req, res) {
        modelUser.findOne({ email: req.body.email })
            .then(emailFound => {
                if (emailFound) {
                    res.status(400).json({ message: "email already registered" })
                } else {
                    return modelUser.create(req.body)
                }
            })
            .then(userRegistered => {
                let token = generateToken({ id: userRegistered._id })
                req.headers.token = token
                res.status(201).json({ userRegistered, token })
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server Error" })
            })
    }

    static login(req, res) {
        modelUser.findOne({ email: req.body.email })
            .then(userFound => {
                if (!userFound) {
                    res.status(400).json({ message: "User not registered" })
                } else {
                    const matchPass = cocokPass(req.body.password, userFound.password)
                    if (matchPass) {
                        let token = generateToken({ id: userFound._id })
                        req.headers.token = token
                        res.status(200).json({ userFound, token })
                    } else {
                        res.status(400).json({ message: "wrong password/email" })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal Server Error" })
            })
    }
}

module.exports = ControlUser