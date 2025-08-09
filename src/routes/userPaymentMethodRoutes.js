const express = require('express');
const router = express.Router();
const userPaymentMethodController = require('../controllers/api/userPaymentMethodController');
const verifyToken = require('../middleware/verifyToken'); 
router.use(verifyToken);

router.get('/', userPaymentMethodController.getAll);
router.post('/', userPaymentMethodController.add);
router.delete('/:id', userPaymentMethodController.remove);

module.exports = router;
