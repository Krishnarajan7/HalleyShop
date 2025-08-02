import express from 'express';
import {
  getProfile,
  updateProfile,
  changePassword,
} from '../controllers/customer.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import {
  updateProfileValidation,
  changePasswordValidation,
} from '../validation/customer.validation.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfileValidation, updateProfile);
router.put('/change-password', protect, changePasswordValidation, changePassword);

export default router;
