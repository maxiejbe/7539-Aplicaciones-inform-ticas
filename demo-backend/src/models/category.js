import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  order: {
    type: Number
  }
})

const Category = mongoose.model('category', CategorySchema)
export default Category
