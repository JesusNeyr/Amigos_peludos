const ProductCategoriesService = require('../../services/productCategorieService');

// Obtener categorías de un producto
const getCategories = async (req, res) => {
  try {
    const categories = await ProductCategoriesService.getCategoriesByProductId(req.params.productId);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener categorías del producto' });
  }
};

// Actualizar categorías de un producto (remover las viejas y asignar nuevas)
const updateCategories = async (req, res) => {
  try {
    const productId = req.params.productId;
    const categoryIds = req.body.categoryIds;  // Array con ids de categorías

    // Primero eliminar las categorías antiguas
    await ProductCategoriesService.removeCategoriesFromProduct(productId);
    // Asignar las nuevas categorías
    await ProductCategoriesService.assignCategoriesToProduct(productId, categoryIds);

    res.json({ message: 'Categorías actualizadas correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar categorías del producto' });
  }
};

module.exports = {
  getCategories,
  updateCategories,
};
