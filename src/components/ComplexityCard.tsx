import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, GraduationCap, ChevronDown, ChevronRight, Code2, BookOpen } from 'lucide-react';
import { AlgorithmItem } from '../data/daaData';
import { soundFx } from '../utils/soundEffects';

interface ComplexityCardProps {
  algorithm: AlgorithmItem;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const ComplexityCard: React.FC<ComplexityCardProps> = ({
  algorithm,
  isCompleted,
  onToggleComplete,
}) => {
  const [showMetricRules, setShowMetricRules] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 shadow-sm shadow-[#E5DCF9]/40 space-y-5 select-none">
      {/* 1. Visualizer Input Requirements */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-[#7B42F6]" />
          <h3 className="text-xs font-extrabold text-[#7B42F6] uppercase tracking-wider font-mono">
            Visualizer Input Requirements
          </h3>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F8F6FE] border border-[#E5DCF9] text-xs font-medium text-[#201538] flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7B42F6] shrink-0 animate-pulse" />
          <span className="leading-relaxed font-semibold">{algorithm.inputRequirement}</span>
        </div>

        <button
          onClick={() => {
            soundFx.playSuccessChime();
            onToggleComplete();
          }}
          className={`w-full py-2.5 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
            isCompleted
              ? 'bg-[#10B981] hover:bg-[#059669] text-white ring-2 ring-emerald-300'
              : 'bg-[#F4F0FF] hover:bg-[#ECE6FD] text-[#5521B5] border border-[#E5DCF9] hover:border-[#7B42F6]'
          }`}
        >
          <CheckCircle className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-[#7B42F6]'}`} />
          <span>{isCompleted ? '✓ Completed! Saved to Student Record' : 'Mark Completed'}</span>
        </button>
      </div>

      <div className="border-t border-[#E5DCF9]" />

      {/* 2. Complexity Metric 4 Boxes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black text-[#201538] tracking-tight">
            Asymptotic Complexity Analysis
          </h3>
          <span className="text-[11px] font-mono font-bold text-[#7B6E96]">
            Big-O Bounds
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono">
          {/* Best Case */}
          <div className="p-4 bg-[#F8F6FE] rounded-2xl border-2 border-[#E5DCF9] hover:border-[#7B42F6] transition-colors shadow-2xs">
            <span className="text-[11px] text-[#7B6E96] block mb-1 font-bold uppercase tracking-wider">
              Best Case Ω
            </span>
            <span className="text-xl font-black text-[#7B42F6] block">
              {algorithm.complexity.best}
            </span>
          </div>

          {/* Average Case */}
          <div className="p-4 bg-[#F8F6FE] rounded-2xl border-2 border-[#E5DCF9] hover:border-[#7B42F6] transition-colors shadow-2xs">
            <span className="text-[11px] text-[#7B6E96] block mb-1 font-bold uppercase tracking-wider">
              Average Case Θ
            </span>
            <span className="text-xl font-black text-[#7B42F6] block">
              {algorithm.complexity.average}
            </span>
          </div>

          {/* Worst Case */}
          <div className="p-4 bg-[#F8F6FE] rounded-2xl border-2 border-[#E5DCF9] hover:border-[#7B42F6] transition-colors shadow-2xs">
            <span className="text-[11px] text-[#7B6E96] block mb-1 font-bold uppercase tracking-wider">
              Worst Case O
            </span>
            <span className="text-xl font-black text-[#7B42F6] block">
              {algorithm.complexity.worst}
            </span>
          </div>

          {/* Auxiliary Space */}
          <div className="p-4 bg-[#F8F6FE] rounded-2xl border-2 border-[#E5DCF9] hover:border-[#7B42F6] transition-colors shadow-2xs">
            <span className="text-[11px] text-[#7B6E96] block mb-1 font-bold uppercase tracking-wider">
              Auxiliary Space
            </span>
            <span className="text-xl font-black text-[#7B42F6] block">
              {algorithm.complexity.space}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5DCF9]" />

      {/* 3. Learning & Common Mistakes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-[#201538]">
            Concept Learning &amp; Examination Notes
          </h3>
          <span
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase font-mono ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-[#F4F0FF] text-[#7B42F6] border border-[#E5DCF9]'
            }`}
          >
            {isCompleted ? '✓ Completed' : 'Not completed yet'}
          </span>
        </div>

        <p className="text-xs text-[#635380] leading-relaxed">
          Use this module when the data shape matches the visual mode. Observe element movements and invariant holds.
        </p>

        {/* Common Pitfall Box - Golden Yellow Accent */}
        <div className="p-3.5 bg-[#FEF9C3]/70 rounded-2xl border border-[#F5B800] flex items-start gap-2.5 text-xs text-[#78350F] shadow-2xs">
          <AlertTriangle className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="block text-[#92400E] mb-0.5">Common Student Pitfall:</strong>
            {algorithm.commonMistake}
          </div>
        </div>

        {/* KCT DAA Exam Note Box - Royal Violet Accent */}
        <div className="p-4 bg-[#F4F0FF] rounded-2xl border-2 border-[#7B42F6] flex items-start gap-3 text-xs text-[#201538] shadow-2xs">
          <GraduationCap className="w-5 h-5 text-[#7B42F6] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-extrabold text-[#7B42F6] text-xs uppercase tracking-wide block font-mono">
              🎓 KCT 23CS401 Exam Standard Note:
            </span>
            <p className="leading-relaxed font-medium text-[#201538]">
              {algorithm.kctExamTip}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5DCF9]" />

      {/* 4. Metric Rules Accordion */}
      <div>
        <button
          onClick={() => {
            soundFx.playClick();
            setShowMetricRules(!showMetricRules);
          }}
          className="w-full flex items-center justify-between text-xs font-bold text-[#635380] hover:text-[#7B42F6] py-1 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            {showMetricRules ? <ChevronDown className="w-4 h-4 text-[#7B42F6]" /> : <ChevronRight className="w-4 h-4 text-[#7B6E96]" />}
            <span>Algorithm Metric Invariants &amp; Paradigms</span>
          </span>
          <span className="text-[10px] font-mono text-[#7B6E96]">Rules</span>
        </button>

        {showMetricRules && (
          <div className="mt-2.5 p-3.5 bg-[#F8F6FE] border border-[#E5DCF9] rounded-2xl text-xs text-[#635380] space-y-1.5 animate-in fade-in-50">
            <p className="flex items-center justify-between">
              <span>In-place memory usage:</span>
              <strong className="font-mono text-[#201538]">{algorithm.complexity.inPlace}</strong>
            </p>
            <p className="flex items-center justify-between">
              <span>Sorting Stability:</span>
              <strong className="font-mono text-[#201538]">{algorithm.complexity.stability}</strong>
            </p>
            <p className="flex items-center justify-between">
              <span>Algorithmic Design Paradigm:</span>
              <strong className="font-mono text-[#7B42F6]">{algorithm.complexity.paradigm}</strong>
            </p>
          </div>
        )}
      </div>

      {/* 5. Glossary Accordion */}
      <div>
        <button
          onClick={() => {
            soundFx.playClick();
            setShowGlossary(!showGlossary);
          }}
          className="w-full flex items-center justify-between text-xs font-bold text-[#635380] hover:text-[#7B42F6] py-1 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            {showGlossary ? <ChevronDown className="w-4 h-4 text-[#7B42F6]" /> : <ChevronRight className="w-4 h-4 text-[#7B6E96]" />}
            <span>Glossary &amp; Viva Definitions ({algorithm.glossary.length})</span>
          </span>
          <span className="text-[10px] font-mono text-[#7B6E96]">Dictionary</span>
        </button>

        {showGlossary && (
          <div className="mt-2.5 p-3.5 bg-[#F8F6FE] border border-[#E5DCF9] rounded-2xl text-xs text-[#635380] space-y-2 animate-in fade-in-50">
            {algorithm.glossary.map((item, idx) => (
              <div key={idx} className="pb-1.5 border-b border-[#E5DCF9] last:border-0 last:pb-0">
                <span className="font-bold text-[#7B42F6] font-mono">{item.term}:</span>{' '}
                <span>{item.definition}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
