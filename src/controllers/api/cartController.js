const CartService = require('../../services/cartService.js');
const { sendOrderConfirmation } = require('../../services/emailService');
const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // obtiene el userId del token
    const cart = await CartService.getCart(userId);
    res.json(cart || []);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};


const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { productId, quantity } = req.body;
    await CartService.addToCart(userId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar al carrito' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { productId } = req.params;
    const { quantity } = req.body;
    const affectedRows = await CartService.updateQuantity(userId, productId, quantity);
    if (affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    res.json({ message: 'Cantidad actualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar cantidad' });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { productId } = req.params;
    const affectedRows = await CartService.removeFromCart(userId, productId);
    if (affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
const checkout = async (req, res) => {
  try {
    const userId = req.user.id; 
    const paymentMethodId = req.body.paymentMethodId; // opcional

    const order = await CartService.checkout(userId, paymentMethodId);
     // Obtener email del usuario (puede ser de req.user o hacer consulta a BD si no está en token)
    const userEmail = req.user.email;
    const { payment_method_id } = req.body;
    console.log('payment_method_id recibido:', payment_method_id);

    // Enviar correo de confirmación
    await sendOrderConfirmation(userEmail, order);
    res.status(201).json({
      message: 'Compra realizada exitosamente',
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al realizar el checkout' });
  }
};


module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  checkout,
};
