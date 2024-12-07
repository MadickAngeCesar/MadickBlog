import { NextResponse } from 'next/server';

// Since we're using in-memory storage for now
let posts = [
  {
    id: 1,
    title: 'First Blog Post',
    content: 'This is my first blog post content.',
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  }
];

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    post.likes += 1;
    
    return NextResponse.json({ likes: post.likes });
  } catch (error) {
    console.error('Failed to like post:', error);
    return NextResponse.json(
      { error: 'Failed to like post' },
      { status: 500 }
    );
  }
}

// Alias PATCH to POST for compatibility
export const PATCH = POST;
