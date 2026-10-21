import React from 'react';
import { AlgorithmStep } from '../../engine/types';
import { CartoonCharacter } from './CartoonCharacter';
import { SpeechBubble } from './SpeechBubble';
import { Search, Compass, ShieldAlert, Award, Footprints, Package, ArrowRight, ArrowDown, ArrowUp, Undo2, Crown, Trophy, Layers, CheckCircle2, Split } from 'lucide-react';

interface CartoonStageProps {
  step: AlgorithmStep;
  algorithmId: string;
  algorithmName: string;
  reducedMotion?: boolean;
}

export const CartoonStage: React.FC<CartoonStageProps> = ({
  step,
  algorithmId,
  algorithmName,
  reducedMotion = false
}) => {
  const array = step.arrayState || [65, 35, 45, 90, 55, 75];
  const maxVal = Math.max(...array, 10);
  const minVal = Math.min(...array, 0);
  const activeIndices = step.activeIndices || [];
  const swappedIndices = step.swappedIndices || [];
  const sortedIndices = step.sortedIndices || [];
  const pivotIndex = step.pivotIndex;
  const targetIndex = step.targetIndex;

  // =========================================================================
  // =========================================================================
  // 1. STACK CARTOON SCENE (Kids Attractive Warm Beige & Biscuit)
  // =========================================================================
  if (step.stackState && (step.stackState.length > 0 || algorithmId === 'stack_ds')) {
    const stack = step.stackState || [];
    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[380px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col items-center justify-end relative overflow-hidden">
          <div className="w-80 max-w-full h-64 border-x-4 border-b-4 border-[#B07038] rounded-b-3xl bg-[#FFFDFB]/95 p-3 flex flex-col-reverse gap-2 items-center justify-start shadow-inner overflow-hidden relative">
            {stack.length === 0 ? (
              <div className="text-[#9C826B] text-xs text-center mt-20 font-mono font-medium">
                Stack Canister Empty<br />
                <span className="text-[11px] text-rose-500 font-bold">(Underflow Condition)</span>
              </div>
            ) : (
              stack.map((item, idx) => {
                const isTop = idx === stack.length - 1;
                return (
                  <div
                    key={idx}
                    className={`w-full py-2.5 px-4 rounded-2xl flex items-center justify-between border-2 transition-all duration-300 ${
                      isTop
                        ? 'bg-amber-100 border-amber-400 text-amber-950 font-black shadow-md scale-102 ring-4 ring-amber-300/40 animate-pulse'
                        : 'bg-[#FBF4EA] border-[#D4A373] text-[#5C3617] font-bold shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono opacity-80">#{idx}</span>
                      <span className="text-sm font-mono font-extrabold">{item}</span>
                    </div>
                    {isTop && (
                      <span className="text-[10px] font-mono font-extrabold bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full uppercase shadow-2xs">
                        TOP 👈
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <div className="text-xs font-mono text-[#7A6451] mt-3 font-bold flex items-center gap-2">
            <span>Canister Mode: LIFO (Last-In, First-Out)</span>
            <span className="text-[#EB6100] font-extrabold">Size: {stack.length}</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. QUEUE & CIRCULAR QUEUE CARTOON SCENE (Kids Attractive Warm Beige & Biscuit)
  // =========================================================================
  if (step.queueState && (step.queueState.length > 0 || algorithmId === 'queue_ds' || algorithmId === 'circular_queue')) {
    const queue = step.queueState || [];
    const isCircular = step.isCircularQueue || algorithmId === 'circular_queue';

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <div className="w-full max-w-4xl flex justify-between text-xs font-mono font-bold mb-3 px-2">
            <span className="text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 shadow-2xs">
              ← FRONT (Service Window)
            </span>
            <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
              REAR (Arrival Gate) ←
            </span>
          </div>

          <div className="w-full max-w-4xl h-36 border-2 border-[#D4A373] rounded-3xl bg-[#FFFDFB]/95 p-4 flex items-center gap-3 overflow-x-auto shadow-inner">
            {queue.length === 0 ? (
              <div className="w-full text-center text-[#9C826B] text-xs font-mono font-bold">
                Queue Waiting Pipeline is Empty
              </div>
            ) : (
              queue.map((item, idx) => {
                const isFront = idx === 0;
                const isRear = idx === queue.length - 1;
                return (
                  <div
                    key={idx}
                    className={`flex-1 min-w-[120px] h-24 rounded-2xl p-2.5 flex flex-col items-center justify-center font-mono font-bold border-2 transition-all duration-300 ${
                      isFront
                        ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-md ring-4 ring-rose-300/40 scale-102'
                        : isRear
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-md ring-4 ring-emerald-300/40 scale-102'
                        : 'bg-[#FBF5EC] border-[#DECBB5] text-[#5C3617] shadow-xs'
                    }`}
                  >
                    <span className="text-base font-extrabold">{item}</span>
                    <span className="text-[10px] opacity-80 mt-1 font-semibold">
                      {isFront && isRear ? 'FRONT & REAR' : isFront ? 'FRONT (Next Out)' : isRear ? 'REAR (Last In)' : `Slot #${idx}`}
                    </span>
                  </div>
                );
              })
            )}
          </div>
          <div className="text-xs font-mono text-[#7A6451] mt-3 font-semibold flex items-center gap-2">
            <span>{isCircular ? 'Ring Buffer Carousel (Modulo Wraparound)' : 'Conveyor Queue (FIFO)'}</span>
            {isCircular && <span className="bg-[#FBEFE3] text-[#8C4A19] px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#E8DAC7]">Modulo Math Active</span>}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. GRAPH ALGORITHMS CARTOON SCENE (BFS, DFS, Dijkstra, Kruskal's MST)
  // =========================================================================
  if (step.graphNodes && step.graphNodes.length > 0) {
    const nodes = step.graphNodes;
    const edges = step.graphEdges || [];

    const isBfs = algorithmId === 'bfs' || Boolean(step.queueState && step.queueState.length > 0) || Boolean(step.variables.queue);
    const isDfs = algorithmId === 'dfs' || Boolean(step.stackState && step.stackState.length > 0) || Boolean(step.variables.call_stack) || step.description.toLowerCase().includes('dfs');
    const isBacktracking = step.description.toLowerCase().includes('backtrack') || Boolean(step.variables.current && step.variables.current.toLowerCase().includes('backtrack'));

    // Find currently visiting node for Explorer positioning
    const activeNode = nodes.find(n => n.status === 'visiting')
      || (step.variables.current ? nodes.find(n => n.id === step.variables.current?.slice(0, 1)) : undefined)
      || nodes.find(n => n.status === 'in_path')
      || nodes[0];

    const currentQueue = step.queueState || [];
    const currentStack = step.stackState || [];

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        {/* Specialized BFS Queue Conveyor Belt Ribbon - Warm Biscuit Style */}
        {isBfs && (
          <div className="w-full bg-[#FAF5EC] border border-[#E8DAC7] rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">🚚</span>
              <div>
                <div className="text-xs font-mono font-bold text-[#5C3617] flex items-center gap-1.5">
                  <span>BFS QUEUE CONVEYOR BELT</span>
                  <span className="text-[10px] bg-[#FBEFE3] text-[#8C4A19] px-2 py-0.2 rounded-full font-extrabold uppercase border border-[#E8DAC7]">
                    FIFO (First-In, First-Out)
                  </span>
                </div>
                <div className="text-[11px] text-[#8C7460] font-medium">
                  {currentQueue.length > 0 ? `Front: Dequeues next • Size: ${currentQueue.length}` : 'Queue currently empty (Frontier drained)'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-[10px] font-mono font-extrabold text-amber-800 bg-amber-100 px-2 py-1 rounded-lg border border-amber-300 flex items-center gap-1">
                <span>FRONT ⬅</span>
              </span>

              {currentQueue.length === 0 ? (
                <div className="text-xs font-mono text-[#9C826B] italic px-3 py-1 bg-white rounded-lg border border-dashed border-[#DFCDB8]">
                  Empty
                </div>
              ) : (
                currentQueue.map((item, idx) => {
                  const nodeObj = nodes.find(n => n.id === item || n.label.startsWith(item));
                  const dist = nodeObj?.distance !== undefined && nodeObj.distance !== '∞' ? nodeObj.distance : idx;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 bg-white border-2 border-[#D4A373] px-2.5 py-1 rounded-xl shadow-xs font-mono animate-pulse"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#EB6100] text-white flex items-center justify-center text-xs font-black">
                        {item}
                      </div>
                      <span className="text-[10px] font-bold text-[#8C4A19]">dist:{dist}</span>
                    </div>
                  );
                })
              )}

              <span className="text-[10px] font-mono font-extrabold text-[#7A451E] bg-[#F5ECE0] px-2 py-1 rounded-lg border border-[#DFCDB8] flex items-center gap-1">
                <span>⬅ REAR</span>
              </span>
            </div>
          </div>
        )}

        {/* Specialized DFS Call Stack & Backtracking Trail Ribbon */}
        {isDfs && (
          <div className="w-full bg-purple-50/80 border border-purple-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧗</span>
              <div>
                <div className="text-xs font-mono font-bold text-purple-950 flex items-center gap-1.5">
                  <span>DFS RECURSION CALL STACK</span>
                  <span className="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.2 rounded-full font-extrabold uppercase">
                    LIFO (Deepest First)
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {isBacktracking
                    ? '↩ RETRACTING: No unvisited branches remain, backtracking to caller'
                    : `Active Stack Depth: ${currentStack.length}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {currentStack.map((frame, idx) => {
                const isTop = idx === currentStack.length - 1;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold transition-all ${
                      isTop
                        ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-105 ring-2 ring-purple-300'
                        : 'bg-white text-purple-900 border-purple-200'
                    }`}
                  >
                    <span>{frame}</span>
                    <span className="text-[9px] opacity-75">d:{idx}</span>
                    {isTop && <span className="text-[10px] ml-0.5">👈 TOP</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Backtracking Notice Bar if Backtracking in DFS */}
        {isDfs && isBacktracking && (
          <div className="w-full bg-rose-50 border border-rose-300 rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-mono text-rose-900 animate-pulse">
            <Undo2 className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-bold">Backtracking Retrace:</span>
            <span>Explorer is retreating back up the call stack to explore remaining untraversed branches.</span>
          </div>
        )}

        {/* Main Graph Exploration Stage - Kids Attractive Warm Biscuit Canvas */}
        <div className="w-full h-[440px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-4 relative overflow-hidden">
          {/* Status Indicators & Legend */}
          <div className="absolute top-3 left-4 flex flex-wrap items-center gap-2 z-10 text-[11px] font-mono">
            <span className="flex items-center gap-1 bg-[#FFFDFB] border border-[#DFCDB8] px-2 py-0.5 rounded-md shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A373]" />
              <span className="text-[#5C3617] font-semibold">Unvisited</span>
            </span>
            <span className="flex items-center gap-1 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-md shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-900 font-bold">Visiting</span>
            </span>
            <span className="flex items-center gap-1 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-md shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-900 font-bold">Visited</span>
            </span>
            <span className="flex items-center gap-1 bg-purple-50 border border-purple-300 px-2 py-0.5 rounded-md shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span className="text-purple-900 font-bold">In Path / Tree</span>
            </span>
          </div>

          {/* SVG Canvas for Edges */}
          <svg className="w-full h-full absolute inset-0 pointer-events-none">
            {edges.map((e, idx) => {
              const fromNode = nodes.find(n => n.id === e.from);
              const toNode = nodes.find(n => n.id === e.to);
              if (!fromNode || !toNode) return null;

              const isMst = e.isInMst;
              const isHigh = e.isHighlighted;
              const isDisc = e.isDiscarded;

              const stroke = isMst ? '#9333ea' : isHigh ? (isBacktracking ? '#f43f5e' : '#f59e0b') : isDisc ? '#f43f5e' : '#cbd5e1';
              const strokeWidth = isMst || isHigh ? 4 : isDisc ? 2 : 2.5;

              const midX = (fromNode.x + toNode.x) / 2;
              const midY = (fromNode.y + toNode.y) / 2;

              return (
                <g key={idx}>
                  <line
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isBacktracking && isHigh ? '6 4' : isDisc ? '4 4' : undefined}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  {e.weight !== undefined && (
                    <g transform={`translate(${midX * 8}, ${midY * 3.6})`}>
                      <rect
                        x="-12"
                        y="-10"
                        width="24"
                        height="20"
                        rx="6"
                        fill="#ffffff"
                        stroke={stroke}
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                        fill={isMst ? '#7e22ce' : '#334155'}
                      >
                        {e.weight}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Graph Cartoon Nodes - Kids Friendly Biscuit Circles */}
          {nodes.map(node => {
            const isVisiting = node.status === 'visiting';
            const isVisited = node.status === 'visited';
            const isInPath = node.status === 'in_path';

            let fill = 'bg-[#FFFDFB] border-[#D4A373] text-[#4A240A]';
            if (isVisiting) fill = 'bg-amber-100 border-amber-500 text-amber-950 scale-115 ring-4 ring-amber-300/60 shadow-lg';
            else if (isInPath) fill = 'bg-purple-100 border-purple-500 text-purple-950 scale-110 ring-4 ring-purple-300/60 shadow-md';
            else if (isVisited) fill = 'bg-emerald-50 border-emerald-500 text-emerald-950';

            return (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center select-none group transition-all duration-300 z-10"
              >
                {/* Cartoon Styled Circle Node */}
                <div
                  className={`w-14 h-14 rounded-full border-3 flex flex-col items-center justify-center font-mono font-black text-sm shadow-sm transition-all duration-300 relative ${fill}`}
                >
                  {/* Cartoon Facial Expressions */}
                  <div className="flex items-center gap-1.5 -mt-0.5 mb-0.5">
                    {/* Left Eye */}
                    <div
                      className={`rounded-full transition-all duration-150 ${
                        isVisiting
                          ? 'w-2 h-2.5 bg-amber-950 animate-bounce'
                          : isVisited || isInPath
                          ? 'w-1.5 h-1.5 bg-emerald-800'
                          : 'w-1.5 h-1.5 bg-slate-700'
                      }`}
                    />
                    {/* Right Eye */}
                    <div
                      className={`rounded-full transition-all duration-150 ${
                        isVisiting
                          ? 'w-2 h-2.5 bg-amber-950 animate-bounce'
                          : isVisited || isInPath
                          ? 'w-1.5 h-1.5 bg-emerald-800'
                          : 'w-1.5 h-1.5 bg-slate-700'
                      }`}
                    />
                  </div>

                  {/* Blush Cheeks when Visiting or Visited */}
                  {(isVisiting || isVisited) && (
                    <div className="absolute inset-x-2.5 top-6 flex justify-between pointer-events-none">
                      <div className="w-1.5 h-1 rounded-full bg-rose-300/80" />
                      <div className="w-1.5 h-1 rounded-full bg-rose-300/80" />
                    </div>
                  )}

                  {/* Node Label Text */}
                  <span className="tracking-tight text-xs">{node.label}</span>

                  {/* Visiting Mascot Aura Pulse */}
                  {isVisiting && (
                    <div className="w-18 h-18 rounded-full border-2 border-amber-400/60 absolute -inset-2 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Distance Badge for BFS / Dijkstra */}
                {node.distance !== undefined && (
                  <span className="mt-1 text-[10px] font-mono font-bold px-1.5 py-0.2 bg-[#FFFDFB] border border-[#DFCDB8] text-[#5C3617] rounded-md shadow-2xs">
                    dist: {node.distance}
                  </span>
                )}
              </div>
            );
          })}

          {/* DYNAMIC EXPLORER CHARACTER MASCOT */}
          {activeNode && (
            <div
              style={{
                left: `${activeNode.x}%`,
                top: `${Math.max(10, activeNode.y - 12)}%`,
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none z-30"
            >
              {/* Explorer Speech Bubble */}
              <div className="bg-slate-900 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg shadow-md mb-1 border border-slate-700 flex items-center gap-1 animate-bounce whitespace-nowrap">
                <span>{isBacktracking ? '↩ Retracing' : isBfs ? '🔭 Queueing' : '🧭 Exploring'}</span>
                <span className="text-amber-300">{activeNode.label}</span>
              </div>

              {/* Explorer Character Sprite */}
              <div className="flex flex-col items-center">
                {/* Safari / Adventurer Hat */}
                <div className="w-8 h-3 bg-amber-600 rounded-t-full border border-amber-800 shadow-xs relative flex justify-center items-center">
                  <div className="w-10 h-1 bg-amber-700 -bottom-0.5 rounded-full absolute" />
                  <div className="w-2 h-1 bg-amber-300 rounded-xs" />
                </div>

                {/* Explorer Head */}
                <div className="w-7 h-6 bg-amber-100 border-2 border-amber-700 rounded-xl flex flex-col items-center justify-center p-0.5 shadow-xs relative">
                  {/* Visor / Goggles */}
                  <div className="w-5 h-2.5 bg-sky-300 border border-sky-600 rounded-md flex items-center justify-around px-0.5">
                    <div className="w-1 h-1 rounded-full bg-slate-900" />
                    <div className="w-1 h-1 rounded-full bg-slate-900" />
                  </div>
                  {/* Smile */}
                  <div className="w-2.5 h-0.5 bg-amber-900 rounded-full mt-0.5" />
                </div>

                {/* Explorer Torso & Backpack */}
                <div className="w-6 h-5 bg-emerald-600 border border-emerald-800 rounded-b-lg flex items-center justify-between px-1 relative">
                  {/* Backpack */}
                  <div className="w-2 h-3.5 bg-amber-800 rounded-xs absolute -left-1.5 top-0.5 border border-amber-900" />
                  {/* Compass / Lantern */}
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-300 border border-amber-600 flex items-center justify-center shadow-xs">
                    <span className="text-[7px]">🧭</span>
                  </div>
                </div>

                {/* Footsteps / Shadow */}
                <div className="flex gap-1.5 -mt-0.5">
                  <div className="w-2 h-1 bg-amber-900 rounded-full" />
                  <div className="w-2 h-1 bg-amber-900 rounded-full" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. DYNAMIC PROGRAMMING SCENE (0/1 Knapsack & LCS)
  // =========================================================================
  if (step.dpTable) {
    const dp = step.dpTable;
    const isKnapsack = algorithmId === 'knapsack_dp';

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-5 flex flex-col gap-4">
          {/* Cartoon Adventurer Backpack Banner for Knapsack */}
          {isKnapsack && (
            <div className="w-full bg-[#FFFDFB] border border-[#E8DAC7] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-inner">
                  🎒
                </div>
                <div>
                  <div className="text-xs font-bold text-[#5C3617] flex items-center gap-2">
                    <span>Adventurer's Knapsack</span>
                    <span className="text-[10px] font-mono font-extrabold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
                      Max Weight: 5 kg
                    </span>
                  </div>
                  <div className="text-[11px] text-[#7A6451] mt-0.5">
                    Optimal Value Formula: <code className="font-mono text-[#EB6100] font-bold">{dp.formulaExplanation}</code>
                  </div>
                </div>
              </div>

              {/* Treasure items icons */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold shadow-2xs">
                  🪙 Gold (2kg, $3)
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold shadow-2xs">
                  💎 Emerald (3kg, $4)
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 font-bold shadow-2xs">
                  👑 Crown (4kg, $5)
                </span>
              </div>
            </div>
          )}

          {/* Live Animated DP Matrix */}
          <div className="w-full overflow-x-auto border-2 border-[#E8DAC7] rounded-2xl bg-[#FFFDFB] p-3 shadow-sm">
            <table className="w-full border-collapse font-mono text-xs">
              <thead>
                <tr>
                  <th className="p-2 border border-[#EADFCF] bg-[#FAF5EB] text-[#7A6451] text-left font-bold">
                    Items \ Weight
                  </th>
                  {dp.colHeaders.map((col, idx) => (
                    <th key={idx} className="p-2 border border-[#EADFCF] bg-[#FAF5EB] text-[#5C3617] font-extrabold text-center">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dp.matrix.map((row, rIdx) => {
                  const isCurrentRow = dp.activeRow === rIdx;
                  return (
                    <tr key={rIdx} className={isCurrentRow ? 'bg-amber-50/50' : undefined}>
                      <td className="p-2 border border-[#EADFCF] bg-[#FAF5EB]/60 font-bold text-[#5C3617] text-left">
                        {dp.rowHeaders[rIdx]}
                      </td>
                      {row.map((val, cIdx) => {
                        const isCurrentCell = dp.activeRow === rIdx && dp.activeCol === cIdx;
                        return (
                          <td
                            key={cIdx}
                            className={`p-2.5 border border-[#EADFCF] text-center font-extrabold transition-all duration-200 ${
                              isCurrentCell
                                ? 'bg-amber-400 text-slate-950 scale-110 shadow-md ring-4 ring-amber-300/50 rounded-lg'
                                : 'text-[#2E2319]'
                            }`}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. BACKTRACKING SCENE (N-Queens & Rat in a Maze)
  // =========================================================================
  if (step.queensPlacement || algorithmId === 'n_queens' || algorithmId === 'rat_in_maze') {
    const queens = step.queensPlacement || [1, 3, 0, 2];
    const n = queens.length || 4;

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col items-center justify-center">
          <div className="border-4 border-[#D4A373] rounded-2xl overflow-hidden shadow-md grid grid-cols-4 gap-0.5 bg-[#DECBB5]">
            {Array.from({ length: n }).map((_, row) =>
              Array.from({ length: n }).map((__, col) => {
                const hasQueen = queens[row] === col;
                const isEven = (row + col) % 2 === 0;
                return (
                  <div
                    key={`${row}-${col}`}
                    className={`w-16 h-16 flex items-center justify-center text-3xl select-none transition-all duration-300 ${
                      isEven ? 'bg-[#FFFDFB]' : 'bg-[#F5ECE0]'
                    } ${hasQueen ? 'bg-amber-100 ring-2 ring-amber-400' : ''}`}
                  >
                    {hasQueen ? (
                      <span className="animate-bounce drop-shadow-md">
                        👑
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#9C826B]">
                        {row},{col}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <div className="text-xs font-mono text-[#7A6451] mt-4 font-bold">
            Chessboard Constraint: No 2 Queens threaten same Row, Column, or Diagonal
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. SEARCHING SCENE (Binary Search & Linear Search)
  // =========================================================================
  if (algorithmId === 'binary_search' || algorithmId === 'linear_search') {
    const isBinary = algorithmId === 'binary_search';
    const low = step.searchRange ? step.searchRange[0] : 0;
    const high = step.searchRange ? step.searchRange[1] : array.length - 1;
    const mid = pivotIndex !== undefined ? pivotIndex : -1;

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-end items-center relative overflow-hidden">
          {/* Detective Magnifier Spotlight Banner */}
          <div className="w-full flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 bg-[#FFFDFB] border border-[#DECBB5] px-3 py-1.5 rounded-xl shadow-xs">
              <Search className="w-4 h-4 text-[#EB6100] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#5C3617]">
                Detective Target: <span className="text-[#EB6100] font-black">55</span>
              </span>
            </div>

            {isBinary && (
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold">
                <span className="bg-[#FBEFE3] text-[#8C4A19] px-2.5 py-0.5 rounded-md border border-[#E8DAC7]">
                  🚩 LOW: {low}
                </span>
                <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-md border border-amber-300">
                  🎯 MID: {mid >= 0 ? mid : 'N/A'}
                </span>
                <span className="bg-[#FBEFE3] text-[#8C4A19] px-2.5 py-0.5 rounded-md border border-[#E8DAC7]">
                  🚩 HIGH: {high}
                </span>
              </div>
            )}
          </div>

          {/* Character Row with Sleeping and Detective States */}
          <div className="w-full flex items-end justify-center gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-4 pt-6 px-4">
            {array.map((val, idx) => {
              const isFound = targetIndex === idx;
              const isMid = mid === idx;
              const isOut = isBinary && (idx < low || idx > high);

              let charState: 'idle' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'target' | 'sleeping' = 'idle';
              let subLabel: string | undefined = undefined;

              if (isFound) {
                charState = 'target';
                subLabel = 'FOUND! 🎉';
              } else if (isMid) {
                charState = 'pivot';
                subLabel = '🎯 MID';
              } else if (isOut) {
                charState = 'sleeping';
                subLabel = 'ELIMINATED';
              } else if (idx === low && idx === high) {
                subLabel = 'LOW & HIGH';
              } else if (idx === low) {
                subLabel = '🚩 LOW';
              } else if (idx === high) {
                subLabel = '🚩 HIGH';
              }

              const range = Math.max(1, maxVal - minVal);
              const heightPercent = Math.round(((val - minVal) / range) * 85);

              return (
                <CartoonCharacter
                  key={`${idx}-${val}`}
                  id={`char-${idx}`}
                  value={val}
                  index={idx}
                  state={charState}
                  heightPercent={heightPercent}
                  subLabel={subLabel}
                  reducedMotion={reducedMotion}
                />
              );
            })}
          </div>

          {/* Stage Plank */}
          <div className="w-full border-t-4 border-[#DECBB5] flex justify-between items-center pt-2 px-6 text-[11px] font-mono text-[#7A6451]">
            <div>Logarithmic Interval Reduction: Halves array size every step</div>
            <div className="font-bold text-[#5C3617]">Array Size: {array.length}</div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 7. GREEDY ACTIVITY SCHEDULING CARTOON SCENE (Kids Attractive Warm Beige)
  // =========================================================================
  if (step.activityIntervals || algorithmId === 'activity_selection') {
    const activities = step.activityIntervals || [
      { id: 'A1', name: 'Lab 1', start: 1, finish: 3, isSelected: true },
      { id: 'A2', name: 'Seminar', start: 2, finish: 5, isRejected: true },
      { id: 'A3', name: 'Review', start: 0, finish: 6, isRejected: true },
      { id: 'A4', name: 'Design', start: 4, finish: 7, isSelected: true },
      { id: 'A5', name: 'Testing', start: 6, finish: 9, isSelected: false },
      { id: 'A6', name: 'Demo', start: 8, finish: 10, isSelected: true }
    ];

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-3 px-2">
            <span className="text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
              🟢 Scheduled Non-overlapping Activities
            </span>
            <span className="text-[#8C7460]">
              Timeline: 0 to 11 Hours
            </span>
          </div>

          <div className="space-y-2.5 w-full">
            {activities.map((act, idx) => {
              const leftPercent = (act.start / 11) * 100;
              const widthPercent = Math.max(14, ((act.finish - act.start) / 11) * 100);

              let barClass = 'bg-[#F5ECE0] border-[#DECBB5] text-[#5C3617]';
              let badge = 'PENDING';
              if (act.isSelected) {
                barClass = 'bg-emerald-500 border-emerald-600 text-white shadow-md ring-4 ring-emerald-300/40 font-black';
                badge = 'SELECTED 🏆';
              } else if (act.isRejected) {
                barClass = 'bg-rose-100 border-rose-300 text-rose-800 line-through opacity-60';
                badge = 'CLASH ✕';
              } else if (act.isExamined) {
                barClass = 'bg-amber-400 border-amber-500 text-amber-950 font-black ring-4 ring-amber-300/60 animate-pulse';
                badge = 'INSPECTING';
              }

              return (
                <div key={act.id || idx} className="w-full bg-[#FAF5EB]/90 rounded-xl p-1 border border-[#E8DAC7] relative h-11 flex items-center">
                  <div
                    style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                    className={`absolute h-8 rounded-lg border-2 px-2.5 flex items-center justify-between transition-all duration-300 text-xs font-mono font-bold ${barClass}`}
                  >
                    <span className="truncate">{act.name}</span>
                    <span className="text-[10px] uppercase ml-1 opacity-90">{badge}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full border-t-2 border-dashed border-[#DECBB5] pt-2 flex justify-between text-[11px] font-mono text-[#7A6451]">
            <span>T=0h</span>
            <span>T=3h</span>
            <span>T=6h</span>
            <span>T=9h</span>
            <span>T=11h</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 8. STRING MATCHING (KMP & Rabin-Karp) CARTOON SCENE (Warm Caramel & Biscuit)
  // =========================================================================
  if (step.stringPatternState || algorithmId === 'kmp_string_match' || algorithmId === 'rabin_karp') {
    const sp = step.stringPatternState || {
      text: 'ABABDABACDABABCABAB',
      pattern: 'ABABCABAB',
      textIndex: 0,
      patternIndex: 0,
      isMatch: false
    };

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-center items-center gap-6 overflow-x-auto">
          {/* Main Text Tape */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono font-bold text-[#8C7460] mb-1.5">
              SEARCH TEXT TAPE (Length {sp.text.length})
            </span>
            <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-[#FFFDFB] border-2 border-[#DECBB5] shadow-xs">
              {sp.text.split('').map((char, idx) => {
                const isUnderCursor = idx === sp.textIndex;
                return (
                  <div
                    key={idx}
                    className={`w-10 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-black text-sm border-2 transition-all duration-200 ${
                      isUnderCursor
                        ? 'bg-amber-400 border-amber-500 text-slate-950 scale-110 shadow-md ring-4 ring-amber-300/50'
                        : 'bg-[#FAF5EB] border-[#E8DAC7] text-[#5C3617]'
                    }`}
                  >
                    <span>{char}</span>
                    <span className="text-[8px] opacity-60 font-semibold">{idx}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pattern Slider Tape - Warm Toasted Caramel Tape */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono font-bold text-[#EB6100] mb-1.5">
              SLIDING PATTERN TAPE (Length {sp.pattern.length})
            </span>
            <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-[#C48247] border-2 border-[#A86E38] text-white shadow-md">
              {sp.pattern.split('').map((char, idx) => {
                const isCurrentPatternChar = idx === sp.patternIndex;
                const isMatched = sp.isMatch && isCurrentPatternChar;
                return (
                  <div
                    key={idx}
                    className={`w-10 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-black text-sm border-2 transition-all duration-200 ${
                      isMatched
                        ? 'bg-emerald-400 border-emerald-300 text-slate-950 scale-110 shadow-md ring-4 ring-emerald-300/50'
                        : isCurrentPatternChar
                        ? 'bg-amber-300 border-amber-200 text-amber-950 scale-105 shadow-xs'
                        : 'bg-[#A86E38] border-[#8C5A2B] text-white'
                    }`}
                  >
                    <span>{char}</span>
                    <span className="text-[8px] opacity-80 font-semibold">p[{idx}]</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LPS Array Display for KMP */}
          {sp.lpsTable && sp.lpsTable.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-mono bg-[#FFFDFB] px-4 py-2 rounded-xl border border-[#DECBB5] shadow-2xs">
              <span className="font-bold text-[#EB6100]">π-Table (LPS):</span>
              <span className="text-[#5C3617]">[{sp.lpsTable.join(', ')}]</span>
              <span className="text-[10px] text-[#8C7460] ml-2">(Longest Prefix Suffix fallback bounds)</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 9. MATRIX / GRID FLOOD FILL & SPIRAL CARTOON SCENE (Warm Beige & Lagoon)
  // =========================================================================
  if (step.matrixGridState || algorithmId === 'flood_fill_islands' || algorithmId === 'spiral_matrix') {
    const mg = step.matrixGridState || {
      grid: [
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 1],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0]
      ],
      islandCount: 2
    };

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-4 text-xs font-mono font-bold">
            <span className="flex items-center gap-1.5 bg-[#FAF5EB] text-[#5C3617] px-3 py-1 rounded-full border border-[#DECBB5]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A373]" />
              <span>Water (0)</span>
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Unvisited Land (1)</span>
            </span>
            <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Flooded / Explored (2)</span>
            </span>
          </div>

          <div className="border-4 border-[#D4A373] rounded-2xl overflow-hidden shadow-md bg-[#FFFDFB] p-2">
            <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${mg.grid[0]?.length || 4}, minmax(0, 1fr))` }}>
              {mg.grid.map((row, rIdx) =>
                row.map((cell, cIdx) => {
                  const isActive = mg.activeCell && mg.activeCell[0] === rIdx && mg.activeCell[1] === cIdx;
                  const isWater = cell === 0;
                  const isLand = cell === 1;
                  const isFlooded = cell === 2;

                  let cellStyle = 'bg-[#FAF5EB] border-[#E8DAC7] text-[#7A6451]';
                  if (isLand) cellStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-black';
                  if (isFlooded) cellStyle = 'bg-amber-100 border-amber-400 text-amber-950 font-black';
                  if (isActive) cellStyle = 'bg-amber-400 border-amber-500 text-slate-950 scale-105 shadow-md ring-4 ring-amber-300/60 font-black';

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center font-mono text-xs transition-all duration-200 select-none ${cellStyle}`}
                    >
                      {isActive ? (
                        <span className="text-xl animate-bounce">🤖</span>
                      ) : isWater ? (
                        <span className="opacity-40">🌊</span>
                      ) : (
                        <span>{cell}</span>
                      )}
                      <span className="text-[8px] opacity-60">[{rIdx},{cIdx}]</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="text-xs font-mono text-[#7A6451] font-bold">
            {mg.islandCount !== undefined ? `Connected Islands Counted: ${mg.islandCount}` : 'Matrix Navigation Active'}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 10. MINIMAX & GAME TREE CARTOON SCENE (Warm Beige & Purple)
  // =========================================================================
  if (step.minimaxTreeState || algorithmId === 'minimax_alphabeta' || algorithmId === 'game_of_nim') {
    const nodes = step.minimaxTreeState?.nodes || [
      { id: 'root', label: 'Root (MAX)', depth: 0, isMax: true, value: 6, isCurrent: true },
      { id: 'left_min', label: 'Left (MIN)', depth: 1, isMax: false, value: 3 },
      { id: 'right_min', label: 'Right (MIN)', depth: 1, isMax: false, value: 6 }
    ];

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-mono font-bold mb-2">
            <span className="bg-[#FAF5EB] text-[#5C3617] px-3 py-1 rounded-full border border-[#DECBB5] flex items-center gap-1 shadow-2xs">
              👑 MAX Player (Maximize Profit)
            </span>
            <span className="bg-purple-50 text-purple-800 px-3 py-1 rounded-full border border-purple-200 flex items-center gap-1 shadow-2xs">
              🛡️ MIN Player (Minimize Opponent)
            </span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 my-auto">
            {nodes.map(n => {
              const isCur = n.isCurrent;
              return (
                <div
                  key={n.id}
                  className={`w-32 h-24 rounded-2xl border-2 p-3 flex flex-col items-center justify-between font-mono transition-all duration-300 shadow-xs ${
                    n.isMax
                      ? 'bg-[#FAF5EB] border-[#D4A373] text-[#4A240A]'
                      : 'bg-purple-50 border-purple-400 text-purple-950'
                  } ${isCur ? 'ring-4 ring-amber-400 scale-108 shadow-md' : ''}`}
                >
                  <div className="text-[10px] font-extrabold uppercase flex items-center gap-1">
                    <span>{n.isMax ? '👑 MAX' : '🛡️ MIN'}</span>
                    {isCur && <span className="text-amber-600 animate-pulse">👈 ACTIVE</span>}
                  </div>
                  <div className="text-lg font-black">{n.value !== undefined ? n.value : '?'}</div>
                  <div className="text-[9px] opacity-70 font-semibold">{n.label}</div>
                </div>
              );
            })}
          </div>

          <div className="text-xs font-mono text-[#7A6451] font-semibold">
            Alpha-Beta Pruning Cutoff Rule: If α &ge; β, prune remaining branches!
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 11. EUCLIDEAN GCD & NUMBER THEORY CARTOON SCENE (Warm Biscuit Math)
  // =========================================================================
  if (step.mathEquationState || algorithmId === 'euclidean_gcd' || algorithmId === 'sieve_eratosthenes') {
    const eq = step.mathEquationState || { a: 48, b: 18, quotient: 2, remainder: 12, equation: '48 = 2 × 18 + 12' };

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col items-center justify-center gap-6">
          <div className="text-xs font-mono font-bold text-[#8C4A19] bg-[#FAF5EB] px-4 py-1.5 rounded-full border border-[#E8DAC7] shadow-2xs">
            Euclidean Invariant: gcd(a, b) = gcd(b, a % b)
          </div>

          {/* Division Chamber Boxes */}
          <div className="flex items-center gap-4 text-center font-mono">
            <div className="w-24 h-24 rounded-2xl bg-white border-2 border-[#D4A373] p-3 flex flex-col items-center justify-center shadow-xs">
              <span className="text-[10px] text-[#8C7460] font-bold uppercase">Dividend (a)</span>
              <span className="text-2xl font-black text-[#5C3617] mt-1">{eq.a}</span>
            </div>

            <div className="text-2xl font-black text-[#A89482]">=</div>

            <div className="w-24 h-24 rounded-2xl bg-white border-2 border-amber-300 p-3 flex flex-col items-center justify-center shadow-xs">
              <span className="text-[10px] text-[#8C7460] font-bold uppercase">Divisor (b)</span>
              <span className="text-2xl font-black text-amber-900 mt-1">{eq.b}</span>
            </div>

            <div className="text-2xl font-black text-[#A89482]">× {eq.quotient} +</div>

            <div className="w-24 h-24 rounded-2xl bg-white border-2 border-rose-300 p-3 flex flex-col items-center justify-center shadow-xs">
              <span className="text-[10px] text-[#8C7460] font-bold uppercase">Remainder (r)</span>
              <span className="text-2xl font-black text-rose-900 mt-1">{eq.remainder}</span>
            </div>
          </div>

          {/* Equation Banner */}
          <div className="px-6 py-2.5 bg-[#FFFDFB] border-2 border-[#DFCDB8] rounded-2xl font-mono text-sm font-extrabold text-[#4A240A] shadow-xs">
            {eq.equation}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 12. SORTING & GENERAL ALGORITHMS CARTOON SCENE (Bubble, Selection, Insertion, Merge, Quick, Heap, QuickSelect)
  // =========================================================================
  const isBubble = algorithmId === 'bubble_sort';
  const isQuick = algorithmId === 'quick_sort' || algorithmId === 'quick_select';
  const isSelection = algorithmId === 'selection_sort';
  const isInsertion = algorithmId === 'insertion_sort';
  const isMerge = algorithmId === 'merge_sort';
  const isHeap = algorithmId === 'heap_sort';

  // Extract sorting-specific variables
  const minIdxVal = step.variables.minIdx !== undefined ? Number(step.variables.minIdx) : undefined;
  const currentKey = step.variables.key !== undefined ? step.variables.key : undefined;
  const pivotVal = step.variables.pivot !== undefined ? step.variables.pivot : undefined;
  const quickI = step.variables.i !== undefined ? Number(step.variables.i) : undefined;
  const quickJ = step.variables.j !== undefined ? Number(step.variables.j) : undefined;
  const mergeLeft = step.variables.left !== undefined ? Number(step.variables.left) : undefined;
  const mergeMid = step.variables.mid !== undefined ? Number(step.variables.mid) : undefined;
  const mergeRight = step.variables.right !== undefined ? Number(step.variables.right) : undefined;
  const heapSize = step.variables.heap_size !== undefined ? Number(step.variables.heap_size) : (step.variables.new_heap_size !== undefined ? Number(step.variables.new_heap_size) : array.length);

  // Detective scanner position for Selection Sort
  const detectiveIndex = activeIndices.length > 0 ? activeIndices[0] : (step.variables.j !== undefined ? Number(step.variables.j) : undefined);

  return (
    <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
      <SpeechBubble
        currentStep={step}
        description={step.description}
        variables={step.variables}
        algorithmName={algorithmName}
        stepIndex={step.stepIndex}
        totalSteps={step.totalSteps}
      />

      {/* Main Cartoon Stage Canvas - Expansive Warm Biscuit Stage */}
      <div className="w-full min-h-[440px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between items-center relative overflow-hidden">
        {/* Stage Curtains / Ambient Warm Lighting */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#F2E7D5]/60 to-transparent pointer-events-none" />

        {/* ------------------------------------------------------------- */}
        {/* 1. SELECTION SORT: Top Seeker & Trophy Bar                     */}
        {/* ------------------------------------------------------------- */}
        {isSelection && (
          <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-amber-50/90 border border-amber-200 rounded-2xl p-3 z-10 shadow-xs mb-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🔍</span>
              <div>
                <div className="text-xs font-mono font-bold text-amber-950 flex items-center gap-2">
                  <span>SELECTION SORT: MINIMUM SEEKER</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.2 rounded-full font-black">
                    O(n²) Comparisons Guaranteed
                  </span>
                </div>
                <div className="text-[11px] text-amber-800">
                  Scans unsorted suffix to isolate smallest remaining value.
                </div>
              </div>
            </div>

            {minIdxVal !== undefined && minIdxVal >= 0 && minIdxVal < array.length && (
              <div className="flex items-center gap-2 bg-white border-2 border-amber-300 px-3 py-1.5 rounded-xl shadow-xs font-mono">
                <span className="text-base">🏆</span>
                <span className="text-[11px] font-bold text-[#8C7460]">Current Min:</span>
                <span className="text-xs font-black text-amber-950 bg-amber-100 px-2 py-0.5 rounded-md">
                  arr[{minIdxVal}] = {array[minIdxVal]}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 2. INSERTION SORT: Mechanical Key Hoist Platform               */}
        {/* ------------------------------------------------------------- */}
        {isInsertion && (
          <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-[#FAF5EB] border border-[#EADFCF] rounded-2xl p-3 z-10 shadow-xs mb-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🏗️</span>
              <div>
                <div className="text-xs font-mono font-bold text-[#5C3617] flex items-center gap-2">
                  <span>INSERTION SORT: KEY HOIST & SLIDE</span>
                  <span className="text-[10px] bg-[#FBEFE3] text-[#8C4A19] px-2 py-0.2 rounded-full font-black border border-[#E8DAC7]">
                    Online &amp; Adaptive
                  </span>
                </div>
                <div className="text-[11px] text-[#7A5A3E]">
                  {step.variables.shift
                    ? `Shifting larger cards right: ${step.variables.shift}`
                    : `Sorted prefix grows from left to right as keys settle.`}
                </div>
              </div>
            </div>

            {currentKey !== undefined && (
              <div className="flex items-center gap-2 bg-[#FFFDFB] border-2 border-[#D4A373] px-3 py-1.5 rounded-xl shadow-xs font-mono animate-bounce">
                <span className="text-[10px] font-extrabold uppercase text-[#EB6100]">HOISTED KEY:</span>
                <span className="text-sm font-black text-[#5C3617] bg-[#FEF3C7] px-2.5 py-0.5 rounded-md border border-[#FDE68A]">
                  {currentKey}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. MERGE SORT: Divide & Conquer Multi-Deck Banner              */}
        {/* ------------------------------------------------------------- */}
        {isMerge && (
          <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-[#FAF5EB] border border-[#EADFCF] rounded-2xl p-3 z-10 shadow-xs mb-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">⚔️</span>
              <div>
                <div className="text-xs font-mono font-bold text-[#5C3617] flex items-center gap-2">
                  <span>MERGE SORT: DIVIDE &amp; CONQUER ARENA</span>
                  <span className="text-[10px] bg-[#FBEFE3] text-[#8C4A19] px-2 py-0.2 rounded-full font-black border border-[#E8DAC7]">
                    Θ(n log n) Guaranteed
                  </span>
                </div>
                <div className="text-[11px] text-[#7A5A3E]">
                  {mergeLeft !== undefined && mergeRight !== undefined
                    ? `Subarrays: Left [${mergeLeft}..${mergeMid}] vs Right [${(mergeMid ?? 0) + 1}..${mergeRight}]`
                    : 'Recursively splitting and stably zipping sorted sublists.'}
                </div>
              </div>
            </div>

            {step.variables['left[i]'] && step.variables['right[j]'] && (
              <div className="flex items-center gap-2 bg-[#FFFDFB] border-2 border-[#DECBB5] px-3 py-1.5 rounded-xl shadow-xs font-mono">
                <span className="text-xs font-black text-[#EB6100]">{step.variables['left[i]']}</span>
                <span className="text-xs font-bold text-[#8C7460]">vs</span>
                <span className="text-xs font-black text-purple-700">{step.variables['right[j]']}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-sm ml-1">
                  Stably picking smaller
                </span>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 4. QUICK SORT: Captain Pivot & Lomuto Partition Deck           */}
        {/* ------------------------------------------------------------- */}
        {isQuick && (
          <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-purple-50/90 border border-purple-200 rounded-2xl p-3 z-10 shadow-xs mb-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">👑</span>
              <div>
                <div className="text-xs font-mono font-bold text-purple-950 flex items-center gap-2">
                  <span>QUICK SORT: CAPTAIN PIVOT &amp; LOMUTO PARTITION</span>
                  <span className="text-[10px] bg-purple-200 text-purple-900 px-2 py-0.2 rounded-full font-black">
                    In-Place Partition
                  </span>
                </div>
                <div className="text-[11px] text-purple-800">
                  Invariant: Elements left of boundary &lt; Pivot, elements right &ge; Pivot.
                </div>
              </div>
            </div>

            {pivotVal !== undefined && (
              <div className="flex items-center gap-2 bg-white border-2 border-purple-400 px-3 py-1.5 rounded-xl shadow-xs font-mono">
                <span className="text-[10px] font-bold text-purple-700 uppercase">CAPTAIN PIVOT:</span>
                <span className="text-xs font-black text-purple-950 bg-purple-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <span>👑</span>
                  <span>{pivotVal}</span>
                </span>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 5. HEAP SORT: Max-Heap Binary Tree Cartoon Hierarchy           */}
        {/* ------------------------------------------------------------- */}
        {isHeap && (
          <div className="w-full flex flex-col items-center justify-center gap-2 bg-amber-50/70 border border-amber-200 rounded-2xl p-3 z-10 shadow-xs mb-2">
            <div className="w-full flex items-center justify-between text-xs font-mono font-bold text-amber-950 px-2">
              <div className="flex items-center gap-2">
                <span className="text-base">👑</span>
                <span>MAX-HEAP COMPLETE BINARY TREE PYRAMID</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-extrabold">
                  Heap Size: {heapSize} / {array.length}
                </span>
                <span className="text-slate-500 font-normal">
                  Invariant: Parent &ge; Children (arr[i] &ge; arr[2i+1], arr[2i+2])
                </span>
              </div>
            </div>

            {/* Cartoon Binary Tree Representation (Top 7 Nodes) */}
            <div className="w-full max-w-md py-2 flex flex-col items-center justify-center relative select-none">
              {/* Level 0: Root King */}
              <div className="flex items-center justify-center relative z-10">
                <div
                  className={`w-12 h-10 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-black text-xs shadow-xs transition-all ${
                    sortedIndices.includes(0)
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                      : 'bg-amber-100 border-amber-400 text-amber-950 ring-2 ring-amber-300'
                  }`}
                >
                  <span className="text-[9px] -mt-0.5">👑 arr[0]</span>
                  <span className="text-sm font-black">{array[0]}</span>
                </div>
              </div>

              {/* Connecting Tree SVG Branches */}
              <svg className="w-full h-10 overflow-visible pointer-events-none -my-1">
                {/* Branches to Level 1 */}
                <line x1="50%" y1="0" x2="30%" y2="100%" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="50%" y1="0" x2="70%" y2="100%" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
              </svg>

              {/* Level 1: Left and Right Children */}
              <div className="w-full flex items-center justify-around px-8 relative z-10">
                {array.length > 1 && (
                  <div
                    className={`w-11 h-9 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-xs shadow-xs ${
                      sortedIndices.includes(1) || 1 >= heapSize
                        ? 'bg-[#F5ECE0] border-[#DFCDB8] text-[#9C826B]'
                        : activeIndices.includes(1) || swappedIndices.includes(1)
                        ? 'bg-amber-200 border-amber-500 text-amber-950 ring-2 ring-amber-400'
                        : 'bg-white border-[#D4A373] text-[#5C3617]'
                    }`}
                  >
                    <span className="text-[8px] opacity-70">arr[1]</span>
                    <span className="font-extrabold">{array[1]}</span>
                  </div>
                )}

                {array.length > 2 && (
                  <div
                    className={`w-11 h-9 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-xs shadow-xs ${
                      sortedIndices.includes(2) || 2 >= heapSize
                        ? 'bg-[#F5ECE0] border-[#DFCDB8] text-[#9C826B]'
                        : activeIndices.includes(2) || swappedIndices.includes(2)
                        ? 'bg-amber-200 border-amber-500 text-amber-950 ring-2 ring-amber-400'
                        : 'bg-white border-[#D4A373] text-[#5C3617]'
                    }`}
                  >
                    <span className="text-[8px] opacity-70">arr[2]</span>
                    <span className="font-extrabold">{array[2]}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MAIN CARTOON CHARACTER STAGE ROW - Wide Fluid Layout          */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full flex items-end justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 pt-6 px-4 my-auto relative">
          {/* Detective Spotlight for Selection Sort */}
          {isSelection && detectiveIndex !== undefined && detectiveIndex >= 0 && detectiveIndex < array.length && (
            <div
              style={{
                left: `${((detectiveIndex + 0.5) / array.length) * 100}%`
              }}
              className="absolute -top-10 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-300 z-20"
            >
              <div className="bg-[#4A240A] text-white text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 animate-bounce">
                <span>🕵️ Seeker: arr[{detectiveIndex}]</span>
              </div>
              <div className="w-0.5 h-6 bg-amber-400/80 border-dashed" />
            </div>
          )}

          {array.map((val, idx) => {
            let charState: 'idle' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'target' | 'key' | 'min' = 'idle';
            let roleBadge: string | undefined = undefined;
            let subLabel: string | undefined = undefined;
            let crown = false;

            if (swappedIndices.includes(idx)) {
              charState = 'swapping';
            } else if (activeIndices.includes(idx)) {
              charState = 'comparing';
            } else if (sortedIndices.includes(idx)) {
              charState = 'sorted';
            } else if (pivotIndex === idx) {
              charState = 'pivot';
              crown = true;
              roleBadge = 'PIVOT';
              subLabel = 'CAPTAIN';
            } else if (targetIndex === idx) {
              charState = 'target';
            }

            // Selection sort min candidate logic
            if (isSelection) {
              if (minIdxVal === idx) {
                charState = 'min';
                roleBadge = 'MIN CANDIDATE';
                subLabel = 'SMALLEST SO FAR';
                crown = true;
              } else if (detectiveIndex === idx) {
                roleBadge = 'INSPECTING';
              }
            }

            // Insertion sort key item & shift indicators
            if (isInsertion) {
              if (currentKey !== undefined && Number(currentKey) === val && activeIndices.includes(idx)) {
                charState = 'key';
                roleBadge = 'KEY ITEM';
                subLabel = 'HOISTED';
              } else if (step.variables.shift && activeIndices.includes(idx)) {
                roleBadge = 'SHIFTING ⏩';
              }
            }

            // Merge sort subarray role labels
            if (isMerge) {
              if (mergeLeft !== undefined && mergeRight !== undefined && idx >= mergeLeft && idx <= mergeRight) {
                if (mergeMid !== undefined && idx <= mergeMid) {
                  subLabel = 'LEFT SUB';
                } else {
                  subLabel = 'RIGHT SUB';
                }
              }
            }

            // Quick Sort Lomuto role badges
            if (isQuick) {
              if (quickI !== undefined && idx === quickI) {
                subLabel = 'GUARD (i)';
              } else if (quickJ !== undefined && idx === quickJ) {
                subLabel = 'SCOUT (j)';
              }
            }

            // Heap Sort Root King
            if (isHeap && idx === 0 && !sortedIndices.includes(0)) {
              crown = true;
              subLabel = 'ROOT KING';
            }

            // Calculate scaled height percent
            const range = Math.max(1, maxVal - minVal);
            const heightPercent = Math.round(((val - minVal) / range) * 85);

            return (
              <div key={`${idx}-${val}`} className="flex flex-col items-center">
                <CartoonCharacter
                  id={`char-${idx}`}
                  value={val}
                  index={idx}
                  state={charState}
                  heightPercent={heightPercent}
                  roleBadge={roleBadge}
                  subLabel={subLabel}
                  crown={crown}
                  reducedMotion={reducedMotion}
                />
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* STAGE FLOOR PLANK & TERRITORY LEGEND - Warm Oak Plank Style   */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full border-t-4 border-[#DECBB5] flex flex-wrap justify-between items-center pt-2.5 px-6 text-[11px] font-mono text-[#7A6451] gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-200" />
              <span>Comparing</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-rose-200" />
              <span>Swapping</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
              <span>Sorted</span>
            </span>
            {isQuick && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 ring-2 ring-purple-200" />
                <span>Pivot Captain</span>
              </span>
            )}
            {isSelection && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 ring-2 ring-amber-300" />
                <span>Min Trophy</span>
              </span>
            )}
            {isInsertion && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EB6100] ring-2 ring-orange-200" />
                <span>Hoisted Key</span>
              </span>
            )}
          </div>

          <div className="font-bold text-[#5C3617]">
            Array Size: {array.length}
          </div>
        </div>
      </div>
    </div>
  );
};
