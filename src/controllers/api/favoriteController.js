const FavoriteModel = require('../../models/favoriteModel');

const FavoriteController = {
  getFavorites: async (req, res, next) => {
    try {
      const userId = req.user && req.user.id;
      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }
      const favorites = await FavoriteModel.getFavoritesByUser(userId);
      res.json(favorites);
    } catch (error) {
      next(error);
    }
  },

  addFavorite: async (req, res, next) => {
    try {
      const userId = req.user && req.user.id;
      const { productId } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      if (!productId) {
        return res.status(400).json({ error: 'productId es requerido' });
      }

      await FavoriteModel.addFavorite(userId, productId);
      res.status(201).json({ message: 'Producto agregado a favoritos' });
    } catch (error) {
      next(error);
    }
  },


  removeFavorite: async (req, res, next) => {
    try {
      const userId = req.user && req.user.id;
      const { productId } = req.params;

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      if (!productId) {
        return res.status(400).json({ error: 'productId es requerido' });
      }

      await FavoriteModel.removeFavorite(userId, productId);
      res.json({ message: 'Producto eliminado de favoritos' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = FavoriteController;
