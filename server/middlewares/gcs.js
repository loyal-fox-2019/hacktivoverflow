const unggah = require('unggah')

const storage = unggah.gcs({
  keyFilename: './keyfile-gcs.json',
  bucketName: 'ninefox-data',
  rename: (req, file) => {
    return `${Date.now()}-${file.originalname}`  // this is the default
  }
})

const upload = unggah({
  limits: {
    fileSize: 1e6 // in bytes
  },
  storage: storage // storage configuration for google cloud storage or S3
})
  module.exports = upload