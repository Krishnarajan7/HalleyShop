import { z } from 'zod';
import validate from './validate.js';

const updateSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain one uppercase letter'),
});

export const updateProfileValidation = validate(updateSchema);
export const changePasswordValidation = validate(changePasswordSchema);
