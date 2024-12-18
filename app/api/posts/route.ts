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

    try {
      await prisma.$connect();
      console.log('Successfully connected to database');
    } catch (connError) {
      console.error('Database connection error:', connError);
      return NextResponse.json([]);
    }
    
    const posts = await prisma.post.findMany({
      where: search ? {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } }
        ]
      } : undefined,
      include: {
        comments: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      likes: post.likes,
      commentCount: post.comments.length,
      createdAt: post.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error in /api/posts route:', error);
    return NextResponse.json([]);
  } finally {
    await prisma.$disconnect();
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

    // Create default user if needed
    let defaultUser;
    try {
      defaultUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: 'default@example.com' },
            { email: null }
          ]
        }
      });

      if (!defaultUser) {
        defaultUser = await prisma.user.create({
          data: {
            name: 'Default User'
          }
        });
      }
    } catch (userError) {
      console.error('Error with user:', userError);
      return NextResponse.json(
        { error: 'Failed to handle user' },
        { status: 500 }
      );
    }

    // Create the post
    try {
      const post = await prisma.post.create({
        data: {
          title: title.trim(),
          content: content.trim(),
          published: true,
          authorId: defaultUser.id,
        }
      });

      return NextResponse.json({
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt.toISOString(),
      }, { status: 201 });
    } catch (postError) {
      console.error('Error creating post:', postError);
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in POST /api/posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}