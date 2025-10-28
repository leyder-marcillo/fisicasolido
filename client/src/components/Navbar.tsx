import { Link } from 'wouter';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { Atom } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const [, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2">
            <Atom className="w-8 h-8 text-primary" data-testid="logo" />
            <span className="font-bold text-xl hidden sm:block">Física del Estado Sólido</span>
            <span className="font-bold text-xl sm:hidden">FES</span>
          </Link>
          
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
        
        <div className="pb-4 md:hidden">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </nav>
  );
}
