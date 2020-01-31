const Tag = require('../models/Tag');

class TagController {

    static create(req, res, next){
        Tag
            .insertMany([
                { name: "HTML" },
                { name: "JS" },
                { name: "Vue" },
                { name: "PHP" },
                { name: "React" },
                { name: "Codeigneter" },
                { name: "Express.js" },
                { name: "Node.js" },
                { name: "Angular" },
            ])
            .then(tags => {
                res.status(201).json(tags)
            })
            .catch(next)
    }

    static getAll(req, res, next){
        Tag
            .find()
            .then(tags => {
                res.status(200).json(tags)
            })
            .catch(next)
    }

    static get(req, res, next){
        Tag
            .findOne({
                _id: req.params.id
            })
            .then(tag => {
                res.status(200).json(tag)
            })
            .catch(next)
    }

}
module.exports = TagController