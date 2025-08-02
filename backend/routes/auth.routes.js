import express from 'express';
import { register, login, logout, getMe} from '../controllers/auth.controller.js';
import { registerSchema, loginSchema } from '../validation/auth.validation.js';
import { protect } from '../middleware/auth.middleware.js';
import validate  from '../validation/validate.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);

router.get('/me', protect, (req, res) => {
  res.status(200).json({ user: req.user });
});
export default router;