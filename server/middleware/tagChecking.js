const Tag = require('../model/Tag')

module.exports = (req,res,next) =>{
    console.log(`
            TAG CHECKING IS RUNNING
            =======================
    `);
    console.log(`TCL: req.body    `, req.body    )

    req.createTagArray = []
    req.updateTagArray = []

    Tag.find({
        name : req.body.name
    })
    .then(result=>{
        console.log(`TCL: result`, result)

        req.body.name.forEach(element => {
            if(result.indexOf(element) === -1)
                req.createTagArray.push(element)
            else
                req.updateTagArray.push(element)
        });

        console.log(`TCL: req.createTagArray`, req.createTagArray)
        console.log(`TCL: req.updateTagArray`, req.updateTagArray)


        


    })
    .catch(err=>{
        next(err)
    })



}