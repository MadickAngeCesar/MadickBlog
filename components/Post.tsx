"use client";

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

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

interface PostProps {
  id: number;
  title: string;
  content: string;
  comments?: Comment[];
  createdAt: string;
  author: Author | null;
}

export default function Post({ id, title, content, comments: initialComments = [], createdAt, author }: PostProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    setError('');

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const data = await response.json();
      setComments(prev => [data, ...prev]);
      setNewComment('');
    } catch (err) {
      setError('Failed to add comment');
      console.error('Error adding comment:', err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
        
        <div className="flex items-center space-x-4 mb-6">
          {author?.image && (
            <Image
              src={author.image}
              alt={author.name || 'Author'}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div>
            <p className="text-gray-900 dark:text-white font-medium">
              {author?.name || 'Anonymous'}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Comments ({comments.length})
          </h2>

          {session ? (
            <form onSubmit={handleSubmitComment} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-2 text-gray-900 bg-white dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              {error && (
                <p className="mt-2 text-red-500 dark:text-red-400">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmittingComment}
                className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg ${
                  isSubmittingComment
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-600'
                }`}
              >
                {isSubmittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Please sign in to comment
            </p>
          )}

          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center space-x-3 mb-2">
                  {comment.author?.image && (
                    <Image
                      src={comment.author.image}
                      alt={comment.author.name || 'Commenter'}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {comment.author?.name || 'Anonymous'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
