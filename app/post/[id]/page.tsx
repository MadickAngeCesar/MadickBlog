'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Post from '@/components/Post';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Edit2, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Author {
  name: string | null;
  image: string | null;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: Author | null;
}

interface Post {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  author: Author;
  authorId: string;
}

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (params?.id) {
      fetchPost();
    }
  }, [params?.id]);

  const fetchPost = async () => {
    if (!params?.id) {
      setError('Invalid post ID');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/posts/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to load post');
      }
      const data = await response.json();
      setPost(data);
    } catch (err) {
      setError('Failed to load post');
      console.error('Error fetching post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post || isDeleting) return;

    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete post');
      }

      router.push('/');
    } catch (err) {
      console.error('Error deleting post:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-500 mb-4">{error || 'Post not found'}</h1>
              <button
                onClick={() => router.push('/')}
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                ← Back to posts
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isAuthor = session?.user?.id === post.authorId;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.push('/')}
              className="text-primary-500 hover:text-primary-600 font-medium flex items-center gap-2"
            >
              ← Back to posts
            </button>
            {isAuthor && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push(`/edit/${post.id}`)}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 flex items-center gap-2"
                  title="Edit post"
                >
                  <Edit2 className="w-5 h-5" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className={`text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-2 ${
                    isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  title="Delete post"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="hidden sm:inline">{isDeleting ? 'Deleting...' : 'Delete'}</span>
                </button>
              </div>
            )}
          </div>
          <Post 
            id={post.id}
            title={post.title}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
            createdAt={post.createdAt}
            author={post.author}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
