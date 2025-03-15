import { prisma } from '@/lib/prisma.lib';
import bcrypt from 'bcryptjs';

async function seed() {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        const admin = await prisma.user.upsert({
            where: { email: 'admin@sciencehub.com' },
            update: {},
            create: {
                email: 'admin@sciencehub.com',
                password: hashedPassword,
                firstName: 'Admin',
                lastName: 'User',
                role: 'ADMIN'
            }
        });

        console.log('Seeded admin user:', admin.email);
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();