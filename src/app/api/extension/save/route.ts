import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, url } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Title required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const user = await prisma.user.findFirst();

    if (!user) {
      return NextResponse.json(
        { error: 'No user found' },
        { status: 500, headers: corsHeaders }
      );
    }

    const job = await prisma.job.create({
      data: {
        title,
        company: 'Unknown',
        url: url || null,
        notes: description || null,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, job }, { headers: corsHeaders });
  } catch (error) {
    console.error('Extension save error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
