import React, { useState, useEffect } from 'react';
import {
  CATEGORIES,
  ALGORITHMS,
  AlgorithmCategory,
  AlgorithmItem,
  AlgorithmStep
} from './data/daaData';
import { executeAlgorithm } from './engine/algorithmRegistry';
import { CartoonStage } from './components/animation/CartoonStage';
import { VisualizerCanvas } from './components/VisualizerCanvas';
import { PlaybackDeck } from './components/PlaybackDeck';
import { ComplexityCard } from './components/ComplexityCard';
import { CodeTraceView } from './components/CodeTraceView';
import { DryRunWorksheet } from './components/DryRunWorksheet';
import { StepPredictionQuiz } from './components/StepPredictionQuiz';
import { MasterTheoremSolver } from './components/MasterTheoremSolver';
import { AlgorithmComparator } from './components/AlgorithmComparator';
import { LiveClassroomSession } from './components/LiveClassroomSession';
import { RealtimeVariableWatcher } from './components/RealtimeVariableWatcher';
import { CheggNavbar } from './components/CheggNavbar';
import { OnThisPageNav } from './components/OnThisPageNav';
import { CheggRightSidebar } from './components/CheggRightSidebar';
import { SearchModal } from './components/SearchModal';
import { soundFx } from './utils/soundEffects';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  PlayCircle,
  Layers,
  CheckCircle2,
  Code2,
  Lock,
  Radio,
  Volume2,
  VolumeX,
  School,
  Activity,
  Sliders,
  Check,
  X,
  Shuffle,
  ShieldCheck,
  Calendar,
  Clock,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'visualizer' | 'master_theorem' | 'compare' | 'classroom'>('visualizer');
  const [selectedCategory, setSelectedCategory] = useState<AlgorithmCategory>(CATEGORIES[5]); // Sorting Algorithms
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmItem>(ALGORITHMS[0]); // Bubble sort
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'quiz' | 'dryrun' | 'code' | 'curriculum' | 'telemetry' | 'summary'>('walkthrough');
  const [activeSection, setActiveSection] = useState<string>('sec-summary');
  const [isAudioMuted, setIsAudioMuted] = useState(soundFx.getMuted());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCustomInputModalOpen, setIsCustomInputModalOpen] = useState(false);
  const [customInputString, setCustomInputString] = useState('65, 35, 80, 25, 90, 45, 15, 70');

  // Student progress in localStorage
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bharthi_completed_algorithms');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleComplete = (id: string) => {
    setCompletedIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('bharthi_completed_algorithms', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Algorithm step state
  const [currentInput, setCurrentInput] = useState<number[]>(selectedAlgorithm.defaultInput);
  const [steps, setSteps] = useState<AlgorithmStep[]>(() => executeAlgorithm(selectedAlgorithm.id, selectedAlgorithm.defaultInput));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [stageMode, setStageMode] = useState<'cartoon' | 'engineering'>('cartoon');
  const [reducedMotion, setReducedMotion] = useState(false);

  // Keyboard shortcut for Command+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync default input when algorithm changes
  useEffect(() => {
    setCurrentInput(selectedAlgorithm.defaultInput);
  }, [selectedAlgorithm.id, selectedAlgorithm.defaultInput]);

  // Generate steps whenever selectedAlgorithm or currentInput changes
  useEffect(() => {
    const newSteps = executeAlgorithm(selectedAlgorithm.id, currentInput);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [selectedAlgorithm.id, currentInput]);

  // Automated stepping loop with real-time sound effects
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isPlaying && currentStepIndex < steps.length - 1) {
      const delayMs = Math.max(120, 1000 / playbackSpeed);
      timer = setTimeout(() => {
        setCurrentStepIndex(prev => {
          const next = prev + 1;
          const nextStep = steps[next];
          if (nextStep) {
            if (nextStep.swappedIndices && nextStep.swappedIndices.length > 0) {
              soundFx.playSwapSound();
            } else if (nextStep.activeIndices && nextStep.activeIndices.length > 0) {
              soundFx.playComparisonSound();
            } else if (next === steps.length - 1) {
              soundFx.playSuccessChime();
            }
          }
          return next;
        });
      }, delayMs);
    } else if (isPlaying && currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
      soundFx.playSuccessChime();
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStepIndex, steps, playbackSpeed]);

  const currentStep = steps[currentStepIndex] || {
    stepIndex: 0,
    totalSteps: 1,
    description: 'Initial state of array.',
    codeLine: 1,
    arrayState: currentInput,
    variables: {}
  };

  const handleToggleAudio = () => {
    const next = soundFx.toggleMute();
    setIsAudioMuted(next);
  };

  const handleSelectAlgorithm = (algo: AlgorithmItem) => {
    setSelectedAlgorithm(algo);
    const cat = CATEGORIES.find(c => c.id === algo.categoryId) || selectedCategory;
    setSelectedCategory(cat);
    setCurrentView('visualizer');
    setSidebarOpen(false);
  };

  const handleCustomInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = customInputString
      .split(/[\s,]+/)
      .map(x => parseInt(x.trim(), 10))
      .filter(x => !isNaN(x) && x > 0 && x <= 999);
    if (parsed.length >= 2) {
      setCurrentInput(parsed.slice(0, 16));
      setIsCustomInputModalOpen(false);
      soundFx.playSuccessChime();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6FE] text-[#201538] flex flex-col font-sans selection:bg-[#7B42F6] selection:text-white">
      {/* 1. TOP NAVBAR */}
      <CheggNavbar
        currentView={currentView}
        onNavigateView={view => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={cat => {
          setSelectedCategory(cat);
          setCurrentView('category');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={handleSelectAlgorithm}
        onOpenSearch={() => setIsSearchOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onOpenMobileMenu={() => setSidebarOpen(true)}
      />

      {/* Global Quick Search Modal (⌘K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAlgorithm={handleSelectAlgorithm}
      />

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#1E1435]/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#E5DCF9] transform transition-transform duration-200 ease-in-out lg:hidden flex flex-col justify-between pt-4 pb-6 px-4 shadow-2xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
          <span className="text-xl font-black text-[#7B42F6]">Bharthi DAA</span>
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded text-[#887D9F] hover:bg-[#F4F0FF]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-1">
          <div className="text-[10px] font-mono font-bold text-[#887D9F] uppercase tracking-wider px-2 mb-1">
            DAA Syllabus (16 Units)
          </div>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentView('category');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between ${
                selectedCategory.id === cat.id ? 'bg-[#EDE8FE] text-[#7B42F6] font-bold' : 'text-[#201538] hover:bg-[#F4F0FF]'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="font-mono text-[#7B42F6] font-bold">{cat.indexStr}</span>
                <span className="truncate">{cat.title}</span>
              </div>
              <span className="text-[10px] font-mono text-[#887D9F]">{cat.lessonCount}</span>
            </button>
          ))}
        </div>

        <div className="pt-3 border-t border-[#E5DCF9] text-xs text-[#887D9F] font-mono">
          KCT CSE 23CS401 · 2025–2026
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER (Edge-to-Edge Full Page Width) */}
      <div className="flex-1 w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* ============================================================= */}
        {/* VIEW: VISUALIZER (Full-Page Edge-to-Edge Visualizer Studio)   */}
        {/* ============================================================= */}
        {currentView === 'visualizer' && (
          <div className="space-y-5 w-full">
            {/* 1. STUDIO HEADER & COMMAND BAR */}
            <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-4 sm:p-5 shadow-sm shadow-[#8C52FF]/5 flex flex-wrap items-center justify-between gap-4">
              {/* Left: Quick Path & Instant Algorithm Selector Dropdown */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <nav className="flex items-center gap-1.5 text-xs font-bold text-[#5B507A]">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setCurrentView('home');
                    }}
                    className="hover:text-[#7B42F6] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>🏠 Home</span>
                  </button>
                  <span className="text-[#D4C7F5]">›</span>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setCurrentView('category');
                    }}
                    className="hover:text-[#7B42F6] transition-colors cursor-pointer truncate max-w-[160px] sm:max-w-none"
                  >
                    {selectedCategory.title}
                  </button>
                  <span className="text-[#D4C7F5]">›</span>
                </nav>

                {/* Instant Algorithm Switcher Dropdown */}
                <div className="relative">
                  <select
                    value={selectedAlgorithm.id}
                    onChange={e => {
                      const target = ALGORITHMS.find(a => a.id === e.target.value);
                      if (target) handleSelectAlgorithm(target);
                    }}
                    className="text-xs sm:text-sm font-black text-[#201538] bg-[#F4F0FF] border-2 border-[#D4C7F5] rounded-2xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#7B42F6] cursor-pointer shadow-2xs"
                  >
                    {CATEGORIES.map(cat => (
                      <optgroup key={cat.id} label={`${cat.indexStr}. ${cat.title}`}>
                        {ALGORITHMS.filter(a => a.categoryId === cat.id).map(algo => (
                          <option key={algo.id} value={algo.id}>
                            {algo.name} ({algo.complexity.worst})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Asymptotic Badge */}
                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#FFF7D6] text-[#8C5300] border border-[#FFE082] shadow-2xs">
                  {selectedAlgorithm.complexity.worst}
                </span>

                {completedIds.includes(selectedAlgorithm.id) && (
                  <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-[#EBF7E3] text-[#33691E] border border-[#C5E1A5]">
                    ✓ Mastered
                  </span>
                )}
              </div>

              {/* Right: Stage Mode, Scenario Presets & Motion Controls */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Stage Mode Tabs */}
                <div className="flex items-center gap-1 bg-[#F4F0FF] p-1 rounded-2xl border border-[#E5DCF9]">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setStageMode('cartoon');
                    }}
                    className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      stageMode === 'cartoon'
                        ? 'bg-[#7B42F6] text-white shadow-xs'
                        : 'text-[#5B507A] hover:text-[#7B42F6] hover:bg-white/60'
                    }`}
                  >
                    <span>🎨 Cartoon Stage</span>
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setStageMode('engineering');
                    }}
                    className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      stageMode === 'engineering'
                        ? 'bg-[#7B42F6] text-white shadow-xs'
                        : 'text-[#5B507A] hover:text-[#7B42F6] hover:bg-white/60'
                    }`}
                  >
                    <span>⚙️ Engineering Canvas</span>
                  </button>
                </div>

                {/* Scenario Presets (For Array algorithms) */}
                {(selectedAlgorithm.id.includes('sort') || selectedAlgorithm.id.includes('search')) && (
                  <div className="hidden md:flex items-center gap-1 bg-[#F4F0FF] p-1 rounded-2xl border border-[#E5DCF9] text-xs font-mono font-bold">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        const rand = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 10);
                        setCurrentInput(rand);
                      }}
                      className="px-2.5 py-1 rounded-xl text-[#5B507A] hover:text-[#201538] hover:bg-white transition-colors"
                      title="Generate random array"
                    >
                      🎲 Random
                    </button>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentInput([15, 25, 38, 42, 60, 55, 78, 90]);
                      }}
                      className="px-2.5 py-1 rounded-xl text-[#5B507A] hover:text-[#201538] hover:bg-white transition-colors"
                      title="Nearly sorted array"
                    >
                      📈 Nearly Sorted
                    </button>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentInput([95, 85, 72, 60, 48, 35, 20, 10]);
                      }}
                      className="px-2.5 py-1 rounded-xl text-[#5B507A] hover:text-[#201538] hover:bg-white transition-colors"
                      title="Reverse sorted array"
                    >
                      📉 Reversed
                    </button>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setIsCustomInputModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-xl text-[#7B42F6] hover:bg-white font-extrabold transition-colors"
                      title="Custom input array"
                    >
                      ✏️ Custom
                    </button>
                  </div>
                )}

                {/* Reduced Motion Toggle */}
                <button
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition-all ${
                    reducedMotion
                      ? 'bg-[#FFF7D6] text-[#8C5300] border-[#FFE082]'
                      : 'bg-[#F4F0FF] text-[#5B507A] border-[#E5DCF9] hover:border-[#D4C7F5]'
                  }`}
                >
                  {reducedMotion ? '✓ Motion: Calm' : 'Motion: Animated'}
                </button>
              </div>
            </div>

            {/* 2. FULL-PAGE CARTOON ANIMATION STAGE (Immediate Full Width Edge-to-Edge) */}
            <div className="w-full">
              {stageMode === 'cartoon' ? (
                <CartoonStage
                  step={currentStep}
                  algorithmId={selectedAlgorithm.id}
                  algorithmName={selectedAlgorithm.name}
                  reducedMotion={reducedMotion}
                />
              ) : (
                <VisualizerCanvas step={currentStep} algorithmId={selectedAlgorithm.id} />
              )}
            </div>

            {/* 3. REAL-TIME VARIABLE WATCHER & CPU INVARIANTS (Full Width) */}
            <div className="w-full">
              <RealtimeVariableWatcher step={currentStep} algorithmId={selectedAlgorithm.id} />
            </div>

            {/* 4. FULL-WIDTH PLAYBACK DECK CONTROLS */}
            <div className="w-full">
              <PlaybackDeck
                currentStepIndex={currentStepIndex}
                totalSteps={steps.length}
                isPlaying={isPlaying}
                playbackSpeed={playbackSpeed}
                onPlayPauseToggle={() => setIsPlaying(!isPlaying)}
                onStepForward={() => {
                  if (currentStepIndex < steps.length - 1) {
                    const next = currentStepIndex + 1;
                    setCurrentStepIndex(next);
                    setIsPlaying(false);
                    const st = steps[next];
                    if (st?.swappedIndices?.length) soundFx.playSwapSound();
                    else soundFx.playComparisonSound();
                  }
                }}
                onStepBackward={() => {
                  if (currentStepIndex > 0) {
                    setCurrentStepIndex(currentStepIndex - 1);
                    setIsPlaying(false);
                    soundFx.playClick();
                  }
                }}
                onJumpStart={() => {
                  setCurrentStepIndex(0);
                  setIsPlaying(false);
                  soundFx.playClick();
                }}
                onJumpEnd={() => {
                  setCurrentStepIndex(steps.length - 1);
                  setIsPlaying(false);
                  soundFx.playSuccessChime();
                }}
                onReset={() => {
                  setCurrentStepIndex(0);
                  setIsPlaying(false);
                  soundFx.playClick();
                }}
                onSpeedChange={s => setPlaybackSpeed(s)}
                onPresetRandom={() => {
                  const rand = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 10);
                  setCurrentInput(rand);
                }}
                onPresetNearlySorted={() => setCurrentInput([15, 25, 38, 42, 60, 55, 78, 90])}
                onPresetReversed={() => setCurrentInput([95, 85, 72, 60, 48, 35, 20, 10])}
                onCustomInputSubmit={input => setCurrentInput(input)}
                onScrubStep={idx => setCurrentStepIndex(idx)}
                hasArrayInput={selectedAlgorithm.id.includes('sort') || selectedAlgorithm.id.includes('search')}
              />
            </div>

            {/* 5. FULL-WIDTH SECONDARY LEARNING & WORKSHOP SUITE */}
            <div className="w-full space-y-4 pt-1">
              {/* Studio Tabs Navigation */}
              <div className="flex items-center gap-2 border-b-2 border-[#E5DCF9] pb-1 overflow-x-auto select-none">
                {[
                  { id: 'walkthrough', label: '📊 Asymptotic Complexity & Invariants' },
                  { id: 'dryrun', label: '📝 Lab Dry-Run Worksheet' },
                  { id: 'code', label: '💻 Multi-Language Code (C++, Java, Python)' },
                  { id: 'quiz', label: '🎯 Step Prediction Quiz' },
                  { id: 'curriculum', label: '📚 DAA Syllabus (16 Units · 35+ Algorithms)' },
                  { id: 'telemetry', label: '⚙️ Real-Time Engine Telemetry' },
                  { id: 'summary', label: '📋 Summary & Examination Proofs' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTab(tab.id as any);
                    }}
                    className={`py-2 px-4 text-xs font-bold rounded-2xl transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-[#7B42F6] text-white shadow-xs'
                        : 'text-[#5B507A] hover:text-[#201538] hover:bg-[#F4F0FF]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Asymptotic Complexity & Invariant Proofs */}
              {activeTab === 'walkthrough' && (
                <div className="w-full">
                  <ComplexityCard
                    algorithm={selectedAlgorithm}
                    isCompleted={completedIds.includes(selectedAlgorithm.id)}
                    onToggleComplete={() => toggleComplete(selectedAlgorithm.id)}
                  />
                </div>
              )}

              {/* Tab 2: Dry Run Worksheet */}
              {activeTab === 'dryrun' && (
                <div className="w-full">
                  <DryRunWorksheet
                    steps={steps}
                    currentStepIndex={currentStepIndex}
                    algorithmTitle={selectedAlgorithm.name}
                    onSelectStep={idx => {
                      setCurrentStepIndex(idx);
                      setIsPlaying(false);
                    }}
                  />
                </div>
              )}

              {/* Tab 3: Code Trace View */}
              {activeTab === 'code' && (
                <div className="w-full">
                  <CodeTraceView
                    codeSnippets={selectedAlgorithm.codeSnippets}
                    activeLine={currentStep.codeLine}
                  />
                </div>
              )}

              {/* Tab 4: Prediction Quiz */}
              {activeTab === 'quiz' && (
                <div className="w-full">
                  {currentStep.quiz ? (
                    <StepPredictionQuiz quiz={currentStep.quiz} />
                  ) : (
                    <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-8 text-center space-y-2 shadow-sm shadow-[#8C52FF]/5">
                      <Code2 className="w-6 h-6 text-[#7B42F6] mx-auto animate-pulse" />
                      <h3 className="text-sm font-black text-[#201538]">
                        Interactive Step Prediction Point
                      </h3>
                      <p className="text-xs text-[#5B507A] max-w-sm mx-auto">
                        In sorting algorithms, advance to Step 3 or 4 to test element comparison and swapping predictions!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 5: DAA Syllabus Curriculum Browser (Full Width Grid) */}
              {activeTab === 'curriculum' && (
                <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 shadow-sm shadow-[#8C52FF]/5 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
                    <div>
                      <h3 className="text-base font-black text-[#201538]">
                        DAA 23CS401 Autonomous Curriculum Library
                      </h3>
                      <p className="text-xs text-[#5B507A]">
                        Select any unit or algorithm to launch its live cartoon simulation.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#7B42F6] bg-[#EDE8FE] px-3 py-1 rounded-full border border-[#D4C7F5]">
                      16 Units · 35+ Algorithms
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {CATEGORIES.map(cat => (
                      <div
                        key={cat.id}
                        className={`p-3.5 rounded-2xl border-2 transition-all ${
                          selectedCategory.id === cat.id
                            ? 'bg-[#F4F0FF] border-[#7B42F6] shadow-xs'
                            : 'bg-white border-[#E5DCF9] hover:border-[#D4C7F5]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-black text-[#7B42F6]">
                            Unit {cat.indexStr}
                          </span>
                          <span className="text-[10px] font-mono text-[#5B507A] bg-[#EDE8FE] px-2 py-0.5 rounded-md">
                            {cat.lessonCount}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#201538] mb-2 truncate">
                          {cat.title}
                        </h4>
                        <div className="space-y-1">
                          {ALGORITHMS.filter(a => a.categoryId === cat.id).map(algo => (
                            <button
                              key={algo.id}
                              onClick={() => {
                                soundFx.playClick();
                                handleSelectAlgorithm(algo);
                              }}
                              className={`w-full text-left px-2 py-1 rounded-lg text-[11px] font-mono flex items-center justify-between transition-colors ${
                                selectedAlgorithm.id === algo.id
                                  ? 'bg-[#7B42F6] text-white font-black'
                                  : 'text-[#5B507A] hover:bg-[#F4F0FF] hover:text-[#201538]'
                              }`}
                            >
                              <span className="truncate">{algo.name}</span>
                              <span className="text-[9px] opacity-75">{algo.complexity.worst}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 6: Hardware Engine & Telemetry */}
              {activeTab === 'telemetry' && (
                <div className="w-full">
                  <CheggRightSidebar
                    algorithmName={selectedAlgorithm.name}
                    currentStep={currentStep}
                    currentStepIndex={currentStepIndex}
                    totalSteps={steps.length}
                    isPlaying={isPlaying}
                    onTogglePlay={() => setIsPlaying(!isPlaying)}
                    playbackSpeed={playbackSpeed}
                    onChangeSpeed={s => setPlaybackSpeed(s)}
                    onPresetRandom={() => {
                      const rand = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 10);
                      setCurrentInput(rand);
                    }}
                    onPresetNearlySorted={() => setCurrentInput([15, 25, 38, 42, 60, 55, 78, 90])}
                    onPresetReversed={() => setCurrentInput([95, 85, 72, 60, 48, 35, 20, 10])}
                    onOpenCustomModal={() => setIsCustomInputModalOpen(true)}
                    isAudioMuted={isAudioMuted}
                    onToggleAudio={handleToggleAudio}
                    onLaunchRaceArena={() => setCurrentView('compare')}
                  />
                </div>
              )}

              {/* Tab 7: Algorithm Invariant Summary */}
              {activeTab === 'summary' && (
                <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 shadow-sm shadow-[#8C52FF]/5 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E5DCF9]">
                    <span className="text-xl">📋</span>
                    <div>
                      <h3 className="text-base font-black text-[#201538]">
                        {selectedAlgorithm.name} · Formal Invariant &amp; Examination Notes
                      </h3>
                      <p className="text-xs text-[#5B507A]">
                        KCT CSE 23CS401 Tier-1 Syllabus Academic Regulation
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#201538] leading-relaxed">
                    <li className="flex items-start gap-2.5 bg-[#F8F6FE] p-3 rounded-2xl border border-[#E5DCF9]">
                      <span className="text-[#7B42F6] font-black text-base leading-none">•</span>
                      <span>
                        <strong>Real-Time Deterministic Simulation:</strong> Live execution advances step-by-step with synchronized register mutations, array element swaps, and sound feedback.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 bg-[#F8F6FE] p-3 rounded-2xl border border-[#E5DCF9]">
                      <span className="text-[#7B42F6] font-black text-base leading-none">•</span>
                      <span>
                        <strong>Verified Loop Invariants:</strong> Formal mathematical proof invariants are verified at every iteration for KCT Autonomous 16-mark examinations.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 bg-[#F8F6FE] p-3 rounded-2xl border border-[#E5DCF9]">
                      <span className="text-[#7B42F6] font-black text-base leading-none">•</span>
                      <span>
                        <strong>Multi-Language Implementations:</strong> Line-by-line synchronized source code available in standard C++, Java, and Python with dynamic PC line cursor.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 bg-[#F8F6FE] p-3 rounded-2xl border border-[#E5DCF9]">
                      <span className="text-[#7B42F6] font-black text-base leading-none">•</span>
                      <span>
                        <strong>Interactive Dry-Run Worksheet:</strong> Fillable student tracing matrix designed for laboratory evaluations and autonomous internal assessments.
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW: HOME DASHBOARD (Clean EdTech ERP Overview)              */}
        {/* ============================================================= */}
        {currentView === 'home' && (
          <div className="space-y-8">
            {/* Editorial Hero Banner */}
            <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 sm:p-10 shadow-sm shadow-[#8C52FF]/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#EDE8FE]/50 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8FE] border border-[#D4C7F5] text-xs font-bold text-[#7B42F6]">
                    <Code2 className="w-3.5 h-3.5 text-[#FFB800]" />
                    <span>A little curiosity. A lot of clarity.</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#201538] leading-tight">
                    Big algorithmic ideas.<br />
                    <span className="text-[#7B42F6]">
                      One real-time step at a time.
                    </span>
                  </h1>

                  <p className="text-sm text-[#5B507A] max-w-xl leading-relaxed">
                    Interactive real-time algorithm visualizer and DAA learning platform for Kumaraguru College of Technology students. Learn algorithmic intuition, step through live cartoon traces, benchmark algorithm races, and prepare for university examinations effortlessly.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        const bubbleAlgo = ALGORITHMS.find(a => a.id === 'bubble_sort') || ALGORITHMS[0];
                        setSelectedAlgorithm(bubbleAlgo);
                        setCurrentView('visualizer');
                      }}
                      className="px-6 py-3 bg-[#7B42F6] hover:bg-[#6830E0] text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
                    >
                      <span>Launch Visualizer Studio</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentView('classroom');
                      }}
                      className="px-5 py-3 bg-[#F8F6FE] hover:bg-[#EDE8FE] text-[#201538] border border-[#E5DCF9] rounded-full text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Radio className="w-3.5 h-3.5 text-[#7B42F6]" />
                      <span>Live Lab Classroom</span>
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentView('compare');
                      }}
                      className="px-5 py-3 bg-[#F8F6FE] hover:bg-[#EDE8FE] text-[#201538] border border-[#E5DCF9] rounded-full text-xs font-bold transition-colors cursor-pointer"
                    >
                      Multi-Algo Race Arena
                    </button>
                  </div>
                </div>

                {/* Hero Interactive Metric Box */}
                <div className="lg:col-span-5">
                  <div className="bg-[#1E1435] text-white rounded-3xl p-6 shadow-xl border border-[#2E2050] space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#FFC72C] font-black uppercase text-[11px] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#8BC34A] animate-ping" />
                        From confusion to clarity
                      </span>
                      <span className="font-bold text-purple-200 bg-[#2D1F4D] px-2 py-0.5 rounded border border-[#3E2D69]">
                        O(n log n)
                      </span>
                    </div>

                    <div className="h-32 flex items-end justify-center gap-2 pt-2">
                      {[35, 65, 45, 90, 55, 75].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                          <span className="text-[10px] font-mono text-purple-200/80 mb-1">{val}</span>
                          <div
                            style={{ height: `${(val / 90) * 100}%` }}
                            className={`w-full rounded-t-lg transition-all ${
                              idx === 3 ? 'bg-[#7B42F6]' : idx === 1 ? 'bg-[#FFC72C]' : 'bg-[#3E2D69]'
                            }`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] font-mono text-purple-200/70 pt-2 border-t border-[#2E2050] flex justify-between">
                      <span>Live CPU Simulation</span>
                      <span className="text-[#8BC34A] font-bold">● Active 24 kHz</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Learning Tracks */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#7B42F6] uppercase tracking-wider block font-mono">
                  CHOOSE YOUR NEXT STEP
                </span>
                <h2 className="text-xl font-extrabold text-[#201538]">
                  A path for every curious mind
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => {
                    soundFx.playClick();
                    const bubbleAlgo = ALGORITHMS.find(a => a.id === 'bubble_sort') || ALGORITHMS[0];
                    setSelectedAlgorithm(bubbleAlgo);
                    setCurrentView('visualizer');
                  }}
                  className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-5 shadow-2xs hover:border-[#7B42F6] cursor-pointer transition-all space-y-3 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#7B42F6] uppercase tracking-wider font-mono">
                      START HERE
                    </span>
                    <span className="text-lg font-mono font-bold text-[#D4C7F5]">01</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#201538] group-hover:text-[#7B42F6] transition-colors">
                    Start with the fundamentals
                  </h3>
                  <p className="text-xs text-[#5B507A] leading-relaxed">
                    Build intuition with sorting, searching, and asymptotic algorithm analysis.
                  </p>
                  <div className="text-xs font-bold text-[#7B42F6] flex items-center gap-1">
                    <span>Let&apos;s get started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div
                  onClick={() => {
                    soundFx.playClick();
                    const bfsAlgo = ALGORITHMS.find(a => a.id === 'graph_bfs') || ALGORITHMS[0];
                    setSelectedAlgorithm(bfsAlgo);
                    setCurrentView('visualizer');
                  }}
                  className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-5 shadow-2xs hover:border-[#7B42F6] cursor-pointer transition-all space-y-3 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#7B42F6] uppercase tracking-wider font-mono">
                      EXPLORE
                    </span>
                    <span className="text-lg font-mono font-bold text-[#D4C7F5]">02</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#201538] group-hover:text-[#7B42F6] transition-colors">
                    Think in graphs &amp; queues
                  </h3>
                  <p className="text-xs text-[#5B507A] leading-relaxed">
                    Explore node connections, queue level traversals, and shortest path trees.
                  </p>
                  <div className="text-xs font-bold text-[#7B42F6] flex items-center gap-1">
                    <span>Let&apos;s get started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div
                  onClick={() => {
                    soundFx.playClick();
                    const knapsackAlgo = ALGORITHMS.find(a => a.id === 'knapsack_dp') || ALGORITHMS[0];
                    setSelectedAlgorithm(knapsackAlgo);
                    setCurrentView('visualizer');
                  }}
                  className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-5 shadow-2xs hover:border-[#7B42F6] cursor-pointer transition-all space-y-3 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#7B42F6] uppercase tracking-wider font-mono">
                      CONCEPT LIBRARY
                    </span>
                    <span className="text-lg font-mono font-bold text-[#D4C7F5]">03</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#201538] group-hover:text-[#7B42F6] transition-colors">
                    Dynamic programming &amp; memoization
                  </h3>
                  <p className="text-xs text-[#5B507A] leading-relaxed">
                    Build your understanding of 0/1 knapsack, recurrence relations, and DP tables.
                  </p>
                  <div className="text-xs font-bold text-[#7B42F6] flex items-center gap-1">
                    <span>Let&apos;s get started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* 16 Syllabus Categories Grid */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#7B42F6] uppercase tracking-wider block font-mono">
                  YOUR ALGORITHM LIBRARY
                </span>
                <h2 className="text-2xl font-extrabold text-[#201538] tracking-tight">
                  16 Curriculum Modules · 35+ Live Interactive Traces
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORIES.map(cat => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedCategory(cat);
                      setCurrentView('category');
                    }}
                    className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-4 shadow-2xs hover:border-[#7B42F6] cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className="text-lg font-mono font-bold text-[#7B42F6]">
                        {cat.indexStr}
                      </span>
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-[#201538] truncate group-hover:text-[#7B42F6] transition-colors">
                          {cat.title}
                        </h4>
                        <span className="text-[11px] text-[#5B507A]">
                          {cat.lessonCount} lessons
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#887D9F] group-hover:text-[#7B42F6] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW: CATEGORY DETAILS (Curriculum Module View)               */}
        {/* ============================================================= */}
        {currentView === 'category' && (
          <div className="space-y-6">
            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentView('home');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#7B42F6] hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Syllabus Dashboard
            </button>

            <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 sm:p-8 shadow-sm shadow-[#8C52FF]/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7B42F6]">
                <span>Unit {selectedCategory.indexStr}</span>
                <span>•</span>
                <span>{selectedCategory.lessonCount} Lessons &amp; Explorations</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#201538] tracking-tight">
                {selectedCategory.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#5B507A] max-w-2xl leading-relaxed">
                {selectedCategory.description}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-bold text-[#887D9F] uppercase tracking-wider font-mono">
                Interactive Runnable Modules in this Unit
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALGORITHMS.filter(a => a.categoryId === selectedCategory.id).map(algo => {
                  const isDone = completedIds.includes(algo.id);
                  return (
                    <div
                      key={algo.id}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedAlgorithm(algo);
                        setCurrentView('visualizer');
                      }}
                      className={`bg-white border-2 rounded-2xl p-5 shadow-2xs cursor-pointer hover:border-[#7B42F6] transition-all space-y-3 ${
                        isDone ? 'border-[#8BC34A] ring-1 ring-[#C5E1A5]' : 'border-[#E5DCF9]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-[#201538]">
                          {algo.name}
                        </h3>
                        {isDone && (
                          <span className="text-[10px] bg-[#EBF7E3] text-[#33691E] font-bold px-2.5 py-0.5 rounded-full border border-[#C5E1A5]">
                            Mastered
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5B507A] leading-relaxed">
                        {algo.shortDesc}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-[#E5DCF9] text-[11px] font-mono text-[#5B507A]">
                        <span>Worst: {algo.complexity.worst}</span>
                        <span>Space: {algo.complexity.space}</span>
                        <span className="text-[#7B42F6] font-bold flex items-center gap-1">
                          Launch Visualizer &rarr;
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW: LIVE CLASSROOM                                          */}
        {/* ============================================================= */}
        {currentView === 'classroom' && (
          <div className="space-y-6">
            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentView('home');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#7B42F6] hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <LiveClassroomSession
              onSelectAlgorithm={algoId => {
                soundFx.playClick();
                const target = ALGORITHMS.find(a => a.id === algoId) || ALGORITHMS[0];
                handleSelectAlgorithm(target);
              }}
            />
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW: MASTER THEOREM SOLVER                                   */}
        {/* ============================================================= */}
        {currentView === 'master_theorem' && (
          <div className="space-y-6">
            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentView('home');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#7B42F6] hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <MasterTheoremSolver />
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW: MULTI-ALGO RACE ARENA                                   */}
        {/* ============================================================= */}
        {currentView === 'compare' && (
          <div className="space-y-6">
            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentView('home');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#7B42F6] hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <AlgorithmComparator />
          </div>
        )}
      </div>

      {/* 3. CUSTOM ARRAY INPUT MODAL */}
      {isCustomInputModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1E1435]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E5DCF9] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
              <div className="flex items-center gap-2">
                <span className="text-xl">✏️</span>
                <h3 className="text-base font-black text-[#201538]">Enter Custom Input Array</h3>
              </div>
              <button
                onClick={() => setIsCustomInputModalOpen(false)}
                className="p-1 rounded-lg text-[#887D9F] hover:bg-[#F4F0FF] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCustomInputSubmit} className="mt-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#201538]">Comma-separated numbers (2 to 16 elements):</label>
                <input
                  type="text"
                  value={customInputString}
                  onChange={e => setCustomInputString(e.target.value)}
                  placeholder="e.g. 45, 12, 89, 34, 25, 77"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E5DCF9] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#7B42F6]"
                />
              </div>

              <div className="text-[11px] text-[#5B507A]">
                Values should be positive integers. The real-time simulator will immediately compile and start tracing this dataset.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCustomInputModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#E5DCF9] text-[#5B507A] font-bold text-xs hover:bg-[#F4F0FF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#7B42F6] text-white font-bold text-xs hover:bg-[#6830E0] shadow-xs"
                >
                  Load &amp; Run
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. FOOTER */}
      <footer className="mt-auto bg-white border-t-2 border-[#E5DCF9] py-6 px-4 sm:px-6 lg:px-8 text-xs text-[#5B507A] select-none">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-[#201538] text-sm">Bharthi DAA Visualizer</span>
            <span>·</span>
            <span>KCT Computer Science &amp; Engineering Department</span>
          </div>

          <div className="flex items-center gap-4 text-[#887D9F] font-mono text-[11px]">
            <span>Course Code: 23CS401</span>
            <span>•</span>
            <span>Regulation 2022 CBCS</span>
            <span>•</span>
            <span>Real-Time Engine v2.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
