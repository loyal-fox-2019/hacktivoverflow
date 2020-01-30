const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const tagSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Must insert tag name'],
      unique: [true, 'This tag name is already existed']
   }
})

tagSchema.plugin(timestamp)

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
