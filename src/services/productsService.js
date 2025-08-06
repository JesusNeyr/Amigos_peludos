const ProductModel = require('../models/productsModels.js');

const findAllProducts = () => ProductModel.getAllProducts();
const findProductById = (id) => ProductModel.getProductById(id);
const createNewProduct = (product) => ProductModel.createProduct(product);
const updateProductById = (id, product) => ProductModel.updateProduct(id, product);
const deleteProductById = (id) => ProductModel.deleteProduct(id);

module.exports = {
  findAllProducts,
  findProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
};
