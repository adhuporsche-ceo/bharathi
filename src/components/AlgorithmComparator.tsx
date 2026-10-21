import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Play, Pause, RotateCcw, Trophy, Zap, BarChart2, Eye, Shuffle } from 'lucide-react';
import {
  generateBubbleSortSteps,
  generateSelectionSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateHeapSortSteps
} from '../engine/algorithms/sorting';
import { soundFx } from '../utils/soundEffects';

type SupportedSorting = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap';

const ALGO_METADATA: Record<SupportedSorting, { name: string; complexity: string; best: string; worst: string }> = {
  bubble: { name: 'Bubble Sort', complexity: 'O(n²)', best: 'O(n)', worst: 'O(n²)' },
  selection: { name: 'Selection Sort', complexity: 'O(n²)', best: 'O(n²)', worst: 'O(n²)' },
  insertion: { name: 'Insertion Sort', complexity: 'O(n²)', best: 'O(n)', worst: 'O(n²)' },
  merge: { name: 'Merge Sort', complexity: 'O(n log n)', best: 'O(n log n)', worst: 'O(n log n)' },
  quick: { name: 'Quick Sort', complexity: 'O(n log n)', best: 'O(n log n)', worst: 'O(n²)' },
  heap: { name: 'Heap Sort', complexity: 'O(n log n)', best: 'O(n log n)', worst: 'O(n log n)' }
};

export const AlgorithmComparator: React.FC = () => {
  const [inputArray, setInputArray] = useState<number[]>([65, 35, 80, 25, 90, 45, 15, 70]);
  const [algoLeft, setAlgoLeft] = useState<SupportedSorting>('bubble');
  const [algoRight, setAlgoRight] = useState<SupportedSorting>('quick');

  // Real-time race state
  const [isRacing, setIsRacing] = useState(false);
  const [raceStepLeft, setRaceStepLeft] = useState(0);
  const [raceStepRight, setRaceStepRight] = useState(0);
  const [raceFinished, setRaceFinished] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const getSteps = (type: SupportedSorting) => {
    switch (type) {
      case 'bubble': return generateBubbleSortSteps(inputArray);
      case 'selection': return generateSelectionSortSteps(inputArray);
      case 'insertion': return generateInsertionSortSteps(inputArray);
      case 'merge': return generateMergeSortSteps(inputArray);
      case 'quick': return generateQuickSortSteps(inputArray);
      case 'heap': return generateHeapSortSteps(inputArray);
    }
  };

  const stepsLeft = getSteps(algoLeft);
  const stepsRight = getSteps(algoRight);

  // Live race loop
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isRacing) {
      timer = setInterval(() => {
        let finishedL = false;
        let finishedR = false;

        setRaceStepLeft(prevL => {
          if (prevL < stepsLeft.length - 1) {
            return prevL + 1;
          } else {
            finishedL = true;
            return prevL;
          }
        });

        setRaceStepRight(prevR => {
          if (prevR < stepsRight.length - 1) {
            return prevR + 1;
          } else {
            finishedR = true;
            return prevR;
          }
        });

        if (finishedL || finishedR) {
          if (finishedL && !finishedR) {
            setWinner(`${ALGO_METADATA[algoLeft].name.toUpperCase()}`);
            setRaceFinished(true);
            setIsRacing(false);
            soundFx.playSuccessChime();
          } else if (finishedR && !finishedL) {
            setWinner(`${ALGO_METADATA[algoRight].name.toUpperCase()}`);
            setRaceFinished(true);
            setIsRacing(false);
            soundFx.playSuccessChime();
          } else if (finishedL && finishedR) {
            setWinner('TIE / SIMULTANEOUS COMPLETION');
            setRaceFinished(true);
            setIsRacing(false);
            soundFx.playSuccessChime();
          }
        }
      }, 100);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRacing, stepsLeft.length, stepsRight.length, algoLeft, algoRight]);

  const handleStartRace = () => {
    soundFx.playClick();
    setRaceStepLeft(0);
    setRaceStepRight(0);
    setRaceFinished(false);
    setWinner(null);
    setIsRacing(true);
  };

  const handleResetRace = () => {
    soundFx.playClick();
    setIsRacing(false);
    setRaceStepLeft(0);
    setRaceStepRight(0);
    setRaceFinished(false);
    setWinner(null);
  };

  const handleRandomizeData = () => {
    soundFx.playClick();
    const newArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 10);
    setInputArray(newArr);
    handleResetRace();
  };

  const handleNearlySorted = () => {
    soundFx.playClick();
    setInputArray([15, 25, 35, 50, 45, 65, 80, 90]);
    handleResetRace();
  };

  const handleReverseSorted = () => {
    soundFx.playClick();
    setInputArray([95, 85, 75, 65, 55, 45, 35, 15]);
    handleResetRace();
  };

  const currentStepL = stepsLeft[Math.min(raceStepLeft, stepsLeft.length - 1)];
  const currentStepR = stepsRight[Math.min(raceStepRight, stepsRight.length - 1)];

  const progressL = Math.round((raceStepLeft / Math.max(1, stepsLeft.length - 1)) * 100);
  const progressR = Math.round((raceStepRight / Math.max(1, stepsRight.length - 1)) * 100);

  const arrayL = currentStepL.arrayState || inputArray;
  const arrayR = currentStepR.arrayState || inputArray;
  const maxVal = Math.max(...inputArray, 10);

  return (
    <div className="space-y-6">
      {/* Header & Control Center */}
      <div className="bg-white border border-sky-100 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                Synchronous Benchmark Studio
              </span>
              <span className="text-xs font-mono text-slate-500">KCT 23CS401 Experimental Arena</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <ArrowLeftRight className="w-6 h-6 text-sky-600" />
              <span>Multi-Algorithm Race Arena</span>
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mt-1">
              Test two sorting algorithms synchronously against identical datasets. Inspect why O(n log n) Divide-and-Conquer dominates O(n²) quadratic approaches!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {!isRacing ? (
              <button
                onClick={handleStartRace}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Race</span>
              </button>
            ) : (
              <button
                onClick={() => setIsRacing(false)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={handleResetRace}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleRandomizeData}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100 text-xs font-bold transition-all cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Random</span>
            </button>
          </div>
        </div>

        {/* Input Distribution Selectors */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs font-mono">
          <span className="text-slate-500 font-semibold">Test Distributions:</span>
          <button
            onClick={handleRandomizeData}
            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-sky-300 text-slate-700 font-bold bg-white"
          >
            Random 8
          </button>
          <button
            onClick={handleNearlySorted}
            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-sky-300 text-slate-700 font-bold bg-white"
          >
            Nearly Sorted (Best Case)
          </button>
          <button
            onClick={handleReverseSorted}
            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-sky-300 text-slate-700 font-bold bg-white"
          >
            Reverse Sorted (Worst Case)
          </button>
        </div>
      </div>

      {/* Podium Winner Banner */}
      {raceFinished && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Trophy className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase font-mono">Race Completed</span>
              <h3 className="text-lg font-black text-emerald-950">
                Winner: {winner}!
              </h3>
              <p className="text-xs text-emerald-800">
                Completed with fewer comparisons and step operations on this input distribution.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Side by Side Dual Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TRACK A */}
        <div className="bg-white border border-sky-100 rounded-3xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                A
              </span>
              <select
                value={algoLeft}
                onChange={e => {
                  soundFx.playClick();
                  setAlgoLeft(e.target.value as SupportedSorting);
                  handleResetRace();
                }}
                disabled={isRacing}
                className="text-sm font-extrabold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="merge">Merge Sort</option>
                <option value="quick">Quick Sort</option>
                <option value="heap">Heap Sort</option>
              </select>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-sky-700">{ALGO_METADATA[algoLeft].complexity}</span>
              <span className="text-[10px] text-slate-400 block font-mono">Worst Case</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-600">
              <span>Progress: Step {raceStepLeft}/{stepsLeft.length - 1}</span>
              <span>{progressL}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressL}%` }}
                className="h-full bg-sky-600 rounded-full transition-all duration-100"
              />
            </div>
          </div>

          {/* Miniature Array Visualization */}
          <div className="h-44 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 flex items-end justify-center gap-2">
            {arrayL.map((val, idx) => {
              const h = Math.max(15, (val / maxVal) * 100);
              const isActive = currentStepL.activeIndices?.includes(idx);
              const isSwapped = currentStepL.swappedIndices?.includes(idx);
              const isSorted = currentStepL.sortedIndices?.includes(idx);

              let bg = 'bg-sky-500';
              if (isSwapped) bg = 'bg-rose-500';
              else if (isActive) bg = 'bg-amber-400';
              else if (isSorted) bg = 'bg-emerald-500';

              return (
                <div key={idx} className="flex-1 max-w-[36px] flex flex-col items-center justify-end h-full">
                  <span className="text-[9px] font-mono font-bold text-slate-600 mb-1">{val}</span>
                  <div
                    style={{ height: `${h}%` }}
                    className={`w-full rounded-t-lg transition-all duration-100 ${bg}`}
                  />
                  <span className="text-[8px] font-mono text-slate-400 mt-1">[{idx}]</span>
                </div>
              );
            })}
          </div>

          {/* Live Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100">
              <span className="text-[10px] text-slate-500 block">Comparisons</span>
              <span className="text-base font-bold text-sky-800">{currentStepL.comparisonsCount ?? currentStepL.stats?.comparisons ?? 0}</span>
            </div>
            <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100">
              <span className="text-[10px] text-slate-500 block">Swaps / Writes</span>
              <span className="text-base font-bold text-sky-800">{currentStepL.swapsCount ?? currentStepL.stats?.swaps ?? 0}</span>
            </div>
          </div>
        </div>

        {/* TRACK B */}
        <div className="bg-white border border-sky-100 rounded-3xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                B
              </span>
              <select
                value={algoRight}
                onChange={e => {
                  soundFx.playClick();
                  setAlgoRight(e.target.value as SupportedSorting);
                  handleResetRace();
                }}
                disabled={isRacing}
                className="text-sm font-extrabold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="merge">Merge Sort</option>
                <option value="quick">Quick Sort</option>
                <option value="heap">Heap Sort</option>
              </select>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-700">{ALGO_METADATA[algoRight].complexity}</span>
              <span className="text-[10px] text-slate-400 block font-mono">Worst Case</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-600">
              <span>Progress: Step {raceStepRight}/{stepsRight.length - 1}</span>
              <span>{progressR}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressR}%` }}
                className="h-full bg-emerald-600 rounded-full transition-all duration-100"
              />
            </div>
          </div>

          {/* Miniature Array Visualization */}
          <div className="h-44 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 flex items-end justify-center gap-2">
            {arrayR.map((val, idx) => {
              const h = Math.max(15, (val / maxVal) * 100);
              const isActive = currentStepR.activeIndices?.includes(idx);
              const isSwapped = currentStepR.swappedIndices?.includes(idx);
              const isSorted = currentStepR.sortedIndices?.includes(idx);

              let bg = 'bg-emerald-500';
              if (isSwapped) bg = 'bg-rose-500';
              else if (isActive) bg = 'bg-amber-400';
              else if (isSorted) bg = 'bg-emerald-600';

              return (
                <div key={idx} className="flex-1 max-w-[36px] flex flex-col items-center justify-end h-full">
                  <span className="text-[9px] font-mono font-bold text-slate-600 mb-1">{val}</span>
                  <div
                    style={{ height: `${h}%` }}
                    className={`w-full rounded-t-lg transition-all duration-100 ${bg}`}
                  />
                  <span className="text-[8px] font-mono text-slate-400 mt-1">[{idx}]</span>
                </div>
              );
            })}
          </div>

          {/* Live Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <span className="text-[10px] text-slate-500 block">Comparisons</span>
              <span className="text-base font-bold text-emerald-800">{currentStepR.comparisonsCount ?? currentStepR.stats?.comparisons ?? 0}</span>
            </div>
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <span className="text-[10px] text-slate-500 block">Swaps / Writes</span>
              <span className="text-base font-bold text-emerald-800">{currentStepR.swapsCount ?? currentStepR.stats?.swaps ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
