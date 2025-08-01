import express from 'express';
import { register, login, logout} from '../controllers/auth.controller.js';
import { registerSchema, loginSchema } from '../validation/auth.validation.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);

export default router;