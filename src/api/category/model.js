import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String
  }
}, {
  timestamps: true
})

categorySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Category', categorySchema)

export const schema = model.schema
export default model
