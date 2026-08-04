import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 });
    }

    const user = await prisma.user.findFirst({ where: { apiKey } });

    if (!user) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    const { title, company, location, salary, description, url } = await request.json();

    if (!title || !company) {
      return NextResponse.json({ error: 'Title and company required' }, { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location: location || null,
        url: url || null,
        salary: salary || null,
        notes: description || null,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error('Extension save error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
