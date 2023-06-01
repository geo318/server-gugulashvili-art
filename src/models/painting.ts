import mongoose from 'mongoose'
const { Schema } = mongoose

const paintingSchema = new mongoose.Schema(
  {
    name: Schema.Types.String,
    size: Schema.Types.String,
    description: Schema.Types.String,
    year: Schema.Types.Number,
    image: {
      fullSize: Schema.Types.String,
      thumbnail: Schema.Types.String,
    },
  },
  { versionKey: false, timestamps: true }
)

export const Painting = mongoose.model('painting', paintingSchema)
