const express = require('express');
const cors = require('cors');
const logger = require('./src/middleware/loggerMiddleware.js');
const errorHandler = require('./src/middleware/errorMiddlewareHandler.js');
const productCategorieRoutes = require('./src/routes/productCategorieRoutes.js');
const categoryProductsRoutes = require('./src/routes/categoryProductsRoutes');
const userPaymentMethodRoutes = require('./src/routes/userPaymentMethodRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(logger);

// Rutas
const apiRoutes = require('./src/routes/api');
app.use('/api', apiRoutes);
app.use('/api/products', productCategorieRoutes);
app.use('/api/categories', categoryProductsRoutes);
app.use('/api/user-payment-methods', userPaymentMethodRoutes);
app.use('/api/orders', orderRoutes);
// 👉 Este SIEMPRE debe ir al final de todas las rutas
app.use(errorHandler);

module.exports = app;
