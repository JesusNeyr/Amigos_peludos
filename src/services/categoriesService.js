const CategoriesModel = require('../models/categoriesModel');

const findAllCategories = () => CategoriesModel.getAllCategories();
const findCategoryById = (id) => CategoriesModel.getCategoryById(id);
const createNewCategory = (category) => CategoriesModel.createCategory(category);
const updateCategoryById = (id, category) => CategoriesModel.updateCategory(id, category);
const deleteCategoryById = (id) => CategoriesModel.deleteCategory(id);
const getProductsByCategoryId = (id) => CategoriesModel.getProductsByCategoryId(id);

module.exports = {
  findAllCategories,
  findCategoryById,
  createNewCategory,
  updateCategoryById,
  deleteCategoryById,
  getProductsByCategoryId
};
