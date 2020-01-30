const modelUser = require('../models/modelUser.js')
const generateToken = require('../helpers/generateToken.js')
const cocokPass = require("../helpers/cocokPass.js")
const verifyTokenG = require("../helpers/verifyTokenG.js")

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
    static google(req, res) {
        const tokenGoogle = req.body.idtoken
        const payload = verifyTokenG(tokenGoogle)
        let username
        let email
        payload.then(data => {
            // console.log(data, "<<ini data")
            // console.log(data.name, "<<ini name")
            // console.log(data.email, "<<ini email")

            username = data.given_name


            email = data.email

            return modelUser.findOne({ email })
        })
            .then(found => {
                if (found) {
                    return found
                } else {
                    modelUser.create({
                        email: email,
                        username: username,
                        password: process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(user => {
                // console.log(user)
                let token = generateToken({ id: user._id })
                res.status(201).json({ user, token })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = ControlUser