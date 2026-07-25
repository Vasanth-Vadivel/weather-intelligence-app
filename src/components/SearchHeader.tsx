import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Cloud, MapPin } from 'lucide-react';
import { GeocodingResult, GeocodingResponse } from '../types';

interface SearchHeaderProps {
  onSearch: (cityOrLocation: string | GeocodingResult) => void;
  isLoading: boolean;
  unit: 'C' | 'F';
  onUnitChange: (unit: 'C' | 'F') => void;
}

export function SearchHeader({ onSearch, isLoading, unit, onUnitChange }: SearchHeaderProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmed = query.trim();
      if (trimmed.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsSuggestionsLoading(true);
      try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=5&language=en&format=json`);
        if (res.ok) {
          const data: GeocodingResponse = await res.json();
          setSuggestions(data.results || []);
        }
      } catch (error) {
        console.error("Failed to fetch suggestions", error);
        setSuggestions([]);
      } finally {
        setIsSuggestionsLoading(false);
      }
    };

    if (!hasSearched) {
      const timeoutId = setTimeout(fetchSuggestions, 300);
      return () => clearTimeout(timeoutId);
    }
    setHasSearched(false);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      setShowDropdown(false);
      onSearch(trimmed);
    }
  };

  const handleSelectSuggestion = (loc: GeocodingResult) => {
    const displayName = [loc.name, loc.admin1, loc.country].filter(Boolean).join(', ');
    setQuery(displayName);
    setShowDropdown(false);
    setHasSearched(true);
    onSearch(loc);
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="bg-blue-500 p-2.5 rounded-xl text-white shadow-sm">
          <Cloud className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Weather Intelligence</h1>
          <p className="text-sm font-medium text-slate-500">Global Forecasting</p>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto z-20">
        <div className="flex bg-slate-200/50 p-1 rounded-xl">
          <button 
            onClick={() => onUnitChange('C')} 
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${unit === 'C' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            °C
          </button>
          <button 
            onClick={() => onUnitChange('F')} 
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${unit === 'F' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            °F
          </button>
        </div>

        <div className="relative w-full sm:w-96" ref={dropdownRef}>
        <form onSubmit={handleSubmit} className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search for a city..."
            className="block w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            {isLoading ? (
              <div className="p-1.5 text-blue-500">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              <button
                type="submit"
                disabled={!query.trim()}
                className="p-1.5 text-white bg-blue-500 rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>

        {showDropdown && query.trim().length >= 2 && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-lg overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
            {isSuggestionsLoading ? (
              <div className="flex items-center justify-center py-4 text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span className="text-sm font-medium">Loading...</span>
              </div>
            ) : suggestions.length > 0 ? (
              <ul className="max-h-64 overflow-y-auto">
                {suggestions.map((loc) => (
                  <li key={loc.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectSuggestion(loc)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-start gap-3 border-b border-slate-50 last:border-0"
                    >
                      <MapPin className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{loc.name}</span>
                        <span className="text-sm text-slate-500">
                          {[loc.admin1, loc.country].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-3 text-sm text-slate-500 text-center font-medium">
                No matching cities found
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </header>
  );
}
