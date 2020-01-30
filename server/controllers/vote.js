const questionModel = require('../models/Question');
const commentModel = require('../models/Comment');

class Vote {
    static processVote(req, res, next) {
        console.log(req.body, req.userLogin);
        
        // Post.findByIdAndUpdate(req.params.id, {
        //     $addToSet: { likes: req.decoded.id },
        //     $pull: {dislikes: req.decoded.id}
        // }, { new: true }).populate('user', '-password')
    }
}

module.exports = Vote;
