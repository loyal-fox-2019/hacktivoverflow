const router = require('express').Router();

router.get('/', (req,res,next)=>{
    res.status(200).json(req.userLogged._id)
})

module.exports = router