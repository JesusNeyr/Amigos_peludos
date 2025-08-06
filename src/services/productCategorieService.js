const ProductCategoriesModel = require('../models/productCategorieModel');

const assignCategoriesToProduct = (productId, categoryIds) => {
  return ProductCategoriesModel.assignCategoriesToProduct(productId, categoryIds);
};

const removeCategoriesFromProduct = (productId) => {
  return ProductCategoriesModel.removeCategoriesFromProduct(productId);
};

const getCategoriesByProductId = (productId) => {
  return ProductCategoriesModel.getCategoriesByProductId(productId);
};

const getProductsByCategoryId = (categoryId) => {
  return ProductCategoriesModel.getProductsByCategoryId(categoryId);
};

module.exports = {
  assignCategoriesToProduct,
  removeCategoriesFromProduct,
  getCategoriesByProductId,
  getProductsByCategoryId,
};
