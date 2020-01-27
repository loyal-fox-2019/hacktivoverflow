const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: 'ecommerce-a0a68546cbdc.json',//bikin baru aja atau yg lama juga gapapa
      bucketName: 'ecommerce-upload'
    }
  })

  module.exports = upload