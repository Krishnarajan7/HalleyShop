import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const protect = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ message: 'Not logged in' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Fetch full user object from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isProfileComplete: true,
        createdAt: true
      }
    })
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }
    
    req.user = user
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}

export const adminOnly = (req, res, next) => {
  // Only allow access if user is admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
};