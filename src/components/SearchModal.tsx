import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, X, BookOpen, Clock, Tag } from 'lucide-react';
import { ALGORITHMS, CATEGORIES, AlgorithmItem } from '../data/daaData';
import { soundFx } from '../utils/soundEffects';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAlgorithm: (algo: AlgorithmItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAlgorithm
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();
  const filtered = ALGORITHMS.filter(algo => {
    if (!q) return true;
    return (
      algo.name.toLowerCase().includes(q) ||
      algo.shortDesc.toLowerCase().includes(q) ||
      algo.complexity.worst.toLowerCase().includes(q) ||
      algo.complexity.paradigm.toLowerCase().includes(q) ||
      algo.categoryId.toLowerCase().includes(q)
    );
  }).slice(0, 8);

  return (
    <div className="fixed inset-0 z-50 bg-[#201538]/70 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 select-none">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E5DCF9] overflow-hidden animate-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#F0EBFD] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#7B42F6] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search algorithms by name, paradigm, Big-O (e.g. 'O(n log n)', 'Dijkstra', 'DP')..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full text-sm font-medium text-[#201538] placeholder-[#7B6E96] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#7B6E96] hover:bg-[#F4F0FF]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] font-mono bg-[#F8F6FE] px-2 py-1 rounded text-[#7B6E96] border border-[#E5DCF9]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#F0EBFD]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#7B6E96]">
              No matching algorithms or curriculum topics found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map(algo => {
              const cat = CATEGORIES.find(c => c.id === algo.categoryId);
              return (
                <button
                  key={algo.id}
                  onClick={() => {
                    soundFx.playClick();
                    onSelectAlgorithm(algo);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-2xl hover:bg-[#F4F0FF] transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#201538] group-hover:text-[#7B42F6] transition-colors">
                        {algo.name}
                      </span>
                      {cat && (
                        <span className="text-[10px] font-mono font-bold text-[#7B42F6] bg-[#F8F6FE] border border-[#E5DCF9] px-2 py-0.2 rounded-md">
                          {cat.title}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#7B6E96] line-clamp-1">
                      {algo.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono font-bold text-[#5521B5] bg-[#F4F0FF] border border-[#E5DCF9] px-2 py-0.5 rounded-lg shadow-2xs">
                      {algo.complexity.worst}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#C4B5E9] group-hover:text-[#7B42F6] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#F8F6FE] border-t border-[#E5DCF9] flex items-center justify-between text-[11px] font-mono text-[#7B6E96]">
          <span>KCT DAA 23CS401 Curriculum</span>
          <span>Press Enter or click to navigate</span>
        </div>
      </div>
    </div>
  );
};
