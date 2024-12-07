import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { colors } from '@/lib/theme';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, isDark } = useTheme();

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-sm border-b transition-colors ${
      isDark ? 'bg-dark-800/80 border-dark-700' : 'bg-white/80 border-dark-200'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition group">
              <Image
                src="/logo.svg"
                alt="Blog Logo"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
              <span className={`text-xl font-bold bg-gradient-to-r transition-colors ${
                isDark 
                  ? 'from-primary-300 to-accent-300 group-hover:from-primary-200 group-hover:to-accent-200'
                  : 'from-primary-600 to-accent-600 group-hover:from-primary-700 group-hover:to-accent-700'
              } bg-clip-text text-transparent`}>
                MadickBlog
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isDark
                  ? 'text-white hover:text-primary-300 hover:bg-dark-700'
                  : 'text-black hover:text-primary-600 hover:bg-dark-100'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/write" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isDark
                  ? 'text-white hover:text-primary-300 hover:bg-dark-700'
                  : 'text-black hover:text-primary-600 hover:bg-dark-100'
              }`}
            >
              Write
            </Link>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-white'
                  : 'bg-dark-100 hover:bg-dark-200 text-black'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-white'
                  : 'bg-dark-100 hover:bg-dark-200 text-black'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-white hover:text-primary-300 hover:bg-dark-700'
                  : 'text-black hover:text-primary-600 hover:bg-dark-100'
              }`}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden transition-colors ${
            isDark ? 'bg-dark-800' : 'bg-white'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isDark
                    ? 'text-white hover:text-primary-300 hover:bg-dark-700'
                    : 'text-black hover:text-primary-600 hover:bg-dark-100'
                }`}
              >
                Home
              </Link>
              <Link
                href="/write"
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isDark
                    ? 'text-white hover:text-primary-300 hover:bg-dark-700'
                    : 'text-black hover:text-primary-600 hover:bg-dark-100'
                }`}
              >
                Write
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
