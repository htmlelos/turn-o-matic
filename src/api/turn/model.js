import mongoose, { Schema } from 'mongoose'

const turnSchema = new Schema({
  date: {
    type: String
  },
  customer: {
    type: String
  },
  professional: {
    type: String
  },
  category: {
    type: String
  },
  comments: {
    type: String
  }
}, {
  timestamps: true
})

turnSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      date: this.date,
      customer: this.customer,
      professional: this.professional,
      category: this.category,
      comments: this.comments,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Turn', turnSchema)

export const schema = model.schema
export default model
