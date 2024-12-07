import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// Temporary in-memory storage for categories
const categories = [
  { id: 1, name: 'Technology', count: 3 },
  { id: 2, name: 'Lifestyle', count: 2 },
  { id: 3, name: 'Travel', count: 1 }
];

export async function GET() {
  try {
    return new NextResponse(JSON.stringify(categories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error instanceof Error ? error.message : 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
