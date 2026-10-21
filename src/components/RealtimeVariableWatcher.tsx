import React from 'react';
import { Activity, ArrowLeftRight, Check, Eye, ShieldCheck, Zap } from 'lucide-react';
import { AlgorithmStep } from '../data/daaData';

interface RealtimeVariableWatcherProps {
  step: AlgorithmStep;
  algorithmId: string;
}

export const RealtimeVariableWatcher: React.FC<RealtimeVariableWatcherProps> = ({ step, algorithmId }) => {
  const vars = step.variables || {};
  const entries = Object.entries(vars);

  // Compute loop invariant text based on algorithm
  const getLoopInvariant = () => {
    switch (algorithmId) {
      case 'bubble_sort':
        return 'Invariant: Suffix subarray A[n-i .. n-1] contains the largest i elements in final sorted order.';
      case 'selection_sort':
        return 'Invariant: Prefix subarray A[0 .. i-1] contains the smallest i elements in fully sorted order.';
      case 'insertion_sort':
        return 'Invariant: Subarray A[0 .. i-1] consists of the original elements but in sorted order.';
      case 'binary_search':
        return 'Invariant: If target key exists in array, it must lie within the search interval A[low .. high].';
      case 'stack_ds':
        return 'Invariant: Elements are accessed strictly LIFO; top pointer always indexes the most recently pushed element.';
      case 'queue_ds':
        return 'Invariant: Elements are served strictly FIFO; front pointer tracks the head and rear pointer tracks tail.';
      case 'knapsack_dp':
        return 'Invariant: DP[i][w] holds the maximum achievable value using a subset of first i items with weight limit w.';
      default:
        return 'Invariant: Algorithm execution step maintains structural pre- and post-conditions.';
    }
  };

  return (
    <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4 select-none">
      {/* Top row: Real-time badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5DCF9]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-[#F4F0FF] text-[#7B42F6]">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-xs font-black text-[#201538] tracking-wide uppercase font-mono">
            Real-Time State &amp; Variable Watcher
          </span>
        </div>

        <div className="flex items-center gap-2">
          {step.comparisonsCount !== undefined && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#F4F0FF] border border-[#E5DCF9] text-[#7B42F6] text-xs font-mono font-bold shadow-2xs">
              <Eye className="w-3.5 h-3.5 text-[#7B42F6]" />
              <span>Comparisons: {step.comparisonsCount}</span>
            </div>
          )}

          {step.swapsCount !== undefined && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FEF9C3] border border-[#F5B800] text-[#854D0E] text-xs font-mono font-bold shadow-2xs">
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#F5B800]" />
              <span>Swaps: {step.swapsCount}</span>
            </div>
          )}
        </div>
      </div>

      {/* Variable pills */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-[#7B6E96] uppercase tracking-wider font-mono">
          Live CPU Registers &amp; Pointer States:
        </span>
        {entries.length === 0 ? (
          <div className="text-xs text-[#8C7DA8] italic">No local registers active in current step</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {entries.map(([key, val]) => (
              <div
                key={key}
                className="px-3.5 py-1.5 rounded-xl bg-[#F8F6FE] border border-[#E5DCF9] text-xs font-mono font-semibold flex items-center gap-2 shadow-2xs"
              >
                <span className="text-[#7B42F6] font-bold">{key}</span>
                <span className="text-[#7B6E96]">=</span>
                <span className="text-[#201538] bg-white px-2 py-0.5 rounded-lg border border-[#E5DCF9] font-bold">
                  {val}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Loop invariant notification */}
      <div className="p-3.5 rounded-2xl bg-[#ECFDF5] border border-[#10B981]/40 text-[#065F46] text-xs flex items-start gap-2.5 shadow-2xs">
        <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
        <span className="leading-relaxed font-semibold">{getLoopInvariant()}</span>
      </div>
    </div>
  );
};
