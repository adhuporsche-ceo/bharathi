import React, { useState } from 'react';
import { CodeSnippet } from '../data/daaData';
import { Code2, Copy, Check } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface CodeTraceViewProps {
  codeSnippets: CodeSnippet;
  activeLine: number;
}

export const CodeTraceView: React.FC<CodeTraceViewProps> = ({ codeSnippets, activeLine }) => {
  const [selectedLang, setSelectedLang] = useState<'cpp' | 'java' | 'python' | 'pseudo'>('cpp');
  const [copied, setCopied] = useState(false);

  const rawCode = codeSnippets[selectedLang] || codeSnippets.cpp;
  const lines = rawCode.split('\n');

  const handleCopy = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl bg-white border-2 border-[#E5DCF9] p-5 shadow-sm shadow-[#E5DCF9]/40 select-none space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5DCF9]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-[#F4F0FF] text-[#7B42F6]">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-black text-[#201538] uppercase tracking-wider font-mono block">
              Multi-Language Implementation Trace
            </span>
            <span className="text-[11px] text-[#7B6E96]">
              Synchronized line cursor executes in real time
            </span>
          </div>
        </div>

        {/* Language Tabs & Copy Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#F4F0FF] p-1 rounded-xl border border-[#E5DCF9]">
            {(['cpp', 'java', 'python', 'pseudo'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedLang(lang);
                }}
                className={`px-3 py-1 text-xs rounded-lg transition-all uppercase font-mono font-bold cursor-pointer ${
                  selectedLang === lang
                    ? 'bg-[#7B42F6] text-white shadow-xs'
                    : 'text-[#61527E] hover:text-[#7B42F6] hover:bg-white/80'
                }`}
              >
                {lang === 'cpp' ? 'C++' : lang === 'pseudo' ? 'Pseudo' : lang}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-xl border border-[#E5DCF9] text-[#61527E] hover:text-[#7B42F6] hover:bg-[#F4F0FF] transition-colors"
            title="Copy source code"
          >
            {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Code Editor Body - Deep Purple Syntax Box */}
      <div className="overflow-x-auto p-4 rounded-2xl bg-[#180E2B] border border-[#2D1B4E] font-mono text-xs shadow-inner">
        {lines.map((line, idx) => {
          const lineNum = idx + 1;
          const isActive = lineNum === activeLine;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 px-3 py-0.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-[#7B42F6]/30 text-[#F5B800] font-bold border-l-4 border-[#F5B800] shadow-xs'
                  : 'text-[#D4C7F5] hover:bg-[#251545]'
              }`}
            >
              <span className={`w-6 text-right select-none text-[11px] ${isActive ? 'text-[#F5B800] font-bold' : 'text-[#7C6E96]'}`}>
                {lineNum}
              </span>
              <pre className="m-0 leading-5 whitespace-pre font-mono">{line}</pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};
