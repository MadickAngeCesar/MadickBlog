"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PenSquare } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 p-6 hidden lg:block">
      <div className="mb-8">
        <button
          onClick={() => router.push('/write')}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
        >
          <PenSquare className="w-4 h-4" />
          Write Post
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 className="font-medium text-gray-900 dark:text-white mb-2">
            Welcome to MadickBlog
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Share your thoughts and ideas with the world. Start writing your first post today!
          </p>
        </div>

        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
          <h2 className="font-medium text-primary-900 dark:text-primary-100 mb-2">
            Quick Tips
          </h2>
          <ul className="text-sm space-y-2 text-primary-800 dark:text-primary-200">
            <li>• Use markdown for formatting</li>
            <li>• Add code snippets with ```</li>
            <li>• Include images with ![alt](url)</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
