import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getFilteredCustomers = async (req, res) => {
  try {
    const { search = '', status = 'all' } = req.query;

    const where = {
      role: 'customer',
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(status !== 'all' && { status }), 
    };

    const customers = await prisma.user.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        status: true, 
      },
    });

    res.status(200).json(customers);
  } catch (error) {
    console.error('Failed to fetch filtered customers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
