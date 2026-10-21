import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Play,
  Pause,
  Activity,
  Cpu,
  Clock,
  Shuffle,
  Volume2,
  VolumeX,
  ShieldCheck,
  FileText,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { AlgorithmStep } from '../data/daaData';
import { soundFx } from '../utils/soundEffects';

interface CheggRightSidebarProps {
  algorithmName: string;
  currentStep: AlgorithmStep;
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  onPresetRandom: () => void;
  onPresetNearlySorted: () => void;
  onPresetReversed: () => void;
  onOpenCustomModal: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onLaunchRaceArena: () => void;
}

export const CheggRightSidebar: React.FC<CheggRightSidebarProps> = ({
  algorithmName,
  currentStep,
  currentStepIndex,
  totalSteps,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onChangeSpeed,
  onPresetRandom,
  onPresetNearlySorted,
  onPresetReversed,
  onOpenCustomModal,
  isAudioMuted,
  onToggleAudio,
  onLaunchRaceArena
}) => {
  // Real-time elapsed timer
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-5 select-none">
      {/* 1. HERO PROMO CARD (Deep Purple with Golden & Violet Highlights) */}
      <div className="bg-[#201538] text-white rounded-3xl p-6 shadow-xl border border-[#3E2C68] relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B42F6]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Small gold caps category */}
        <span className="text-[11px] font-mono font-extrabold text-[#F5B800] uppercase tracking-wider block mb-2">
          REAL-TIME SIMULATOR
        </span>

        {/* Large bold headline */}
        <h3 className="text-xl font-black text-white tracking-tight leading-snug">
          Master DAA in Real Time with Step Traces
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-[#D4C7F5] mt-2.5 leading-relaxed">
          Join thousands of engineering students mastering algorithms with real-time memory mutation, register inspection, and instant viva feedback.
        </p>

        {/* Bullet points with crisp circular dots */}
        <ul className="mt-4 space-y-2 text-xs text-[#E5DCF9]">
          <li className="flex items-start gap-2">
            <span className="text-[#F5B800] font-bold text-sm leading-none">•</span>
            <span>Real-time CPU register &amp; invariant watcher</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#F5B800] font-bold text-sm leading-none">•</span>
            <span>Interactive dry run worksheets for lab viva</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#F5B800] font-bold text-sm leading-none">•</span>
            <span>Deterministic step execution with zero lag</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#F5B800] font-bold text-sm leading-none">•</span>
            <span>Multi-language syntax (C++, Java, Python)</span>
          </li>
        </ul>

        {/* 50K+ High Visibility Stat Box */}
        <div className="mt-5 p-4 rounded-2xl bg-[#2E1D50] border border-[#7B42F6]/40 flex items-center gap-3">
          <div className="text-2xl font-black text-[#F5B800] font-mono shrink-0">
            50K+
          </div>
          <div className="text-[11px] text-[#D4C7F5] leading-tight">
            <strong>Traces Simulated</strong> across autonomous engineering college batches
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onTogglePlay();
          }}
          className="mt-5 w-full py-3 px-5 rounded-full bg-[#7B42F6] hover:bg-[#6B31E6] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#7B42F6]/40 transition-transform active:scale-98 cursor-pointer"
        >
          <span>{isPlaying ? 'Pause Real-Time Simulation' : 'Launch Real-Time Run'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. REAL-TIME TELEMETRY & HARDWARE MONITOR CARD */}
      <div className="bg-white rounded-3xl border-2 border-[#E5DCF9] p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#7B42F6]" />
            <h4 className="text-xs font-bold text-[#201538] tracking-wide uppercase font-mono">
              Engine Telemetry
            </h4>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#065F46] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#10B981]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>LIVE</span>
          </span>
        </div>

        {/* Real-time Clock & Performance Metrics */}
        <div className="grid grid-cols-2 gap-2 font-mono">
          <div className="p-2.5 rounded-xl bg-[#F8F6FE] border border-[#E5DCF9]">
            <span className="text-[10px] text-[#7B6E96] font-bold block uppercase">Sim Timer</span>
            <span className="text-sm font-black text-[#201538] mt-0.5 block flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#A490D1]" />
              <span>{formatTimer(secondsElapsed)}</span>
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#F8F6FE] border border-[#E5DCF9]">
            <span className="text-[10px] text-[#7B6E96] font-bold block uppercase">CPU Clock</span>
            <span className="text-sm font-black text-[#201538] mt-0.5 block flex items-center gap-1">
              <Cpu className="w-3 h-3 text-[#A490D1]" />
              <span>24.0 kHz</span>
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#F8F6FE] border border-[#E5DCF9]">
            <span className="text-[10px] text-[#7B6E96] font-bold block uppercase">Comparisons</span>
            <span className="text-sm font-black text-[#7B42F6] mt-0.5 block">
              {currentStep.comparisonsCount ?? 0}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#F8F6FE] border border-[#E5DCF9]">
            <span className="text-[10px] text-[#7B6E96] font-bold block uppercase">Memory Swaps</span>
            <span className="text-sm font-black text-[#854D0E] mt-0.5 block">
              {currentStep.swapsCount ?? 0}
            </span>
          </div>
        </div>

        {/* Execution Speed Selector */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[11px] font-mono text-[#7B6E96]">
            <span className="font-semibold">Sim Speed:</span>
            <span className="font-bold text-[#7B42F6]">{playbackSpeed}x</span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {[0.5, 1, 2, 4].map(spd => (
              <button
                key={spd}
                onClick={() => {
                  soundFx.playClick();
                  onChangeSpeed(spd);
                }}
                className={`py-1 text-xs font-mono font-bold rounded-lg border transition-all ${
                  playbackSpeed === spd
                    ? 'bg-[#7B42F6] text-white border-[#7B42F6] shadow-xs'
                    : 'bg-[#F4F0FF] text-[#5521B5] border-[#E5DCF9] hover:border-[#7B42F6]'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Input Preset Switches */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-mono text-[#7B6E96] font-semibold block">Input Scenarios:</span>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button
              onClick={() => {
                soundFx.playClick();
                onPresetRandom();
              }}
              className="p-2 rounded-xl bg-[#F8F6FE] hover:bg-[#F0EBFD] border border-[#E5DCF9] text-[#4D3D6B] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#7B6E96]" />
              <span>Random</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onPresetNearlySorted();
              }}
              className="p-2 rounded-xl bg-[#F8F6FE] hover:bg-[#F0EBFD] border border-[#E5DCF9] text-[#4D3D6B] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Nearly Sorted</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onPresetReversed();
              }}
              className="p-2 rounded-xl bg-[#F8F6FE] hover:bg-[#F0EBFD] border border-[#E5DCF9] text-[#4D3D6B] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Reversed</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onOpenCustomModal();
              }}
              className="p-2 rounded-xl bg-[#F4F0FF] hover:bg-[#ECE6FD] border border-[#E5DCF9] text-[#7B42F6] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>✏️ Custom</span>
            </button>
          </div>
        </div>

        {/* Multi-Algo Arena Quick Jump */}
        <button
          onClick={() => {
            soundFx.playClick();
            onLaunchRaceArena();
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-[#F4F0FF] hover:bg-[#ECE6FD] text-[#5521B5] hover:text-[#7B42F6] border border-[#E5DCF9] hover:border-[#7B42F6] font-bold text-xs flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span>🏎️</span>
            <span>Multi-Algo Race Arena</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
