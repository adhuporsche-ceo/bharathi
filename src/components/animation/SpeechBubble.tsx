import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Code2, GraduationCap, Cpu } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

export type ExplanationMode = 'beginner' | 'exam' | 'technical';

export interface SpeechBubbleProps {
  currentStep?: {
    description?: string;
    variables?: Record<string, string>;
    stepIndex?: number;
    totalSteps?: number;
    codeLine?: number;
    swappedIndices?: number[];
    activeIndices?: number[];
    sortedIndices?: number[];
    pivotIndex?: number;
    targetIndex?: number;
    [key: string]: any;
  };
  description?: string;
  variables?: Record<string, string>;
  algorithmName?: string;
  stepIndex?: number;
  totalSteps?: number;
  className?: string;
  onAlgoClick?: () => void;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  currentStep,
  description: directDescription,
  variables: directVariables,
  algorithmName = 'Algorithm Execution',
  stepIndex: directStepIndex,
  totalSteps: directTotalSteps,
  className = '',
  onAlgoClick
}) => {
  // Prefer currentStep properties, falling back to direct props
  const description = currentStep?.description ?? directDescription ?? 'Observing algorithm state and invariant verification...';
  const variables = currentStep?.variables ?? directVariables ?? {};
  const stepIndex = currentStep?.stepIndex ?? directStepIndex ?? 0;
  const totalSteps = currentStep?.totalSteps ?? directTotalSteps ?? 1;

  const [mode, setMode] = useState<ExplanationMode>('beginner');
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [isBlinking, setIsBlinking] = useState(false);
  const [algoBounce, setAlgoBounce] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speaking when step changes or unmounts
  useEffect(() => {
    return () => {
      soundFx.stopSpeaking();
    };
  }, [stepIndex]);

  // Blinking animation for Algo's eyes
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 220);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleToggleSound = () => {
    const next = soundFx.toggleMute();
    setIsMuted(next);
  };

  const handleSpeak = () => {
    soundFx.playPop();
    if (isSpeaking) {
      soundFx.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const ok = soundFx.speak(displayedText, () => {
        setIsSpeaking(false);
      });
      if (!ok) setIsSpeaking(false);
    }
  };

  const handleAlgoClick = () => {
    soundFx.playBoing();
    setAlgoBounce(true);
    setTimeout(() => setAlgoBounce(false), 500);
    handleSpeak();
    if (onAlgoClick) onAlgoClick();
  };

  // Student-focused explanation tailored by mode
  let displayedText = description;
  let modeBadge = 'Intuitive Analogy';

  if (mode === 'exam') {
    modeBadge = 'KCT 23CS401 Exam Standard';
    if (variables.status === 'Sorted' || variables.status === 'Completed') {
      displayedText = `Exam Note: Loop invariant holds. Every element in subarray [0..${totalSteps}] is in its final sorted non-decreasing position. State this theorem clearly for full 8/16 marks in Anna University & KCT examinations.`;
    } else if (variables.pivot !== undefined) {
      displayedText = `Exam Note: Lomuto Partitioning with pivot = ${variables.pivot}. Invariant: arr[low..i] < pivot, arr[i+1..j-1] >= pivot. Write this exact inequality in Part B dry-run questions.`;
    } else if (variables.minIdx !== undefined) {
      displayedText = `Exam Note: Selection Sort scans for the smallest element in unsorted suffix. Comparisons = n(n-1)/2 regardless of initial input permutation.`;
    } else {
      const varsList = Object.entries(variables).map(([k, v]) => `${k}=${v}`).join(', ');
      displayedText = `Exam Tip: Trace registers (${varsList || 'i, j, key'}) in your worksheet dry-run table. Every step must reflect the exact line executed.`;
    }
  } else if (mode === 'technical') {
    modeBadge = 'Register & Invariant Inspector';
    const regString = Object.entries(variables).length > 0
      ? Object.entries(variables).map(([k, v]) => `${k}: ${v}`).join(' | ')
      : 'No active register writes';
    displayedText = `Registers: [${regString}] • Execution Progress: Step ${stepIndex + 1} of ${totalSteps} (${Math.round(((stepIndex + 1) / Math.max(1, totalSteps)) * 100)}%). Invariant verified.`;
  }

  const progressPercent = Math.min(100, Math.round(((stepIndex + 1) / Math.max(1, totalSteps)) * 100));

  return (
    <div className={`w-full flex flex-col items-center select-none ${className}`}>
      {/* 1. SPEECH BUBBLE (Above Algo) - 4-Color Theme */}
      <div className="w-full relative bg-white border-2 border-[#E5DCF9] rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-lg shadow-[#E5DCF9]/60 transition-all duration-300">
        {/* Subtle decorative background accent */}
        <div className="absolute top-0 right-0 w-40 sm:w-64 h-full bg-gradient-to-l from-[#F8F6FE]/80 to-transparent rounded-r-2xl sm:rounded-r-3xl pointer-events-none" />

        {/* Bubble Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-[#F0EBFD]">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-[#F4F0FF] p-1 rounded-xl border border-[#E5DCF9]">
            <button
              onClick={() => {
                soundFx.playClick();
                setMode('beginner');
              }}
              className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                mode === 'beginner'
                  ? 'bg-[#7B42F6] text-white shadow-xs scale-102'
                  : 'text-[#61527E] hover:text-[#7B42F6] hover:bg-white/80'
              }`}
              title="Beginner mode with friendly analogies"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Beginner</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMode('exam');
              }}
              className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                mode === 'exam'
                  ? 'bg-[#7B42F6] text-white shadow-xs scale-102'
                  : 'text-[#61527E] hover:text-[#7B42F6] hover:bg-white/80'
              }`}
              title="Exam-oriented note tailored for KCT 23CS401 syllabus"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Exam Mode</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMode('technical');
              }}
              className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                mode === 'technical'
                  ? 'bg-[#7B42F6] text-white shadow-xs scale-102'
                  : 'text-[#61527E] hover:text-[#7B42F6] hover:bg-white/80'
              }`}
              title="Technical state inspection"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical</span>
            </button>
          </div>

          {/* Step Progress & Sound Control */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-[#F8F6FE] border border-[#E5DCF9] px-2.5 py-1 rounded-lg text-xs font-mono text-[#544372]">
              <span className="font-bold text-[#7B42F6]">Step {stepIndex + 1}/{totalSteps}</span>
              <div className="w-14 h-1.5 bg-[#E5DCF9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7B42F6] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
              className="p-1.5 rounded-lg border border-[#E5DCF9] text-[#61527E] hover:text-[#7B42F6] hover:bg-[#F4F0FF] transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#7B42F6]" />}
            </button>
          </div>
        </div>

        {/* Bubble Description Body */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B42F6] bg-[#F4F0FF] border border-[#E5DCF9] px-2 py-0.5 rounded-md">
              {modeBadge}
            </span>
            <span className="text-xs text-[#7B6E96] font-medium truncate">
              {algorithmName}
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#F8F6FE] border border-[#E5DCF9]">
            <p className="text-sm sm:text-base text-[#201538] leading-relaxed font-semibold tracking-normal">
              {displayedText}
            </p>
          </div>

          {/* Quick Variable Badges if present */}
          {Object.keys(variables).length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-mono text-[#7B6E96] mr-1">Registers:</span>
              {Object.entries(variables).map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white border border-[#E5DCF9] text-[#201538] shadow-2xs"
                >
                  <span className="text-[#7B42F6]">{key}:</span>
                  <span className="font-bold">{value}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 2. TAIL-POINTING SVG */}
        <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-8 h-4 pointer-events-none overflow-visible flex justify-center">
          <svg
            width="28"
            height="15"
            viewBox="0 0 28 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_2px_rgba(200,185,235,0.6)]"
          >
            {/* White triangular fill */}
            <path
              d="M0 0 L14 15 L28 0 Z"
              fill="#FFFFFF"
            />
            {/* Outline matching border-[#E5DCF9] */}
            <path
              d="M0 0 L14 15 L28 0"
              stroke="#E5DCF9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Erase the top border seam inside the speech bubble */}
            <line x1="1" y1="0" x2="27" y2="0" stroke="#FFFFFF" strokeWidth="3" />
          </svg>
        </div>
      </div>

      {/* 3. 'ALGO' CHARACTER - 4-Color Theme */}
      <div
        onClick={handleAlgoClick}
        className={`flex flex-col items-center mt-3 cursor-pointer group transition-transform duration-200 ${
          algoBounce ? 'scale-110 -translate-y-1' : 'hover:scale-105'
        }`}
        title="Algo the DAA Mentor Robot (Click for sound!)"
      >
        {/* Antenna that aligns with the speech bubble SVG tail tip */}
        <div className="relative flex flex-col items-center">
          {/* Signal Wave Ping */}
          <div className="w-3.5 h-3.5 rounded-full bg-[#F5B800] absolute -top-1 animate-ping opacity-60 pointer-events-none" />
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#7B42F6] to-[#F5B800] border border-white shadow-xs relative z-10" />
          <div className="w-1 h-3 bg-[#A490D1] -mt-0.5 rounded-t-xs" />
        </div>

        {/* Robot Head - Dark Purple with Violet/Gold highlights */}
        <div className="w-16 h-12 bg-[#201538] border-2 border-[#7B42F6] rounded-2xl flex flex-col items-center justify-center p-1 shadow-md shadow-[#E5DCF9]/80 relative group-hover:border-[#F5B800] transition-colors">
          {/* Glowing visor screen */}
          <div className="w-12 h-6 bg-[#0E071A] rounded-lg border border-[#7B42F6]/60 flex items-center justify-center gap-1.5 px-1 shadow-inner">
            {/* Friendly blinking animated eyes in bright golden yellow */}
            <div
              className={`w-2.5 rounded-xs transition-all duration-150 ${
                isBlinking ? 'h-0.5 bg-[#F5B800]/50' : 'h-3 bg-[#F5B800] animate-pulse shadow-[0_0_8px_#F5B800]'
              }`}
            />
            <div
              className={`w-2.5 rounded-xs transition-all duration-150 ${
                isBlinking ? 'h-0.5 bg-[#F5B800]/50' : 'h-3 bg-[#F5B800] animate-pulse shadow-[0_0_8px_#F5B800]'
              }`}
            />
          </div>
          {/* Mouth status LED in Leaf Green */}
          <div className="w-5 h-0.5 bg-[#10B981] rounded-full mt-1 animate-pulse shadow-[0_0_4px_#10B981]" />
        </div>

        {/* Bot Name and Role Badge */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-xs font-mono font-black text-[#201538] tracking-wider">
            ALGO
          </span>
          <span className="text-[10px] font-bold text-[#7B42F6] bg-[#F4F0FF] border border-[#E5DCF9] px-2 py-0.2 rounded-full shadow-2xs">
            DAA Professor Bot
          </span>
        </div>
      </div>
    </div>
  );
};
