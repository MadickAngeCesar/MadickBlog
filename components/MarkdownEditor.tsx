import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTheme } from './ThemeProvider';
import { Eye, Split, Edit2, Copy, Trash } from 'lucide-react';
import Image from 'next/image';

interface MarkdownEditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ initialValue = '', onChange }: MarkdownEditorProps) {
  const [content, setContent] = useState(initialValue);
  const [viewMode, setViewMode] = useState<'write' | 'preview' | 'split'>('write');
  const [isFocused, setIsFocused] = useState(false);
  const { isDark } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
    onChange(newValue);
  };

  const MarkdownPreview = () => (
    <div className={`prose ${isDark ? 'prose-invert' : 'prose-dark'} prose-primary max-w-none min-h-[250px] prose-img:rounded-lg`}>
      <ReactMarkdown
        components={{
          h1: ({...props}) => <h1 className={`text-2xl font-bold mt-6 mb-4 ${isDark ? 'text-white' : 'text-black'}`} {...props} />,
          h2: ({...props}) => <h2 className={`text-xl font-bold mt-5 mb-3 ${isDark ? 'text-white' : 'text-black'}`} {...props} />,
          h3: ({...props}) => <h3 className={`text-lg font-bold mt-4 mb-2 ${isDark ? 'text-white' : 'text-black'}`} {...props} />,
          p: ({...props}) => <p className={`my-3 leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-900'}`} {...props} />,
          ul: ({...props}) => <ul className={`list-disc list-inside my-3 space-y-1 ${isDark ? 'text-gray-200' : 'text-gray-900'}`} {...props} />,
          ol: ({...props}) => <ol className={`list-decimal list-inside my-3 space-y-1 ${isDark ? 'text-gray-200' : 'text-gray-900'}`} {...props} />,
          blockquote: ({...props}) => (
            <blockquote className={`border-l-4 pl-4 my-4 italic ${
              isDark 
                ? 'border-primary-400 bg-dark-700/50 text-gray-200' 
                : 'border-primary-500 bg-primary-50 text-gray-900'
            } py-2 pr-2 rounded-r`} {...props} />
          ),
          code: ({inline, ...props}) => 
            inline ? (
              <code className={`px-1.5 py-0.5 rounded text-sm font-mono ${
                isDark
                  ? 'bg-dark-700 text-white'
                  : 'bg-dark-100 text-black'
              }`} {...props} />
            ) : (
              <code className="block bg-dark-900 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono" {...props} />
            ),
          a: ({...props}) => (
            <a className={`underline decoration-2 transition-colors ${
              isDark
                ? 'text-white decoration-white hover:text-white hover:decoration-white'
                : 'text-black decoration-black hover:text-black hover:decoration-black'
            }`} {...props} />
          ),
          img: ({src, alt}) => (
            <Image 
              src={src || ''} 
              alt={alt || ''} 
              className="rounded-lg shadow-lg my-6" 
              width={800}  
              height={600} 
              layout="responsive"
            />
          ),
        }}
      >
        {content || '*No content yet. Start writing!*'}
      </ReactMarkdown>
    </div>
  );

  return (
    <div className={`rounded-xl border-2 transition-all ${
      isFocused 
        ? isDark ? 'border-primary-400 shadow-lg shadow-primary-500/10' : 'border-primary-500 shadow-lg shadow-primary-500/10'
        : isDark ? 'border-dark-700' : 'border-dark-200'
    } ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
      <div className={`flex items-center justify-between px-4 py-2 border-b rounded-t-xl transition-colors ${
        isDark ? 'border-dark-700 bg-dark-800' : 'border-dark-200 bg-dark-50'
      }`}>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setViewMode('write')}
            className={`p-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'write'
                ? isDark 
                  ? 'bg-primary-900/50 text-white'
                  : 'bg-primary-100 text-black'
                : isDark
                  ? 'text-gray-300 hover:text-white hover:bg-dark-700'
                  : 'text-gray-600 hover:text-black hover:bg-dark-100'
            }`}
            title="Write mode"
          >
            <Edit2 className="w-4 h-4" />
            <span className="text-sm font-medium">Write</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`p-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'preview'
                ? isDark 
                  ? 'bg-primary-900/50 text-white'
                  : 'bg-primary-100 text-black'
                : isDark
                  ? 'text-gray-300 hover:text-white hover:bg-dark-700'
                  : 'text-gray-600 hover:text-black hover:bg-dark-100'
            }`}
            title="Preview mode"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`p-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'split'
                ? isDark 
                  ? 'bg-primary-900/50 text-white'
                  : 'bg-primary-100 text-black'
                : isDark
                  ? 'text-gray-300 hover:text-white hover:bg-dark-700'
                  : 'text-gray-600 hover:text-black hover:bg-dark-100'
            }`}
            title="Split mode"
          >
            <Split className="w-4 h-4" />
            <span className="text-sm font-medium">Split</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(content);
            }}
            className={`p-1.5 rounded-md transition-colors ${
              isDark
                ? 'text-gray-300 hover:text-white hover:bg-dark-700'
                : 'text-gray-600 hover:text-black hover:bg-dark-100'
            }`}
            title="Copy content"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to clear all content?')) {
                setContent('');
                onChange('');
              }
            }}
            className={`p-1.5 rounded-md transition-colors ${
              isDark
                ? 'text-gray-300 hover:text-red-400 hover:bg-dark-700'
                : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
            }`}
            title="Clear content"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className={`p-4 ${viewMode === 'split' ? 'grid grid-cols-2 gap-4' : ''}`}>
        {(viewMode === 'write' || viewMode === 'split') && (
          <div className={viewMode === 'split' ? 'border-r pr-4' : ''}>
            <textarea
              value={content}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full min-h-[250px] p-2 bg-transparent border-0 focus:ring-0 resize-y font-mono text-sm leading-relaxed ${
                isDark
                  ? 'text-white placeholder-gray-500'
                  : 'text-black placeholder-gray-400'
              }`}
              placeholder="Write your content in markdown..."
            />
          </div>
        )}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={viewMode === 'split' ? 'pl-4' : ''}>
            <MarkdownPreview />
          </div>
        )}
      </div>

      {viewMode !== 'preview' && (
        <div className={`px-4 py-3 text-xs border-t rounded-b-xl transition-colors ${
          isDark
            ? 'bg-dark-800 border-dark-700 text-gray-400'
            : 'bg-dark-50 border-dark-200 text-gray-600'
        }`}>
          Supports markdown formatting: **bold**, *italic*, [links](url), ![images](url), `code`, ```codeblocks```, {'>'} quotes
        </div>
      )}
    </div>
  );
}
