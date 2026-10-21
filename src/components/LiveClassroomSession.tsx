import React, { useState, useEffect } from 'react';
import {
  Users,
  MessageSquare,
  Code2,
  Send,
  Trophy,
  CheckCircle2,
  Clock,
  Radio,
  ArrowRight,
  HelpCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface PeerActivity {
  id: string;
  studentName: string;
  rollNo: string;
  action: string;
  algorithm: string;
  timeAgo: string;
  badge?: string;
}

interface DoubtMessage {
  id: string;
  author: string;
  isFaculty?: boolean;
  role: string;
  content: string;
  algorithmTag: string;
  time: string;
  likes: number;
}

const INITIAL_ACTIVITIES: PeerActivity[] = [
  {
    id: '1',
    studentName: 'Harish S.',
    rollNo: '23BCS042',
    action: 'Mastered Dry Run Worksheet',
    algorithm: 'Merge Sort',
    timeAgo: 'Just now',
    badge: '100% Score'
  },
  {
    id: '2',
    studentName: 'Priyanka V.',
    rollNo: '23BCS108',
    action: 'Solved Recurrence Case 2',
    algorithm: 'Master Theorem',
    timeAgo: '1m ago',
    badge: 'DAA Unit 1'
  },
  {
    id: '3',
    studentName: 'Kavya M.',
    rollNo: '23BCS089',
    action: 'Ran Side-by-Side Benchmark',
    algorithm: 'Insertion vs Bubble Sort',
    timeAgo: '3m ago'
  },
  {
    id: '4',
    studentName: 'Dinesh Kumar',
    rollNo: '23BCS031',
    action: 'Completed Trace Table',
    algorithm: '0/1 Knapsack DP',
    timeAgo: '5m ago',
    badge: 'Optimal DP'
  },
  {
    id: '5',
    studentName: 'Sanjay Krishnan',
    rollNo: '23BCS144',
    action: 'Stepped through 8-Queens',
    algorithm: 'Backtracking',
    timeAgo: '8m ago'
  }
];

const INITIAL_DOUBTS: DoubtMessage[] = [
  {
    id: 'd1',
    author: 'Prof. J. Sundaram',
    isFaculty: true,
    role: 'DAA Course Coordinator · KCT CSE',
    content: 'Important Lab Viva Tip: Always state the loop invariant before showing why Selection Sort does not preserve stability when equal keys swap past each other.',
    algorithmTag: 'Selection Sort',
    time: '10:15 AM',
    likes: 24
  },
  {
    id: 'd2',
    author: 'Adhithya M.',
    role: '23BCS015 · Student',
    content: 'Why does Binary Search require a strictly sorted array? What happens to the mid calculation if low + high overflows in 32-bit integer?',
    algorithmTag: 'Binary Search',
    time: '10:22 AM',
    likes: 12
  },
  {
    id: 'd3',
    author: 'Dr. Anandhi R.',
    isFaculty: true,
    role: 'DAA Faculty Mentor',
    content: 'To prevent integer overflow in C++/Java, always compute mid as: low + (high - low) / 2 instead of (low + high) / 2.',
    algorithmTag: 'Binary Search',
    time: '10:25 AM',
    likes: 31
  },
  {
    id: 'd4',
    author: 'Sneha R.',
    role: '23BCS160 · Student',
    content: 'In 0/1 Knapsack, if the current item weight w[i] is greater than capacity w, do we copy DP[i-1][w]?',
    algorithmTag: 'Knapsack DP',
    time: '10:38 AM',
    likes: 9
  }
];

export interface LiveClassroomSessionProps {
  onSelectAlgorithm: (algoId: string) => void;
}

export const LiveClassroomSession: React.FC<LiveClassroomSessionProps> = ({ onSelectAlgorithm }) => {
  const [onlineCount, setOnlineCount] = useState(38);
  const [activities, setActivities] = useState<PeerActivity[]>(INITIAL_ACTIVITIES);
  const [doubts, setDoubts] = useState<DoubtMessage[]>(INITIAL_DOUBTS);
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedTag, setSelectedTag] = useState('Sorting');
  const [activeTab, setActiveTab] = useState<'stream' | 'challenges' | 'leaderboard'>('stream');

  // Simulate real-time peer pulses
  useEffect(() => {
    const interval = setInterval(() => {
      // Small fluctuation in online students
      setOnlineCount(prev => Math.max(28, Math.min(52, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    soundFx.playClick();
    const newEntry: DoubtMessage = {
      id: Date.now().toString(),
      author: 'You (KCT Student)',
      role: '23BCS005 · CSE Batch A',
      content: newQuestion.trim(),
      algorithmTag: selectedTag,
      time: 'Just now',
      likes: 1
    };

    setDoubts([newEntry, ...doubts]);
    setNewQuestion('');

    // Simulated automated faculty answer after 2.5 seconds
    setTimeout(() => {
      const responseEntry: DoubtMessage = {
        id: (Date.now() + 1).toString(),
        author: 'KCT DAA Automated Mentor',
        isFaculty: true,
        role: 'Verified Academic Answer',
        content: `Great question regarding ${selectedTag}! Remember to dry-run with input [20, 10, 30] and check time complexity $O(n)$ in the Best Case and $O(n^2)$ in the Worst Case.`,
        algorithmTag: selectedTag,
        time: 'Just now',
        likes: 2
      };
      setDoubts(prev => [responseEntry, ...prev]);
      soundFx.playSuccessChime();
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Real-Time Live Header Banner */}
      <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-100/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-100/60 to-blue-50/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 border border-sky-200 text-sky-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                REAL-TIME CLASSROOM LAB
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Kumaraguru College of Technology
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              KCT DAA Real-Time Collaborative Hub
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Collaborative learning space for Computer Science students. Watch live peer explorations, ask real-time viva doubts, and benchmark algorithms synchronously.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-sky-50/80 border border-sky-200/80 rounded-xl p-3.5 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-sky-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900 font-mono">{onlineCount}</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <span className="text-xs font-semibold text-sky-800">Students Learning Live</span>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-sky-100">
          <button
            onClick={() => setActiveTab('stream')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'stream'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20'
                : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Live Activity & Doubts Stream</span>
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'challenges'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20'
                : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Lab Practice Challenges</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20'
                : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>KCT DAA Leaderboard</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE STREAM & DOUBTS */}
      {activeTab === 'stream' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Discussion & Doubts (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-sky-100 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Real-Time DAA Q&A & Faculty Tips
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Live Sync Active</span>
              </div>

              {/* Doubt Input form */}
              <form onSubmit={handlePostDoubt} className="space-y-3 mb-6 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Ask a Question / DAA Viva Doubt</span>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="text-xs bg-white border border-slate-300 rounded-md px-2 py-1 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="Sorting">Sorting Algorithms</option>
                    <option value="Binary Search">Binary Search</option>
                    <option value="Master Theorem">Master Theorem</option>
                    <option value="Knapsack DP">0/1 Knapsack DP</option>
                    <option value="Graphs">Graph BFS/DFS</option>
                    <option value="Backtracking">N-Queens</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="e.g. Why is Merge Sort stable while Quick Sort is not?"
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-sky-600/20 shrink-0 transition-transform active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post</span>
                  </button>
                </div>
              </form>

              {/* Stream of Doubts */}
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {doubts.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border text-xs transition-all ${
                      item.isFaculty
                        ? 'bg-sky-50/70 border-sky-200 text-slate-800'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${item.isFaculty ? 'text-sky-800' : 'text-slate-900'}`}>
                          {item.author}
                        </span>
                        {item.isFaculty && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-200 text-sky-800">
                            Faculty Note
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-mono">({item.role})</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400">{item.time}</span>
                    </div>

                    <p className="text-slate-700 leading-relaxed font-normal mb-2.5">
                      {item.content}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono font-medium">
                        #{item.algorithmTag}
                      </span>
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setDoubts(prev =>
                            prev.map(d => (d.id === item.id ? { ...d, likes: d.likes + 1 } : d))
                          );
                        }}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-sky-600 font-medium"
                      >
                        <Code2 className="w-3.5 h-3.5 text-amber-500" />
                        <span>Helpful ({item.likes})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Peer Feed & Quick Jumps (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-sky-100 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Live Peer Activity Ticker
                  </h3>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-3">
                {activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-lg bg-slate-50 hover:bg-sky-50/50 border border-slate-100 hover:border-sky-100 transition-colors flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">{act.studentName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({act.rollNo})</span>
                        {act.badge && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                            {act.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {act.action} &bull; <span className="font-semibold text-sky-700">{act.algorithm}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
                      {act.timeAgo}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Study Presets */}
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl p-5 text-white shadow-md shadow-sky-500/20 space-y-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-300" />
                <h4 className="font-bold text-sm">Today&apos;s High-Yield DAA Exam Focus</h4>
              </div>
              <p className="text-xs text-sky-100 leading-relaxed">
                Unit 2 Divide &amp; Conquer algorithms and 0/1 Knapsack DP recurrence relations are scheduled for this week&apos;s laboratory evaluation.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => onSelectAlgorithm('bubble_sort')}
                  className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-between transition-colors"
                >
                  <span>Launch Bubble Sort Visualizer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectAlgorithm('binary_search')}
                  className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-between transition-colors"
                >
                  <span>Launch Binary Search Stepper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectAlgorithm('knapsack_dp')}
                  className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-between transition-colors"
                >
                  <span>Launch 0/1 Knapsack DP Matrix</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LAB CHALLENGES */}
      {activeTab === 'challenges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: 'c1',
              title: 'Lab 1: Sorting Pass Inspection',
              desc: 'Step through Bubble Sort with worst-case reversed input [90, 80, 70, 60, 50] and verify total comparison count = n*(n-1)/2.',
              algoId: 'bubble_sort',
              difficulty: 'Easy',
              points: '10 Marks'
            },
            {
              id: 'c2',
              title: 'Lab 2: Binary Search Edge Cases',
              desc: 'Inspect target value 55 in an array where it does not exist. Observe when low > high triggers termination.',
              algoId: 'binary_search',
              difficulty: 'Medium',
              points: '15 Marks'
            },
            {
              id: 'c3',
              title: 'Lab 3: Stack Underflow & Overflow Checks',
              desc: 'Simulate LIFO behavior with MAX_SIZE=5. Test condition when top pointer reaches MAX_SIZE-1.',
              algoId: 'stack_ds',
              difficulty: 'Easy',
              points: '10 Marks'
            },
            {
              id: 'c4',
              title: 'Lab 4: 0/1 Knapsack Optimal Substructure',
              desc: 'Trace cell DP[i][w] = max(DP[i-1][w], val[i] + DP[i-1][w-wt[i]]) and identify the backtrack path for selected items.',
              algoId: 'knapsack_dp',
              difficulty: 'Hard',
              points: '20 Marks'
            }
          ].map((challenge) => (
            <div key={challenge.id} className="bg-white border border-sky-100 rounded-xl p-5 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                    {challenge.difficulty}
                  </span>
                  <span className="text-xs font-bold text-amber-600 font-mono">{challenge.points}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{challenge.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{challenge.desc}</p>
              </div>

              <button
                onClick={() => onSelectAlgorithm(challenge.algoId)}
                className="w-full py-2.5 px-4 rounded-lg bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-700 font-bold text-xs flex items-center justify-center gap-2 border border-sky-200 transition-all active:scale-95"
              >
                <span>Start Lab Challenge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white border border-sky-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">KCT DAA Weekly Student Leaderboard</h3>
              <p className="text-xs text-slate-500">Ranked by algorithm dry-run worksheets generated and prediction quiz scores</p>
            </div>
            <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Week 4 Evaluation
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              { rank: 1, name: 'Adhithya M.', roll: '23BCS015', score: 980, algos: 14, badge: 'Gold Scholar' },
              { rank: 2, name: 'Deepa Rajan', roll: '23BCS038', score: 940, algos: 13, badge: 'Silver Scholar' },
              { rank: 3, name: 'Harish S.', roll: '23BCS042', score: 915, algos: 12, badge: 'Bronze Scholar' },
              { rank: 4, name: 'Kavya M.', roll: '23BCS089', score: 870, algos: 11, badge: 'Top 5%' },
              { rank: 5, name: 'Sanjay Krishnan', roll: '23BCS144', score: 850, algos: 10, badge: 'Top 10%' },
              { rank: 6, name: 'Priyanka V.', roll: '23BCS108', score: 820, algos: 9, badge: 'Top 10%' }
            ].map((st) => (
              <div key={st.rank} className="py-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold font-mono text-xs ${
                    st.rank === 1
                      ? 'bg-amber-400 text-slate-900 shadow-sm shadow-amber-300'
                      : st.rank === 2
                      ? 'bg-slate-300 text-slate-800'
                      : st.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {st.rank}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{st.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{st.roll}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-slate-600 font-medium hidden sm:inline">{st.algos} Algos Mastered</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                    {st.badge}
                  </span>
                  <span className="font-mono font-bold text-sky-700 text-sm">{st.score} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
