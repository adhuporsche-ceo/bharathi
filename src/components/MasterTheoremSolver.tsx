import React, { useState } from 'react';
import { Calculator, Code2, GitBranch, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const MasterTheoremSolver: React.FC = () => {
  const [a, setA] = useState(2);
  const [b, setB] = useState(2);
  const [k, setK] = useState(1);

  const presets = [
    { label: 'Merge Sort', a: 2, b: 2, k: 1, formula: 'T(n) = 2T(n/2) + Θ(n)' },
    { label: 'Binary Search', a: 1, b: 2, k: 0, formula: 'T(n) = T(n/2) + Θ(1)' },
    { label: 'Karatsuba Fast Mult.', a: 3, b: 2, k: 1, formula: 'T(n) = 3T(n/2) + Θ(n)' },
    { label: "Strassen's Matrix Mult.", a: 7, b: 2, k: 2, formula: 'T(n) = 7T(n/2) + Θ(n²)' },
  ];

  const logBOfA = Math.log(a) / Math.log(b);
  const epsilon = 0.001;

  let caseNum = 1;
  let caseTitle = '';
  let closedForm = '';
  let rationale = '';

  if (k < logBOfA - epsilon) {
    caseNum = 1;
    caseTitle = 'Case 1: Leaves Dominate Cost (f(n) = O(n^(log_b(a) - ε)))';
    closedForm = `Θ(n^(log_${b}(${a}))) ≈ Θ(n^${logBOfA.toFixed(2)})`;
    rationale = `Since k (${k}) < log_b(a) (${logBOfA.toFixed(2)}), the total cost is dominated by the work done at the leaf nodes (subproblems).`;
  } else if (Math.abs(k - logBOfA) <= epsilon) {
    caseNum = 2;
    caseTitle = 'Case 2: Balanced Cost Across Levels (f(n) = Θ(n^(log_b(a))))';
    closedForm = k === 0 ? 'Θ(log n)' : k === 1 ? 'Θ(n log n)' : `Θ(n^${k} log n)`;
    rationale = `Since k (${k}) = log_b(a) (${logBOfA.toFixed(2)}), each of the log_b(n) levels of the recursion tree incurs identical computational cost.`;
  } else {
    caseNum = 3;
    caseTitle = 'Case 3: Root Division & Merge Dominates (f(n) = Ω(n^(log_b(a) + ε)))';
    closedForm = k === 1 ? 'Θ(n)' : `Θ(n^${k})`;
    rationale = `Since k (${k}) > log_b(a) (${logBOfA.toFixed(2)}), the top-level division and recombination work dominates the subproblems.`;
  }

  return (
    <div className="w-full bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-100/50 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-sky-100">
        <div>
          <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>KCT DAA Unit 1 · Recurrence Solver</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Interactive Master Theorem Calculator
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluate standard divide-and-conquer recurrences: <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">T(n) = a·T(n/b) + Θ(n^k)</span>
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          log_{b}({a}) = {logBOfA.toFixed(2)}
        </span>
      </div>

      {/* Preset Algorithms */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Preset University Curricula Recurrences:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundFx.playClick();
                setA(p.a);
                setB(p.b);
                setK(p.k);
              }}
              className="p-3 text-left rounded-xl border border-sky-100 bg-sky-50/40 hover:bg-sky-50 hover:border-sky-300 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 group-hover:text-sky-700">{p.label}</span>
                <Code2 className="w-3.5 h-3.5 text-sky-500 opacity-60 group-hover:opacity-100" />
              </div>
              <span className="font-mono text-[11px] text-sky-800 font-medium block mt-1">
                {p.formula}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-slate-50/80 border border-slate-200/80 rounded-xl p-4">
        {/* Subproblems a */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700">a (subproblems)</span>
            <span className="font-mono text-sky-700 font-extrabold text-sm bg-white px-2 py-0.5 rounded border border-sky-200">
              {a}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={a}
            onChange={e => {
              soundFx.playTone(300 + Number(e.target.value) * 50, 0.04);
              setA(Number(e.target.value));
            }}
            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <span className="text-[10px] text-slate-400 block font-mono">Branches generated at each recursive call</span>
        </div>

        {/* Division factor b */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700">b (input divisor)</span>
            <span className="font-mono text-sky-700 font-extrabold text-sm bg-white px-2 py-0.5 rounded border border-sky-200">
              {b}
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="6"
            step="1"
            value={b}
            onChange={e => {
              soundFx.playTone(300 + Number(e.target.value) * 50, 0.04);
              setB(Number(e.target.value));
            }}
            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <span className="text-[10px] text-slate-400 block font-mono">Each subproblem solves input of size n/{b}</span>
        </div>

        {/* Work exponent k */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700">k (f(n) = Θ(n^k))</span>
            <span className="font-mono text-sky-700 font-extrabold text-sm bg-white px-2 py-0.5 rounded border border-sky-200">
              {k}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={k}
            onChange={e => {
              soundFx.playTone(300 + Number(e.target.value) * 50, 0.04);
              setK(Number(e.target.value));
            }}
            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <span className="text-[10px] text-slate-400 block font-mono">Cost to divide and combine solutions</span>
        </div>
      </div>

      {/* Result Card */}
      <div className="p-5 rounded-xl border-2 border-sky-200 bg-sky-50/40 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sky-600 text-white shadow-xs">
            Case #{caseNum} Active
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Condition: k = {k} vs log_b(a) = {logBOfA.toFixed(2)}
          </span>
        </div>

        <h4 className="text-base font-bold text-slate-900">{caseTitle}</h4>

        <div className="p-3 bg-white rounded-xl border border-sky-100 flex items-center justify-between shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Tight Asymptotic Bound:</span>
          <span className="text-xl font-black text-sky-700 font-mono tracking-wide">{closedForm}</span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed font-normal">{rationale}</p>
      </div>

      {/* Visual Recursion Tree Structure */}
      <div className="p-5 bg-white border border-sky-100 rounded-xl space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Layers className="w-4 h-4 text-sky-600" />
          <span>Visual Recursion Tree Levels &amp; Work Per Level</span>
        </div>

        <div className="space-y-3 pt-2">
          {/* Level 0 */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="w-16 text-slate-400 shrink-0">Level 0:</span>
            <div className="flex-1 p-2 bg-sky-50 border border-sky-200 rounded-lg flex items-center justify-between text-slate-800">
              <span className="font-bold">1 subproblem of size n</span>
              <span className="text-sky-700 font-semibold">Work: cn^{k}</span>
            </div>
          </div>

          {/* Level 1 */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="w-16 text-slate-400 shrink-0">Level 1:</span>
            <div className="flex-1 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-slate-800">
              <span className="font-bold">{a} subproblems of size n/{b}</span>
              <span className="text-blue-700 font-semibold">Work: {a}·c(n/{b})^{k}</span>
            </div>
          </div>

          {/* Level 2 */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="w-16 text-slate-400 shrink-0">Level 2:</span>
            <div className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-slate-800">
              <span className="font-bold">{a * a} subproblems of size n/{b * b}</span>
              <span className="text-slate-700 font-semibold">Work: {a * a}·c(n/{b * b})^{k}</span>
            </div>
          </div>

          {/* Leaf Level */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="w-16 text-slate-400 shrink-0">Leaves:</span>
            <div className="flex-1 p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-slate-800">
              <span className="font-bold">n^(log_{b}({a})) ≈ n^{logBOfA.toFixed(2)} leaves</span>
              <span className="text-emerald-700 font-semibold">Total Leaves: Θ(n^{logBOfA.toFixed(2)})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
