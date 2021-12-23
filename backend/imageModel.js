const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String
  },
  ownerid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
})

exports.Images = new mongoose.model('Image', imageSchema);