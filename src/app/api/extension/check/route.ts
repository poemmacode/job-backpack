import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    const url = request.nextUrl.searchParams.get('url');

    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: { apiKey },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    if (!url) {
      return NextResponse.json({ error: 'URL required' }, { status: 400 });
    }

    const existingJob = await prisma.job.findFirst({
      where: {
        userId: user.id,
        url,
      },
    });

    return NextResponse.json({
      exists: !!existingJob,
      job: existingJob || null,
    });
  } catch (error) {
    console.error('Extension check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
