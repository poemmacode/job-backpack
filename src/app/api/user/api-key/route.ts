import { NextResponse } from 'next/server';
import { getUser } from '@/features/auth/hooks/useAuth';

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { prisma } = await import('@/lib/prisma');

    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { apiKey: true },
    });

    if (!dbUser?.apiKey) {
      const apiKey = `jb_${Buffer.from(`${user.id}_${Date.now()}`).toString('base64')}`;
      
      dbUser = await prisma.user.update({
        where: { id: user.id },
        data: { apiKey },
        select: { apiKey: true },
      });
    }

    return NextResponse.json({ apiKey: dbUser.apiKey });
  } catch (error) {
    console.error('Failed to get API key:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
