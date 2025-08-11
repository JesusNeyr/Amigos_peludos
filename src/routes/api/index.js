const express = require('express');
const router = express.Router();

const productsRoutes = require('../../routes/productsRoutes.js');
const usersRoutes = require('../../routes/usersRoutes.js');
const categoriesRoutes = require('../../routes/categoriesRoutes.js');
const favoriteRoutes = require('../../routes/favoriteRoutes');
const cartRoutes = require('../../routes/cartRoutes.js');
const categoryProductsRoutes = require('../../routes/categoryProductsRoutes');
// const orderRoutes= require('../../routes/orderRoutes.js')

router.use('/products', productsRoutes);
router.use('/users', usersRoutes);
router.use('/categories', categoriesRoutes);
router.use('/favorites', favoriteRoutes); // o podés usar '/favorites' si querés agrupar
router.use('/category-products',categoryProductsRoutes)
router.use('/cart', cartRoutes);
//router.use('/orders')

module.exports = router;
