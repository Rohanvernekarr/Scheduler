import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_WxNBKc8ajVk1@ep-late-forest-am9nltyo-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    }
  }
});

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'rohanrv2004@gmail.com' },
    select: { id: true, email: true, twoFactorEnabled: true }
  });
  console.log('User 2FA Status:', JSON.stringify(user, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
