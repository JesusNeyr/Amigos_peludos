const CategoriesService = require('../../services/categoriesService.js');

const getAll = async (req, res) => {
  try {
    const categories = await CategoriesService.findAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

const getOne = async (req, res) => {
  try {
    const category = await CategoriesService.findCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};
const getProductsByCategory = async (req, res) => {
  try {
    const products = await CategoriesService.getProductsByCategoryId(req.params.id);
    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos para esta categoría' });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos de la categoría' });
  }
};

const create = async (req, res) => {
  try {
    const newCategoryId = await CategoriesService.createNewCategory(req.body);
    res.status(201).json({ id: newCategoryId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

const update = async (req, res) => {
  try {
    const affectedRows = await CategoriesService.updateCategoryById(req.params.id, req.body);
    if (affectedRows === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ message: 'Categoría actualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};

const remove = async (req, res) => {
  try {
    const affectedRows = await CategoriesService.deleteCategoryById(req.params.id);
    if (affectedRows === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getProductsByCategory, 
};