import { z } from 'zod';
import validate from './validate.js';

const placeOrderSchema = z.object({
  products: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ),
  shippingAddress: z.object({
    addressLine1: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(4),
    country: z.string().min(1),
    phone: z.string().min(6),
  }),
  total: z.number().min(0),
});

export const placeOrderValidation = validate(placeOrderSchema);
