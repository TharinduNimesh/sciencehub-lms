import { prisma } from '@/lib/prisma.lib';
import bcrypt from 'bcryptjs';

async function seed() {
    try {
        const defaultPassword = 'Pass123!@#';
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        
        // Create admin user
        const admin = await prisma.user.upsert({
            where: { email: 'admin@sciencehub.lk' },
            update: {},
            create: {
                email: 'admin@sciencehub.lk',
                password: hashedPassword,
                firstName: 'Admin',
                lastName: 'User',
                role: 'ADMIN'
            }
        });

        // Create moderator user
        const moderator = await prisma.user.upsert({
            where: { email: 'moderator@sciencehub.lk' },
            update: {},
            create: {
                email: 'moderator@sciencehub.lk',
                password: hashedPassword,
                firstName: 'Moderator',
                lastName: 'User',
                role: 'MODERATOR'
            }
        });

        // Create student user with associated student profile
        const student = await prisma.user.upsert({
            where: { email: 'student@sciencehub.lk' },
            update: {},
            create: {
                email: 'student@sciencehub.lk',
                password: hashedPassword,
                firstName: 'Student',
                lastName: 'User',
                role: 'STUDENT',
                student: {
                    create: {
                        studentId: 'STU001',
                        dateOfBirth: new Date('2000-01-01'),
                        grade: '10',
                        section: 'A'
                    }
                }
            }
        });

        console.log('Seeded users:');
        console.log('- Admin:', admin.email);
        console.log('- Moderator:', moderator.email);
        console.log('- Student:', student.email);
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();