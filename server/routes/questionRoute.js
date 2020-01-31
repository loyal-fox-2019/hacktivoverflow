const Question = require('../controllers/questionController');
const router = require('express').Router();
const unggah = require('unggah');
const auth = require('../middlewares/authorizer');

const storage = unggah.gcs({
    keyFilename: '/home/jpetra/Documents/Phase\ 2/jovipetra-bd211966abec.json',
    bucketName: 'miniwp-images-jovi',
    rename: (req, file) => {
      return `${Date.now()}-${file.originalname}`  // this is the default
    }
})

const upload = unggah({
    limits: {
      fileSize: 1e6 // in bytes
    },
    storage: storage
})

router.get('/', Question.findAll)
router.post('/', upload.single('file') , Question.create)
router.get('/:_id', Question.findOne)
router.put('/:_id', upload.single('file'), Question.edit)
router.delete('/:_id', Question.delete)
router.post('/upvote/:_id', Question.upvote)
router.post('/downvote/:_id', Question.downvote)

module.exports = router