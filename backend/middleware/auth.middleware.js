import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const protect = async (req, res, next) => {
  const token = req.cookies.token;
  console.log('Protect middleware: Token received:', token || 'No token'); 
  if (!token) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Protect middleware: Decoded JWT:', decoded); 
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isProfileComplete: true,
        createdAt: true,
      },
    });

    if (!user) {
      console.log('Protect middleware: User not found for ID:', decoded.id); // Debug
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Protect middleware error:', err.message); // Debug
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    console.log('AdminOnly middleware: Access denied for user:', req.user); // Debug
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
};