import mongoose from 'mongoose'

const paintingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    image: {
      fullSize: { type: String, required: true },
      thumbnail: { type: String, required: true },
    },
  },
  { versionKey: false, timestamps: true }
)

export const Painting = mongoose.model('paintings', paintingSchema)
