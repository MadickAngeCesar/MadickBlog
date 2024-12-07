import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const postId = parseInt(params.id);

    if (!postId || isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    // First check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true }
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Get first user (for demo purposes)
    const user = await prisma.user.findFirst({
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'No users found' }, { status: 404 });
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        postId,
        authorId: user.id,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Failed to create comment:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
