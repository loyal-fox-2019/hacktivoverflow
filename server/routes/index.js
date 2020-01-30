const express = require('express');
const router = express.Router();
const kue = require("kue");
const queue = kue.createQueue();
const auth = require('./auth')
const users = require('./users')
const questions = require('./questions')
const tags = require('./tags')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello world')
});

router.use('/auth', auth)
router.use('/users', users)
router.use('/questions', questions)
router.use('/tags', tags)

router.use('/kue', kue.app)
// router.get('/create-kue', function (req, res) {  
//   for (let i = 1; i <= 20; i++) {
//     queue
//       .create("queue example", {
//         title: "This testing request",
//         data: i
//       })
//       .priority("high")
//       .save();
//   }
//   res.send('selesai')
// })

// router.get('/process-kue', function (req, res) {  
//   queue.process("queue example", function (job, done) {  
//     console.log(job, job.data.data)
//     done()
//   })
// })
module.exports = router;
