"use client";

import Link from 'next/link';
import { Heart, MessageCircle } from 'lucide-react';

interface PostCardProps {
  id: number;
  title: string;
  likes: number;
  commentCount: number;
  createdAt: string;
}

export default function PostCard({ id, title, likes, commentCount, createdAt }: PostCardProps) {
  return (
    <Link
      href={`/post/${id}`}
      className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {title}
      </h2>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {new Date(createdAt).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <Heart className="h-4 w-4" />
            <span className="text-sm">{likes}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{commentCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
