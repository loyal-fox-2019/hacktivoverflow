const ObjectId = require('mongoose').Types.ObjectId;
const questionModel = require('../models/Question');

module.exports = (req, res, next) => {
    questionModel
        .findOne({
            _id: ObjectId(req.params.id),
            owner: ObjectId(req.userLogin._id)
        }).populate('owner')
        .then((question) => {
            if (!question) {
                let err = new Error('Error message');
                err.statusCode = 401;
                err.message = 'You are not authorized accessing this data';
                throw err;
            } else {
                next();
            }
        }).catch((err) => {
            res.status(err.statusCode || 500).json({
                message: err.message || 'Internal Server Error'
            });
        });
};