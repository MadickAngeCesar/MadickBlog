"use client";

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Heart, MessageCircle } from 'lucide-react';
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
  likes: number;
  comments?: Comment[];
  createdAt: string;
  author: Author;
}

export default function Post({ id, title, content, likes: initialLikes, comments: initialComments = [], createdAt, author }: PostProps) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [isLiking, setIsLiking] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [error, setError] = useState('');

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    setError('');
    
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'like' })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to like post');
      }

      const data = await response.json();
      setLikes(data.likes);
    } catch (err) {
      console.error('Error liking post:', err);
      setError(err instanceof Error ? err.message : 'Failed to like post');
      setLikes(initialLikes); // Reset likes on error
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setError('Please sign in to comment');
      return;
    }

    if (isSubmittingComment || !newComment.trim()) return;
    
    setIsSubmittingComment(true);
    setError('');

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add comment');
      }

      const comment = await response.json();
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add comment');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <article className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          {author.image ? (
            <Image
              src={author.image}
              alt={author.name || 'Author'}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
          )}
          <span>{author.name || 'Anonymous'}</span>
        </div>
        <span>•</span>
        <time dateTime={createdAt}>{new Date(createdAt).toLocaleDateString()}</time>
      </div>
      <div className="prose dark:prose-invert max-w-none mb-6">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center gap-1 ${
            isLiking
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:text-primary-500 dark:hover:text-primary-400'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>{likes} likes</span>
        </button>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-5 h-5" />
          <span>{comments.length} comments</span>
        </div>
      </div>
      {error && (
        <div className="mt-4 p-3 text-sm bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}
      <form onSubmit={handleComment} className="mt-6">
        <div className="flex gap-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={session ? "Write a comment..." : "Sign in to comment"}
            disabled={!session}
            className="flex-grow p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
            rows={2}
          />
          <button
            type="submit"
            disabled={isSubmittingComment || !session}
            className={`px-4 py-2 h-fit text-white bg-primary-500 rounded-lg font-medium ${
              isSubmittingComment || !session
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-primary-600 active:bg-primary-700'
            }`}
          >
            {isSubmittingComment ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
      {comments.length > 0 && (
        <div className="mt-8 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Comments
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                {comment.author?.image ? (
                  <Image
                    src={comment.author.image}
                    alt={comment.author.name || 'Commenter'}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
                )}
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {comment.author?.name || 'Anonymous'}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  •
                </span>
                <time
                  dateTime={comment.createdAt}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  {new Date(comment.createdAt).toLocaleDateString()}
                </time>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
