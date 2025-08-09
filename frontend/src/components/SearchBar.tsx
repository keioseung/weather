import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="도시명이나 국가명을 입력하세요..."
          className="input-field pl-12 pr-4 py-4 text-lg"
          id="search-input"
          name="search"
          aria-label="검색어 입력"
          autoComplete="search"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-6 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors"
        >
          검색
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
