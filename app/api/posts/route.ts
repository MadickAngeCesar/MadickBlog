import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface Post {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: Array<{
    id: number;
    content: string;
    createdAt: string;
  }>;
  createdAt: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';

    const posts = await prisma.post.findMany({
      where: search ? {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } }
        ]
      } : undefined,
      include: {
        comments: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(posts.map(post => ({
      ...post,
      commentCount: post.comments.length,
      createdAt: post.createdAt.toISOString(),
    })));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    // Validate input
    if (!title?.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        likes: 0,
        authorId: 1, // Use the default user
      },
      include: {
        comments: true,
      }
    });

    return NextResponse.json({
      ...post,
      commentCount: 0,
      createdAt: post.createdAt.toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}