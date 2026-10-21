import React, { useState } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  SkipBack,
  SkipForward,
  Shuffle,
  Volume2,
  VolumeX,
  Sliders,
  Code2,
  Edit3
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface PlaybackDeckProps {
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  playbackSpeed: number;
  onPlayPauseToggle: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onJumpStart: () => void;
  onJumpEnd: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onPresetRandom: () => void;
  onPresetNearlySorted: () => void;
  onPresetReversed: () => void;
  onCustomInputSubmit?: (input: number[]) => void;
  hasArrayInput: boolean;
  onScrubStep?: (stepIndex: number) => void;
}

export const PlaybackDeck: React.FC<PlaybackDeckProps> = ({
  currentStepIndex,
  totalSteps,
  isPlaying,
  playbackSpeed,
  onPlayPauseToggle,
  onStepForward,
  onStepBackward,
  onJumpStart,
  onJumpEnd,
  onReset,
  onSpeedChange,
  onPresetRandom,
  onPresetNearlySorted,
  onPresetReversed,
  onCustomInputSubmit,
  hasArrayInput,
  onScrubStep,
}) => {
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customInputText, setCustomInputText] = useState('65, 35, 80, 25, 90, 45, 15, 70');

  const toggleSound = () => {
    const next = !isMuted;
    soundFx.setMuted(next);
    setIsMuted(next);
    if (!next) {
      soundFx.playClick();
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onCustomInputSubmit) return;
    const parsed = customInputText
      .split(/[\s,]+/)
      .map(x => parseInt(x.trim(), 10))
      .filter(x => !isNaN(x) && x > 0 && x <= 999);
    if (parsed.length >= 2) {
      onCustomInputSubmit(parsed.slice(0, 20));
      setShowCustomModal(false);
      soundFx.playSuccessChime();
    }
  };

  return (
    <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 flex flex-col gap-4">
      {/* Top Header: Step Counter, Interactive Scrubber, Speed & Sound */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-[#7B42F6] font-mono bg-[#F8F6FE] px-3 py-1 rounded-xl border border-[#E5DCF9] shadow-2xs">
            Step {totalSteps > 0 ? currentStepIndex + 1 : 0} / {totalSteps}
          </span>
          <span className="text-xs text-[#7B6E96] font-medium hidden sm:inline">
            Interactive Real-Time Playback Deck
          </span>
        </div>

        {/* Speed & Sound Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Real-Time Sound Effects' : 'Mute Real-Time Sound Effects'}
            className={`p-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isMuted
                ? 'bg-[#F8F6FE] border-[#E5DCF9] text-[#8C7DA8]'
                : 'bg-[#F4F0FF] border-[#E5DCF9] text-[#7B42F6]'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#7B42F6]" />}
            <span className="text-[11px] font-mono">{isMuted ? 'Muted' : 'Audio ON'}</span>
          </button>

          {/* Speed Buttons */}
          <div className="flex items-center gap-1 bg-[#F4F0FF] border border-[#E5DCF9] p-0.5 rounded-xl">
            {[0.5, 1, 2, 4].map((s) => (
              <button
                key={s}
                onClick={() => {
                  soundFx.playClick();
                  onSpeedChange(s);
                }}
                className={`px-2.5 py-0.5 text-xs font-mono rounded-lg font-bold transition-all cursor-pointer ${
                  playbackSpeed === s
                    ? 'bg-[#7B42F6] text-white shadow-xs'
                    : 'text-[#61527E] hover:text-[#7B42F6]'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Scrubber Bar */}
      <div className="w-full space-y-1">
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIndex}
          onChange={(e) => {
            const newIndex = parseInt(e.target.value, 10);
            if (onScrubStep) onScrubStep(newIndex);
          }}
          className="w-full h-2.5 bg-[#F0EBFD] rounded-lg appearance-none cursor-pointer accent-[#7B42F6] hover:accent-[#6B31E6] transition-all"
        />
        <div className="flex justify-between text-[10px] text-[#7B6E96] font-mono">
          <span>Start (Pass 0)</span>
          <span>{totalSteps > 0 ? Math.round(((currentStepIndex + 1) / totalSteps) * 100) : 0}% Complete</span>
          <span>Solved</span>
        </div>
      </div>

      {/* Main Transport Control Buttons */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 py-1">
        <button
          onClick={() => {
            soundFx.playClick();
            onJumpStart();
          }}
          disabled={currentStepIndex === 0}
          title="Jump to Start"
          className="p-2.5 rounded-2xl text-[#4D3D6B] hover:bg-[#F4F0FF] border border-transparent hover:border-[#E5DCF9] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onStepBackward();
          }}
          disabled={currentStepIndex === 0}
          title="Step Backward"
          className="p-2.5 rounded-2xl text-[#4D3D6B] hover:bg-[#F4F0FF] border border-transparent hover:border-[#E5DCF9] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onPlayPauseToggle();
          }}
          title={isPlaying ? 'Pause Animation' : 'Start Real-Time Walkthrough'}
          className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7B42F6] to-[#6B31E6] hover:from-[#6B31E6] hover:to-[#5521B5] text-white flex items-center justify-center shadow-lg shadow-[#7B42F6]/30 transition-all transform active:scale-95 cursor-pointer"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5 fill-current" />}
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onStepForward();
          }}
          disabled={currentStepIndex >= totalSteps - 1}
          title="Step Forward"
          className="p-2.5 rounded-2xl text-[#4D3D6B] hover:bg-[#F4F0FF] border border-transparent hover:border-[#E5DCF9] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onJumpEnd();
          }}
          disabled={currentStepIndex >= totalSteps - 1}
          title="Jump to End"
          className="p-2.5 rounded-2xl text-[#4D3D6B] hover:bg-[#F4F0FF] border border-transparent hover:border-[#E5DCF9] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onReset();
          }}
          title="Reset to Initial State"
          className="p-2.5 rounded-2xl text-[#4D3D6B] hover:bg-[#F4F0FF] border border-transparent hover:border-[#E5DCF9] transition-all ml-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Preset Input Generators for Array Algorithms */}
      {hasArrayInput && (
        <div className="pt-3 border-t border-[#F0EBFD] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[#61527E] font-semibold">
            <Code2 className="w-3.5 h-3.5 text-[#7B42F6]" />
            <span>Generate Real-Time Inputs:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                soundFx.playClick();
                onPresetRandom();
              }}
              className="px-3 py-1.5 text-xs rounded-xl bg-[#F4F0FF] hover:bg-[#EAE2FD] text-[#5521B5] border border-[#E5DCF9] font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Shuffle className="w-3 h-3" />
              <span>Random 8</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onPresetNearlySorted();
              }}
              className="px-3 py-1.5 text-xs rounded-xl bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#065F46] border border-[#10B981]/30 font-bold transition-colors cursor-pointer shadow-2xs"
            >
              Nearly Sorted (Best)
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onPresetReversed();
              }}
              className="px-3 py-1.5 text-xs rounded-xl bg-[#FEF9C3] hover:bg-[#FEF08A] text-[#854D0E] border border-[#F5B800]/40 font-bold transition-colors cursor-pointer shadow-2xs"
            >
              Reversed (Worst)
            </button>

            {onCustomInputSubmit && (
              <button
                onClick={() => setShowCustomModal(!showCustomModal)}
                className="px-3 py-1.5 text-xs rounded-xl bg-[#F8F6FE] hover:bg-[#F0EBFD] text-[#61527E] border border-[#E5DCF9] font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Edit3 className="w-3 h-3" />
                <span>Custom Input</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Custom Input Modal / Inline drawer */}
      {showCustomModal && (
        <form onSubmit={handleCustomSubmit} className="p-3 bg-[#F8F6FE] border border-[#E5DCF9] rounded-2xl space-y-2 mt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#201538]">Custom Array Data (comma or space separated):</span>
            <span className="text-[11px] text-[#7B6E96] font-mono">Max 16 elements</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              placeholder="e.g. 50, 20, 90, 10, 40, 70"
              className="flex-1 bg-white border border-[#E5DCF9] rounded-xl px-3 py-2 text-xs text-[#201538] font-mono focus:outline-none focus:ring-2 focus:ring-[#7B42F6]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#7B42F6] hover:bg-[#6B31E6] text-white rounded-xl text-xs font-bold transition-transform active:scale-95 cursor-pointer shadow-xs"
            >
              Apply Input
            </button>
            <button
              type="button"
              onClick={() => setShowCustomModal(false)}
              className="px-3 py-2 bg-[#F0EBFD] text-[#61527E] rounded-xl text-xs font-semibold hover:bg-[#E5DCF9] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
