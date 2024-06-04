import mongoose from 'mongoose'

const LevelSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true
  },
  topics: {
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { minimize: false });

export default mongoose.models.Levels || mongoose.model('Levels', LevelSchema)