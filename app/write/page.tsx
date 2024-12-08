"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MarkdownEditor from "@/components/MarkdownEditor";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Header from "@/components/Header";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showTips, setShowTips] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      // Only redirect after successful post creation
      router.push(`/post/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 ">
      <Header />
      <main className="flex-grow container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => {
              if (title.trim() || content.trim()) {
                if (
                  confirm(
                    "Are you sure you want to leave? Your changes will be lost."
                  )
                ) {
                  router.push("/");
                }
              } else {
                router.push("/");
              }
            }}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to posts
          </button>
          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
            title={showTips ? "Hide writing tips" : "Show writing tips"}
          >
            <HelpCircle className="w-5 h-5" />
            {showTips ? "Hide Tips" : "Show Tips"}
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
              className="w-full px-4 py-3 text-xl font-semibold text-gray-900 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
            <div className="space-y-4">
              <MarkdownEditor initialValue={content} onChange={setContent} />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 text-white bg-blue-500 rounded-lg font-medium ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600 active:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Publishing..." : "Publish Post"}
                </button>
              </div>
            </div>

            {showTips && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Writing Tips
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-800">
                    <li>Use clear, descriptive titles</li>
                    <li>Break content into sections with headings</li>
                    <li>Use markdown formatting for better readability</li>
                    <li>Review your post before publishing</li>
                    <li>Keep paragraphs short and to the point</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Markdown Guide
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-800">
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-dark-700 text-gray-900 px-1.5 py-0.5 rounded">
                        # Heading 1
                      </code>{" "}
                      - Use for main titles
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-dark-700 text-gray-900 px-1.5 py-0.5 rounded">
                        ## Heading 2
                      </code>{" "}
                      - Use for subheadings
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-dark-700 text-gray-900 px-1.5 py-0.5 rounded">
                        ### Heading 3
                      </code>{" "}
                      - Use for smaller sections
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-dark-700 text-gray-900 px-1.5 py-0.5 rounded">
                        **Bold text**
                      </code>{" "}
                      - Use for emphasis
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-dark-700 text-gray-900 px-1.5 py-0.5 rounded">
                        *Italic text*
                      </code>{" "}
                      - Use for subtle emphasis
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-dark-700 text-gray-900 px-1.5 py-0.5 rounded">
                        [Link text](URL)
                      </code>{" "}
                      - Use for hyperlinks
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-dark-700 text-gray-900 px-1.5 py-0.5 rounded">
                        - List item
                      </code>{" "}
                      - Use for bullet points
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-dark-700 text-gray-900 px-1.5 py-0.5 rounded">
                        1. Numbered item
                      </code>{" "}
                      - Use for numbered lists
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-dark-700 text-gray-900 px-1.5 py-0.5 rounded">
                        `Inline code`
                      </code>{" "}
                      - Use for inline code snippets
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-dark-700 text-gray-900 px-1.5 py-0.5 rounded">
                        ```python
                        <br />
                        Code block
                        <br />
                        ```
                      </code>{" "}
                      - Use for multi-line code blocks
                    </li>
                    <li>
                      <code className="text-sm bg-gray-100 dark:bg-dark-700 text-gray-900 px-1.5 py-0.5 rounded">
                        ![Alt text](image_url)
                      </code>{" "}
                      - Use for images
                    </li>
                    <li>
                      <a
                        href="https://www.markdownguide.org/cheat-sheet/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Discover more markdown syntax
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
