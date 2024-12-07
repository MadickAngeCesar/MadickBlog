'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MarkdownEditor from '@/components/MarkdownEditor';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Post {
  id: number;
  title: string;
  content: string;
  likes: number;
  createdAt: string;
}

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [showTips, setShowTips] = useState(true);

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
      setTitle(data.title);
      setContent(data.content);
    } catch (err) {
      setError('Failed to load post');
      console.error('Error fetching post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update post');
      }

      router.push(`/post/${params.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-grow container max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-grow container max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">{error}</h1>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              ← Back to posts
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => {
              if (
                title !== post?.title || 
                content !== post?.content
              ) {
                if (confirm('Are you sure you want to leave? Your changes will be lost.')) {
                  router.push(`/post/${params.id}`);
                }
              } else {
                router.push(`/post/${params.id}`);
              }
            }}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to post
          </button>
          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
            title={showTips ? 'Hide writing tips' : 'Show writing tips'}
          >
            <HelpCircle className="w-5 h-5" />
            {showTips ? 'Hide Tips' : 'Show Tips'}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title..."
              className="w-full px-4 py-3 text-xl font-semibold bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
            <div>
              <MarkdownEditor
                initialValue={content}
                onChange={setContent}
              />
            </div>

            {showTips && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
                  <h3 className="text-lg font-semibold mb-4">Writing Tips</h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <li>Use clear, descriptive titles</li>
                    <li>Break content into sections with headings</li>
                    <li>Use markdown formatting for better readability</li>
                    <li>Include relevant examples when possible</li>
                    <li>Review your post before publishing</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
                  <h3 className="text-lg font-semibold mb-4">Markdown Guide</h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <li><code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded"># Heading 1</code></li>
                    <li><code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">## Heading 2</code></li>
                    <li><code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">**Bold text**</code></li>
                    <li><code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">*Italic text*</code></li>
                    <li><code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">[Link text](URL)</code></li>
                    <li><code className="text-sm bg-gray-100 dark:bg-dark-700 px-1.5 py-0.5 rounded">- List item</code></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-2 text-white bg-primary-500 rounded-lg font-medium ${
                isSaving
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-primary-600 active:bg-primary-700'
              }`}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
