import React, { useState, useEffect } from 'react';
import { CharacterExpressions, ExpressionType } from './CharacterExpressions';

export interface CartoonCharacterProps {
  id: string;
  value: number | string;
  index: number;
  state: 'idle' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'target' | 'sleeping' | 'key' | 'min' | 'discarded';
  heightPercent?: number; // 40% to 100% based on relative value
  reducedMotion?: boolean;
  subLabel?: string;
  roleBadge?: string;
  crown?: boolean;
}

export const CartoonCharacter: React.FC<CartoonCharacterProps> = ({
  value,
  index,
  state,
  heightPercent = 70,
  reducedMotion = false,
  subLabel,
  roleBadge,
  crown = false
}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Periodic natural blinking
  useEffect(() => {
    if (reducedMotion || state === 'sleeping') return;
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3200 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [reducedMotion, state]);

  // Expression selection based on algorithm state
  let expression: ExpressionType = 'idle';
  if (state === 'comparing') expression = 'comparing';
  else if (state === 'swapping') expression = 'surprised';
  else if (state === 'sorted') expression = 'celebrating';
  else if (state === 'pivot') expression = 'thinking';
  else if (state === 'target') expression = 'happy';
  else if (state === 'sleeping' || state === 'discarded') expression = 'sleeping';
  else if (state === 'key' || state === 'min') expression = 'thinking';

  // State-specific palette & animations - 4-Color Professional Theme
  let bodyFill = '#F4F0FF'; // soft lilac-white
  let bodyStroke = '#D4C7F5'; // lavender outline
  let shadowColor = 'shadow-[#E5DCF9]/60';
  let badgeColor = 'bg-[#7B42F6] text-white font-extrabold';
  let stateTag = roleBadge || '';

  if (state === 'comparing') {
    bodyFill = '#FEF9C3'; // warm golden yellow-50
    bodyStroke = '#F5B800'; // golden yellow
    shadowColor = 'shadow-amber-200 ring-4 ring-[#F5B800]/40';
    badgeColor = 'bg-[#F5B800] text-[#201538] font-black';
    if (!stateTag) stateTag = 'COMPARE';
  } else if (state === 'swapping') {
    bodyFill = '#F4F0FF'; // lavender violet
    bodyStroke = '#7B42F6'; // vibrant purple
    shadowColor = 'shadow-purple-300 ring-4 ring-[#7B42F6]/50';
    badgeColor = 'bg-[#7B42F6] text-white font-black';
    if (!stateTag) stateTag = 'SWAP!';
  } else if (state === 'sorted') {
    bodyFill = '#ECFDF5'; // mint emerald-50
    bodyStroke = '#10B981'; // leaf green
    shadowColor = 'shadow-emerald-200 ring-2 ring-emerald-300';
    badgeColor = 'bg-[#10B981] text-white font-bold';
    if (!stateTag) stateTag = '✓ SORTED';
  } else if (state === 'pivot') {
    bodyFill = '#F4F0FF';
    bodyStroke = '#7B42F6';
    shadowColor = 'shadow-purple-200 ring-3 ring-[#7B42F6]/60';
    badgeColor = 'bg-[#7B42F6] text-white font-bold';
    if (!stateTag) stateTag = 'PIVOT';
  } else if (state === 'target') {
    bodyFill = '#ECFDF5';
    bodyStroke = '#10B981';
    badgeColor = 'bg-[#10B981] text-white';
    if (!stateTag) stateTag = 'FOUND!';
  } else if (state === 'key') {
    bodyFill = '#FEF9C3';
    bodyStroke = '#F5B800';
    shadowColor = 'shadow-amber-300 ring-4 ring-[#F5B800]/60';
    badgeColor = 'bg-[#F5B800] text-[#201538] font-black';
    if (!stateTag) stateTag = 'KEY ITEM';
  } else if (state === 'min') {
    bodyFill = '#FEF9C3';
    bodyStroke = '#F5B800';
    shadowColor = 'shadow-amber-300 ring-3 ring-[#F5B800]/50';
    badgeColor = 'bg-[#F5B800] text-[#201538] font-bold';
    if (!stateTag) stateTag = 'MIN CANDIDATE';
  } else if (state === 'sleeping' || state === 'discarded') {
    bodyFill = '#F8F6FE';
    bodyStroke = '#E5DCF9';
    shadowColor = 'shadow-none opacity-40';
    badgeColor = 'bg-[#7C6E96] text-white';
    if (!stateTag) stateTag = 'Zzz...';
  }

  // Jumping or bouncing offset for swapping/comparing
  const transformStyle = reducedMotion
    ? undefined
    : state === 'swapping'
    ? 'translateY(-14px) scale(1.06)'
    : state === 'comparing'
    ? 'translateY(-6px) scale(1.03)'
    : state === 'sorted'
    ? 'translateY(0px)'
    : 'translateY(0px)';

  return (
    <div
      style={{
        transform: transformStyle,
        transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      className="flex flex-col items-center justify-end select-none relative group min-w-[54px] sm:min-w-[68px]"
    >
      {/* State Callout Pill */}
      {stateTag && (
        <span
          className={`absolute -top-7 text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full border shadow-xs animate-bounce ${
            state === 'swapping'
              ? 'bg-[#F4F0FF] text-[#7B42F6] border-[#D4C7F5]'
              : state === 'comparing'
              ? 'bg-[#FEF9C3] text-[#92400E] border-[#F5B800]'
              : 'bg-[#ECFDF5] text-[#065F46] border-[#10B981]'
          }`}
        >
          {stateTag}
        </span>
      )}

      {/* Crown for Pivot or Max-Heap King */}
      {(crown || state === 'pivot') && (
        <div className="absolute -top-6 text-sm font-bold text-[#F5B800] drop-shadow-sm animate-bounce">
          👑
        </div>
      )}

      {/* Graduation Cap / Star for Sorted Elements */}
      {state === 'sorted' && !crown && (
        <div className="absolute -top-4 text-xs font-bold text-[#10B981] drop-shadow-sm animate-pulse">
          ⭐
        </div>
      )}

      {/* Sleeping Zzz bubble */}
      {(state === 'sleeping' || state === 'discarded') && (
        <div className="absolute -top-5 right-1 text-xs font-mono font-black text-[#8C7DA8] animate-pulse">
          💤 Zzz
        </div>
      )}

      {/* 2D Character Body */}
      <div
        className={`w-14 sm:w-16 rounded-3xl border-2 flex flex-col items-center justify-between p-2 relative shadow-md transition-all ${shadowColor}`}
        style={{
          backgroundColor: bodyFill,
          borderColor: bodyStroke,
          height: `${Math.max(95, Math.min(175, 80 + heightPercent * 0.9))}px`
        }}
      >
        {/* SVG Face Container */}
        <svg viewBox="0 0 64 45" className="w-12 h-9 mt-1 overflow-visible">
          <CharacterExpressions expression={expression} isBlinking={isBlinking} />
        </svg>

        {/* Value Belly Badge */}
        <div
          className={`px-2 py-1 rounded-xl text-xs sm:text-sm font-mono font-extrabold shadow-inner transition-colors duration-200 ${badgeColor}`}
        >
          {value}
        </div>

        {/* Cute Feet */}
        <div className="flex gap-3 -mb-3 z-10">
          <div
            className="w-3.5 h-2 rounded-full border"
            style={{ backgroundColor: bodyStroke, borderColor: bodyStroke }}
          />
          <div
            className="w-3.5 h-2 rounded-full border"
            style={{ backgroundColor: bodyStroke, borderColor: bodyStroke }}
          />
        </div>
      </div>

      {/* Index and SubLabel under feet */}
      <div className="mt-3.5 flex flex-col items-center gap-0.5">
        <span className="text-[10px] font-mono font-semibold text-[#665687]">
          #{index}
        </span>
        {subLabel && (
          <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded-md bg-[#F4F0FF] text-[#5521B5] border border-[#E5DCF9] shadow-2xs">
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
};
