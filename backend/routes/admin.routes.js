import express from 'express';
import {
  listCustomers, getCustomer, createCustomer, updateCustomer,
  resetCustomerPassword, setPortalAccess, deleteCustomer,
  blockCustomer, unblockCustomer, impersonateCustomer
} from '../controllers/admin.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(protect, adminOnly);

router.get('/customers', listCustomers);
router.get('/customers/:id', getCustomer);
router.post('/customers', createCustomer);
router.patch('/customers/:id', updateCustomer);
router.post('/customers/:id/reset-password', resetCustomerPassword);
router.patch('/customers/:id/portal', setPortalAccess);
router.delete('/customers/:id', deleteCustomer);
router.patch('/customers/:id/block', blockCustomer);
router.patch('/customers/:id/unblock', unblockCustomer);
router.post('/customers/:id/impersonate', impersonateCustomer);

export default router;