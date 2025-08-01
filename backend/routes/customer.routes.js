import express from 'express';
import { getFilteredCustomers } from '../controllers/customer.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getFilteredCustomers);

export default router;
