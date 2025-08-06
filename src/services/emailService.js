const nodemailer = require('nodemailer');

async function createTransporter() {
  let testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

const sendOrderConfirmation = async (toEmail, order) => {
  const transporter = await createTransporter();
  const { orderId, total, items, receiptNumber } = order;

  const itemsList = items
    .map(i => `Producto ID: ${i.product_id}, Cantidad: ${i.quantity}, Precio unitario: $${i.price}`)
    .join('\n');

  const mailOptions = {
    from: '"Amigos Peludos" <no-reply@amigospeludos.com>',
    to: toEmail,
    subject: `Confirmación de compra - Orden #${orderId}`,
    text: `Gracias por tu compra!\n\nNúmero de recibo: ${receiptNumber}\nTotal: $${total}\n\nDetalles:\n${itemsList}\n\n¡Esperamos que disfrutes tus productos!`,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log('Mensaje enviado: %s', info.messageId);
  console.log('Vista previa URL: %s', nodemailer.getTestMessageUrl(info));
};

module.exports = { sendOrderConfirmation };
