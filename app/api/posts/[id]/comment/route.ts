import { NextResponse } from 'next/server';

// Since we're using in-memory storage for now
interface Comment {
  id: number;
  content: string;
  createdAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

const posts: Post[] = [
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

    const body = await request.json();
    if (!body.content?.trim()) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      );
    }

    const newComment: Comment = {
      id: (post.comments.length + 1),
      content: body.content.trim(),
      createdAt: new Date().toISOString()
    };

    post.comments.push(newComment);
    
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Failed to add comment:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}
