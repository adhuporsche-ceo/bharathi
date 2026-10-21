import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, Code2, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../data/daaData';
import { soundFx } from '../utils/soundEffects';

interface StepPredictionQuizProps {
  quiz: QuizQuestion;
}

export const StepPredictionQuiz: React.FC<StepPredictionQuizProps> = ({ quiz }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [streak, setStreak] = useState(1);

  const isAnswered = selectedIdx !== null;
  const isCorrect = selectedIdx === quiz.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    if (idx === quiz.correctIndex) {
      soundFx.playSuccessChime();
      setStreak(prev => prev + 1);
    } else {
      soundFx.playSwapSound();
      setStreak(0);
    }
  };

  const handleReset = () => {
    soundFx.playClick();
    setSelectedIdx(null);
  };

  return (
    <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 shadow-sm shadow-[#E5DCF9]/40 space-y-5 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
        <div className="flex items-center gap-2 text-[#7B42F6] font-extrabold text-xs uppercase tracking-wider font-mono">
          <HelpCircle className="w-4 h-4 text-[#7B42F6]" />
          <span>Real-Time Step Prediction Challenge</span>
        </div>

        <div className="flex items-center gap-2">
          {streak > 0 && (
            <span className="flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-[#FEF9C3] border border-[#F5B800] text-[#854D0E]">
              <Code2 className="w-3.5 h-3.5 text-[#F5B800]" />
              <span>{streak} Streak!</span>
            </span>
          )}
          <span className="text-[11px] font-mono font-bold text-[#7B6E96] bg-[#F8F6FE] border border-[#E5DCF9] px-2.5 py-0.5 rounded-lg">
            KCT DAA Lab Grade
          </span>
        </div>
      </div>

      <div>
        <span className="text-xs font-bold text-[#7B6E96] uppercase tracking-wider block mb-1 font-mono">
          Predict Next Action / Pointer Movement:
        </span>
        <p className="text-sm font-black text-[#201538] leading-snug">
          {quiz.question}
        </p>
      </div>

      <div className="space-y-2.5">
        {quiz.options.map((opt, idx) => {
          let btnClass = 'bg-white hover:bg-[#F8F6FE] text-[#201538] border-2 border-[#E5DCF9] hover:border-[#7B42F6]';
          if (isAnswered) {
            if (idx === quiz.correctIndex) {
              btnClass = 'bg-[#ECFDF5] border-2 border-[#10B981] text-[#065F46] font-bold ring-2 ring-emerald-200';
            } else if (idx === selectedIdx) {
              btnClass = 'bg-rose-50 border-2 border-rose-500 text-rose-950 ring-2 ring-rose-200';
            } else {
              btnClass = 'opacity-50 border-2 border-[#E5DCF9] bg-[#F8F6FE]';
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-4 rounded-2xl border text-xs flex items-center justify-between transition-all duration-150 cursor-pointer shadow-2xs ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-[#F4F0FF] border border-[#E5DCF9] flex items-center justify-center font-mono font-bold text-[#7B42F6] shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-semibold text-xs leading-relaxed">{opt}</span>
              </div>
              {isAnswered && idx === quiz.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
              )}
              {isAnswered && idx === selectedIdx && idx !== quiz.correctIndex && (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="space-y-3 pt-2">
          <div
            className={`p-4 rounded-2xl text-xs leading-relaxed border ${
              isCorrect
                ? 'bg-[#ECFDF5] text-[#065F46] border-[#10B981]/40'
                : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold mb-1 text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Brilliant! You predicted the correct state.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Incorrect Prediction</span>
                </>
              )}
            </div>
            <p className="text-[#201538] mt-1 font-medium">{quiz.explanation}</p>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-[#F4F0FF] hover:bg-[#ECE6FD] text-[#5521B5] text-xs font-bold border border-[#E5DCF9] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Question Again</span>
          </button>
        </div>
      )}
    </div>
  );
};
