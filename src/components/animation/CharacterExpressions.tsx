import React from 'react';

export type ExpressionType = 'idle' | 'thinking' | 'surprised' | 'happy' | 'sad' | 'celebrating' | 'comparing' | 'sleeping';

interface CharacterExpressionsProps {
  expression: ExpressionType;
  isBlinking?: boolean;
}

export const CharacterExpressions: React.FC<CharacterExpressionsProps> = ({
  expression,
  isBlinking = false
}) => {
  if (isBlinking && expression === 'idle') {
    return (
      <g className="transition-all duration-150">
        {/* Blinking closed eyes */}
        <line x1="16" y1="20" x2="26" y2="20" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="20" x2="48" y2="20" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
        {/* Small gentle smile */}
        <path d="M 27 28 Q 32 32 37 28" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  }

  switch (expression) {
    case 'thinking':
      return (
        <g className="transition-all duration-200">
          {/* Eyes looking up-right */}
          <circle cx="21" cy="18" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="23" cy="16" r="2.5" fill="#0F172A" />
          <circle cx="43" cy="18" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="45" cy="16" r="2.5" fill="#0F172A" />
          {/* Eyebrows furrowed */}
          <line x1="15" y1="12" x2="25" y2="13" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <line x1="41" y1="11" x2="49" y2="14" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          {/* Wavy thoughtful mouth */}
          <path d="M 28 29 Q 32 26 36 29" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </g>
      );

    case 'comparing':
      return (
        <g className="transition-all duration-200">
          {/* Focused intent eyes looking inward */}
          <circle cx="21" cy="20" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="23" cy="20" r="2.8" fill="#F59E0B" />
          <circle cx="43" cy="20" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="41" cy="20" r="2.8" fill="#F59E0B" />
          {/* Determined mouth */}
          <line x1="28" y1="28" x2="36" y2="28" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );

    case 'surprised':
      return (
        <g className="transition-all duration-200">
          {/* Wide round surprise eyes */}
          <circle cx="20" cy="18" r="6.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="20" cy="18" r="2.5" fill="#0F172A" />
          <circle cx="44" cy="18" r="6.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="44" cy="18" r="2.5" fill="#0F172A" />
          {/* High arched eyebrows */}
          <path d="M 14 10 Q 20 6 26 10" fill="none" stroke="#0F172A" strokeWidth="2" />
          <path d="M 38 10 Q 44 6 50 10" fill="none" stroke="#0F172A" strokeWidth="2" />
          {/* Open O-mouth */}
          <ellipse cx="32" cy="30" rx="3.5" ry="5" fill="#0F172A" />
        </g>
      );

    case 'happy':
    case 'celebrating':
      return (
        <g className="transition-all duration-200">
          {/* Inverted crescent happy eyes */}
          <path d="M 16 20 Q 21 13 26 20" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 38 20 Q 43 13 48 20" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          {/* Rosy blush cheeks */}
          <circle cx="14" cy="25" r="3.5" fill="#FDA4AF" opacity="0.8" />
          <circle cx="50" cy="25" r="3.5" fill="#FDA4AF" opacity="0.8" />
          {/* Big toothy open smile */}
          <path d="M 24 26 Q 32 37 40 26 Z" fill="#DC2626" stroke="#0F172A" strokeWidth="1.5" />
          <path d="M 26 26 Q 32 29 38 26" fill="#FFFFFF" />
        </g>
      );

    case 'sad':
      return (
        <g className="transition-all duration-200">
          {/* Droopy eyes */}
          <circle cx="21" cy="21" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="21" cy="22" r="2" fill="#0F172A" />
          <circle cx="43" cy="21" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="43" cy="22" r="2" fill="#0F172A" />
          {/* Sad downturned mouth */}
          <path d="M 26 31 Q 32 25 38 31" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </g>
      );

    case 'sleeping':
      return (
        <g className="transition-all duration-200">
          {/* Gentle closed crescent sleeping eyes */}
          <path d="M 16 22 Q 21 25 26 22" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 38 22 Q 43 25 48 22" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          {/* Peaceful small mouth */}
          <ellipse cx="32" cy="29" rx="2" ry="2" fill="#64748B" />
        </g>
      );

    case 'idle':
    default:
      return (
        <g className="transition-all duration-200">
          {/* Friendly alert eyes */}
          <circle cx="21" cy="19" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="22" cy="19" r="2.5" fill="#0F172A" />
          <circle cx="23" cy="18" r="0.8" fill="#FFFFFF" />
          <circle cx="43" cy="19" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="44" cy="19" r="2.5" fill="#0F172A" />
          <circle cx="45" cy="18" r="0.8" fill="#FFFFFF" />
          {/* Gentle smile */}
          <path d="M 26 27 Q 32 33 38 27" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
  }
};
