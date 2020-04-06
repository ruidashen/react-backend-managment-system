
const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
  categoryId: {type: String, required: true}, 
  pCategoryId: {type: String, required: true}, 
  name: {type: String, required: true}, 
  price: {type: Number, required: true}, 
  desc: {type: String},
  status: {type: Number, default: 1}, 
  imgs: {type: Array, default: []}, 
  detail: {type: String}
})


// 3. 定义Model(与集合对应, 可以操作集合)
const ProductModel = mongoose.model('products', productSchema)

// 4. 向外暴露Model
module.exports = ProductModel