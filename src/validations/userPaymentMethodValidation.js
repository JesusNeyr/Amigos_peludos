const Joi = require('joi');

const validateAddUserPaymentMethod = (data) => {
  const schema = Joi.object({
    payment_method_id: Joi.number().integer().required()
  });
  return schema.validate(data);
};

module.exports = {
  validateAddUserPaymentMethod,
};
