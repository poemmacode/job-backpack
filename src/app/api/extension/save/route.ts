import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: { apiKey },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    const body = await request.json();
    const { title, company, location, url, salary, notes } = body;

    if (!title || !company) {
      return NextResponse.json(
        { error: 'Title and company are required' },
        { status: 400 }
      );
    }

    const existingJob = await prisma.job.findFirst({
      where: {
        userId: user.id,
        url: url || undefined,
        title,
        company,
      },
    });

    if (existingJob) {
      return NextResponse.json({
        success: true,
        job: existingJob,
        alreadyExists: true,
      });
    }

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location: location || null,
        url: url || null,
        salary: salary || null,
        notes: notes
          ? `${notes}\n\nSaved via Browser Extension`
          : 'Saved via Browser Extension',
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, job, alreadyExists: false });
  } catch (error) {
    console.error('Extension save error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
