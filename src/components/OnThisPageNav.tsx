import React, { useState } from 'react';
import { ChevronUp, ChevronDown, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export interface OnThisPageItem {
  id: string;
  label: string;
  badge?: string;
}

interface OnThisPageNavProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  completedIds?: string[];
  totalAlgorithmsCount?: number;
}

export const OnThisPageNav: React.FC<OnThisPageNavProps> = ({
  activeSection,
  onSelectSection,
  completedIds = [],
  totalAlgorithmsCount = 35
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const sections: OnThisPageItem[] = [
    { id: 'sec-summary', label: 'Summary' },
    { id: 'sec-visualizer', label: 'Real-Time Visualizer Stage' },
    { id: 'sec-registers', label: 'Live CPU Registers & Invariants' },
    { id: 'sec-playback', label: 'Interactive Stepping & Playback' },
    { id: 'sec-dryrun', label: 'Step-by-Step Dry Run Worksheet' },
    { id: 'sec-complexity', label: 'Complexity Bounds & Proofs' },
    { id: 'sec-code', label: 'Multi-Language Trace (C++, Java, Python)' },
    { id: 'sec-exam', label: 'KCT Autonomous Exam Tips & Viva' },
    { id: 'sec-quiz', label: 'Interactive Prediction Quiz' },
    { id: 'sec-race', label: 'Multi-Algorithm Race Arena', badge: 'Live' }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-[#E5DCF9] p-4 shadow-sm shadow-[#E5DCF9]/40 select-none">
      {/* Header with accordion toggle */}
      <button
        onClick={() => {
          soundFx.playClick();
          setIsExpanded(!isExpanded);
        }}
        className="w-full flex items-center justify-between text-xs font-bold text-[#201538] uppercase tracking-wider pb-2 border-b border-[#E5DCF9] cursor-pointer"
      >
        <span>ON THIS PAGE</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-[#7B6E96]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#7B6E96]" />
        )}
      </button>

      {/* Nav List */}
      {isExpanded && (
        <nav className="mt-3 space-y-1">
          {sections.map(sec => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectSection(sec.id);
                  const el = document.getElementById(sec.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`w-full text-left py-1.5 px-2 rounded-lg text-xs transition-colors flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? 'text-[#7B42F6] font-bold border-l-2 border-[#7B42F6] pl-2.5 bg-[#F4F0FF]'
                    : 'text-[#61527E] hover:text-[#201538] hover:bg-[#F8F6FE]'
                }`}
              >
                <span className="truncate">{sec.label}</span>
                {sec.badge && (
                  <span className="text-[10px] font-mono font-bold text-[#7B42F6] bg-[#F4F0FF] border border-[#E5DCF9] px-1.5 py-0.2 rounded-full">
                    {sec.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      )}

      {/* Syllabus Completion Quick Stat */}
      <div className="mt-4 pt-3 border-t border-[#E5DCF9]">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#7B6E96] mb-1.5">
          <span>Student Lab Progress:</span>
          <span className="font-bold text-[#201538]">
            {completedIds.length}/{totalAlgorithmsCount}
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#F0EBFD] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#7B42F6] rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.round((completedIds.length / totalAlgorithmsCount) * 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
