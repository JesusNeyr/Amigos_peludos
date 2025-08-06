const ProductCategoriesService = require('../../services/productsCategoryService');

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Obtener productos de la categoría
    const products = await ProductCategoriesService.getProductsByCategoryId(categoryId);

    // Para cada producto, obtener sus categorías asociadas
    const productsWithCategories = await Promise.all(
      products.map(async (product) => {
        const categories = await ProductCategoriesService.getCategoriesByProductId(product.id);
        return {
          ...product,
          categories,
        };
      })
    );

    res.json(productsWithCategories);
  } catch (err) {
    console.error('Error al obtener productos con categorías:', err);
    res.status(500).json({ error: 'Error al obtener productos con categorías' });
  }
};

module.exports = {
  getProductsByCategory,
};

