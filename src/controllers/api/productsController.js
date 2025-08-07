const ProductService = require('../../services/productsService.js');
const ProductCategoryService = require('../../services/productsCategoryService.js');

const getAll = async (req, res) => {
  try {
    const products = await ProductService.findAllProducts();
    res.json(products);
  } catch (err) {
    console.error('ERROR AL OBTENER PRODUCTOS:', err);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

const getOne = async (req, res) => {
  try {
    const product = await ProductService.findProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

const create = async (req, res) => {
  try {
    const { categoryIds, ...productData } = req.body;

    const newProductId = await ProductService.createNewProduct(productData);

    if (Array.isArray(categoryIds)) {
      await ProductCategoryService.setProductCategories(newProductId, categoryIds);
    }
    const product = await ProductService.findProductById(newProductId);
    const categories = await ProductCategoryService.getCategoriesByProductId(newProductId);
    res.status(201).json({ id: newProductId });
  } catch (err) {
    console.error('Error en create product:', err);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

const update = async (req, res) => {
  try {
    const productId = req.params.id;
    const { categoryIds, ...productData } = req.body;

    const affectedRows = await ProductService.updateProductById(productId, productData);
    if (affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });

    if (Array.isArray(categoryIds)) {
      await ProductCategoryService.setProductCategories(productId, categoryIds);
    }

    res.json({ message: 'Producto actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};
const remove = async (req, res) => {
  try {
    const affectedRows = await ProductService.deleteProductById(req.params.id);
    if (affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
