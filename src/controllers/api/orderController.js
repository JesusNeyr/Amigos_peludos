const orderService = require('../../services/orderService');

const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await orderService.getOrderHistoryByUserId(userId);
    res.status(200).json(history);
  } catch (error) {
    console.error('Error al obtener el historial de compras:', error);
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
};

module.exports = {
  getOrderHistory,
};
