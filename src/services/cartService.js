const db = require('../config/db/db');
const emailService = require('../services/emailService');

const createCartIfNotExist = async (userId) => {
  const [cartRows] = await db.query('SELECT id FROM carts WHERE user_id = ?', [userId]);
  if (cartRows.length) return cartRows[0].id;

  const [result] = await db.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
  return result.insertId;
};

const getCart = async (userId) => {
  const cartId = await createCartIfNotExist(userId);

  const [rows] = await db.query(`
    SELECT ci.product_id, p.name, p.price, p.image_url, ci.quantity
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = ?
  `, [cartId]);

  return rows;
};

const addToCart = async (userId, productId, quantity) => {
  const cartId = await createCartIfNotExist(userId);

  const [existing] = await db.query(`
    SELECT * FROM cart_items
    WHERE cart_id = ? AND product_id = ?
  `, [cartId, productId]);

  if (existing.length > 0) {
    await db.query(`
      UPDATE cart_items SET quantity = quantity + ?
      WHERE cart_id = ? AND product_id = ?
    `, [quantity, cartId, productId]);
  } else {
    await db.query(`
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES (?, ?, ?)
    `, [cartId, productId, quantity]);
  }
};

const updateQuantity = async (userId, productId, quantity) => {
  const cartId = await createCartIfNotExist(userId);

  const [result] = await db.query(`
    UPDATE cart_items SET quantity = ?
    WHERE cart_id = ? AND product_id = ?
  `, [quantity, cartId, productId]);

  return result.affectedRows;
};

const removeFromCart = async (userId, productId) => {
  const cartId = await createCartIfNotExist(userId);

  const [result] = await db.query(`
    DELETE FROM cart_items
    WHERE cart_id = ? AND product_id = ?
  `, [cartId, productId]);

  return result.affectedRows;
};

const updateCartItem = async (userId, productId, quantity) => {
  const cartId = await createCartIfNotExist(userId);

  const [result] = await db.query(`
    UPDATE cart_items SET quantity = ?
    WHERE cart_id = ? AND product_id = ?
  `, [quantity, cartId, productId]);

  if (result.affectedRows === 0) {
    throw new Error('El producto no se encuentra en el carrito');
  }

  return { message: 'Cantidad actualizada' };
};

const removeCartItem = async (userId, productId) => {
  const cartId = await createCartIfNotExist(userId);

  const [result] = await db.query(`
    DELETE FROM cart_items
    WHERE cart_id = ? AND product_id = ?
  `, [cartId, productId]);

  if (result.affectedRows === 0) {
    throw new Error('El producto no se encuentra en el carrito');
  }
};

const checkout = async (userId, paymentMethodId = null) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Obtener cart_id
    const [cartRows] = await connection.query('SELECT id FROM carts WHERE user_id = ?', [userId]);
    if (cartRows.length === 0) throw new Error('No existe carrito para el usuario');
    const cartId = cartRows[0].id;

    // Obtener los ítems del carrito
    const [cartItems] = await connection.query(`
      SELECT ci.product_id, ci.quantity, p.price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = ?
    `, [cartId]);
    if (cartItems.length === 0) throw new Error('El carrito está vacío');

    // Validar stock
    for (const item of cartItems) {
      const [productRows] = await connection.query('SELECT stock FROM products WHERE id = ?', [item.product_id]);
      if (productRows.length === 0) throw new Error(`Producto con id ${item.product_id} no encontrado`);
      const stock = productRows[0].stock;
      if (item.quantity > stock) {
        console.error(`Stock insuficiente para producto ${item.product_id}: Disponible ${stock}, solicitado ${item.quantity}`);
        throw new Error(`Stock insuficiente para el producto id ${item.product_id}. Disponible: ${stock}, solicitado: ${item.quantity}`);
      }

    }

    // Calcular total
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Crear orden con método de pago si existe
    const [orderResult] = await connection.query(`
      INSERT INTO orders (user_id, total_price, status, payment_method_id)
VALUES (?, ?, ?, ?)

    `, [userId, total,'pendiente', paymentMethodId]);
    const orderId = orderResult.insertId;

    // Crear order_items
    const orderItemsData = cartItems.map(item => [orderId, item.product_id, item.quantity, item.price]);
    await connection.query(`
      INSERT INTO order_items (order_id, product_id, quantity, price_at_sale)
      VALUES ?
    `, [orderItemsData]);

    // Actualizar stock
    for (const item of cartItems) {
      await connection.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
    }

    // Crear recibo
    const receiptNumber = 'REC-' + Date.now();
    await connection.query('INSERT INTO receipts (order_id, receipt_number) VALUES (?, ?)', [orderId, receiptNumber]);

    // Vaciar carrito
    await connection.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);

    await connection.commit();

    // Obtener datos usuario para el mail
    const [userRows] = await connection.query('SELECT name, email FROM users WHERE id = ?', [userId]);
    const user = userRows[0];

    // Construir contenido del mail
    const emailContent = `
      <h1>Compra Confirmada</h1>
      <p>Hola ${user.name}, gracias por tu compra.</p>
      <p>Pedido #${orderId} - Total: $${total}</p>
      <p>Detalles:</p>
      <ul>
        ${cartItems.map(item => `<li>${item.quantity} x Producto ID ${item.product_id} - $${item.price}</li>`).join('')}
      </ul>
      <p>Número de recibo: ${receiptNumber}</p>
    `;

    // Enviar correo
    await emailService.sendOrderConfirmation(user.email, { orderId, total, items: cartItems, receiptNumber });


    return {
      orderId,
      total,
      items: cartItems,
      receiptNumber
    };

  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  updateCartItem,
  removeCartItem,
  checkout,
};
