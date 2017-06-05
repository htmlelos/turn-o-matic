import mongoose, { Schema } from 'mongoose'

const professionalSchema = new Schema({
  name: {
    type: String
  },
  categories: {
    type: String
  }
}, {
  timestamps: true
})

professionalSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      categories: this.categories,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Professional', professionalSchema)

export const schema = model.schema
export default model
