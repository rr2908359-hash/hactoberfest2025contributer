'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');

  // Initialize username from URL params if on profile page
  useEffect(() => {
    if (pathname === '/profile') {
      const userParam = searchParams?.get('user');
      if (userParam) {
        setUsername(userParam);
      }
    }
  }, [pathname, searchParams]);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/profile?user=${username.trim()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
      <nav className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex flex-col space-y-4">
          {/* Top Row: Logo and Navigation Links */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Logo/Title */}
            <div className='flex items-center space-x-4 p-2 '>
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity ">
                <div className="text-2xl">🖱️</div>
                <h1 className="text-xl font-bold text-white">ClickHub2025</h1>
              </Link>
              {/* Profile Search Bar - Only show on profile page */}
              <div className="flex justify-center">
              {pathname === '/profile' && (
                  <form onSubmit={handleSearchSubmit} className="flex bg-gray-700 rounded-lg overflow-hidden border border-gray-600 max-w-md w-full ">
                    <input
                      type="text"
                      placeholder="Enter GitHub username"
                      className="flex-1 p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 transition-colors duration-200 text-sm font-medium"
                    >
                      Search
                    </button>
                  </form>
              )}
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-1 ">
              <Link
                href="/"
                className={`px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium ${
                  isActive('/') 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                🏠 Home
              </Link>
              <Link
                href="/profile"
                className={`px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium ${
                  isActive('/profile') 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                👤 Profile
              </Link>
              
              <a
                href="https://github.com/MRIEnan/clickhub_hactoberfest2025/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
              >
                📝 Contribute
              </a>
            </div>
          </div>

          
        </div>
      </nav>
    </div>
  );
};

export default Navigation;