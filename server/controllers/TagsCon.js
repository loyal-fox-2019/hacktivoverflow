const User = require('../models/user')
const Question = require('../models/question')

class TagsCon {
    static add (req,res,next){
        if(req.body.tags.length > 0){
            const str = req.body.tags
            const arr = str.split(',')
            req.body.tags = arr
        }

        User.updateOne({
            _id: req.user._id
        },{
            tags: req.body.tags
        })
            .then(respone=>{
                res.status(200).json(respone)
            })
            .catch(next)
    }
    static searchTag(req,res,next){
        Question.find()
            .then(data =>{
                if(req.body.tags.length > 0){
                let result = []
                let arrTag = req.body.tags.split(',')
                data.forEach(element => {
                    let flag = false
                    arrTag.forEach(tag => {
                        let temp = element.tags.filter(item => item == tag)
                        if(temp.length > 0){
                            flag = true
                        }
                    });
                    if(flag){
                        result.push(element)
                    }
                });
                res.status(200).json(result)
                }else{
                    res.status(200).json(data)
                }
            })
            .catch(next)        
    }
}

module.exports = TagsCon