import authenticateToken from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
import express from 'express';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении информации о пользователе' });
    }
});

export default router;