const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ error: 'No se encontró rol del usuario autenticado' });
    }

    if (userRole !== requiredRole) {
      return res.status(403).json({ error: 'Acceso denegado: rol insuficiente' });
    }

    next();
  };
};

module.exports = checkRole;
