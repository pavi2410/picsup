import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String
  },
  ownerid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
})

export const Images = new mongoose.model('Image', imageSchema);