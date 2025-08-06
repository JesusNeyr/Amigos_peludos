const userPaymentMethodService = require('../../services/userPaymentMethodService');
const { validateAddUserPaymentMethod } = require('../../validations/userPaymentMethodValidation');

const getAll = async (req, res) => {
  const userId = req.user.id;
  const methods = await userPaymentMethodService.getAllByUser(userId);
  res.json(methods);
};

const add = async (req, res) => {
  const userId = req.user.id;
  const { payment_method_id } = req.body;

  const { error } = validateAddUserPaymentMethod({ payment_method_id });
  if (error) return res.status(400).json({ error: error.details[0].message });

  const result = await userPaymentMethodService.add(userId, payment_method_id);
  res.status(201).json({ message: 'Método de pago agregado', id: result.id });
};

const remove = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const success = await userPaymentMethodService.remove(id, userId);
  if (!success) return res.status(404).json({ error: 'Método no encontrado o no pertenece al usuario' });

  res.json({ message: 'Método eliminado correctamente' });
};

module.exports = {
  getAll,
  add,
  remove,
};
