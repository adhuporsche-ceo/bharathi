import React from 'react';
import { AlgorithmStep, GraphNodeState, GraphEdgeState } from '../../engine/types';
import { SpeechBubble } from './SpeechBubble';
import { Compass, Footprints, Layers, ArrowRight, CornerDownLeft } from 'lucide-react';

interface GraphCartoonStageProps {
  step: AlgorithmStep;
  algorithmId: string;
  algorithmName: string;
  reducedMotion?: boolean;
}

export const GraphCartoonStage: React.FC<GraphCartoonStageProps> = ({
  step,
  algorithmId,
  algorithmName,
  reducedMotion = false
}) => {
  const nodes: GraphNodeState[] = step.graphNodes || [];
  const edges: GraphEdgeState[] = step.graphEdges || [];
  const isBfs = algorithmId === 'graph_bfs';
  const isDfs = algorithmId === 'graph_dfs';

  // Identify currently active node
  const activeNode =
    nodes.find(n => n.status === 'visiting') ||
    nodes.find(n => n.id === step.variables.current?.replace(/[^A-Za-z0-9]/g, '')) ||
    nodes.find(n => n.status === 'visited') ||
    nodes[0];

  const isBacktracking =
    isDfs &&
    (step.variables.current?.toLowerCase().includes('backtrack') ||
      step.description.toLowerCase().includes('backtrack'));

  // Queue state for BFS
  const queueItems = step.queueState || [];

  // Stack state for DFS
  const stackItems = step.stackState || (activeNode ? [activeNode.id] : []);

  return (
    <div className="w-full bg-white border border-sky-100 rounded-3xl p-5 shadow-sm space-y-4">
      {/* Mentor Algo Speech Bubble */}
      <SpeechBubble
        currentStep={step}
        description={step.description}
        variables={step.variables}
        algorithmName={algorithmName}
        stepIndex={step.stepIndex}
        totalSteps={step.totalSteps}
      />

      {/* Main Interactive Graph Canvas */}
      <div className="w-full h-[400px] rounded-2xl bg-gradient-to-b from-sky-50/50 via-white to-sky-50/80 border border-sky-100 p-4 relative overflow-hidden select-none">
        {/* Top Header Legend */}
        <div className="absolute top-3 left-4 flex flex-wrap items-center gap-2 z-10 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 bg-white/95 border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-300 border border-sky-400" />
            <span className="text-slate-600 font-semibold">Unvisited</span>
          </span>
          <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-lg shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse ring-2 ring-amber-200" />
            <span className="text-amber-900 font-extrabold">Active / Visiting</span>
          </span>
          <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-lg shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-emerald-900 font-bold">Visited</span>
          </span>
          <span className="flex items-center gap-1.5 bg-purple-50 border border-purple-300 px-2.5 py-1 rounded-lg shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span className="text-purple-900 font-bold">Traversed Tree Path</span>
          </span>
        </div>

        {/* Algorithm Badge */}
        <div className="absolute top-3 right-4 z-10 flex items-center gap-2">
          {isBfs && (
            <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-mono font-bold px-3 py-1 rounded-full border border-sky-300 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-sky-600" />
              <span>BFS: Level-by-Level Wavefront</span>
            </span>
          )}
          {isDfs && (
            <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full border shadow-xs transition-colors ${
              isBacktracking
                ? 'bg-amber-100 text-amber-950 border-amber-400 animate-pulse ring-2 ring-amber-300'
                : 'bg-indigo-50 text-indigo-800 border-indigo-200'
            }`}>
              <Footprints className="w-3.5 h-3.5" />
              <span>{isBacktracking ? 'DFS: ↩ Retracing Footprints' : 'DFS: ⬇ Diving Deepest Branch'}</span>
            </span>
          )}
        </div>

        {/* SVG Canvas for Graph Edges & Trails */}
        <svg className="w-full h-full absolute inset-0 pointer-events-none">
          <defs>
            {/* Glowing filter for highlighted edges */}
            <filter id="edge-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Radial Torch Beam Gradient */}
            <radialGradient id="torch-beam" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Flashlight light cone centered at activeNode */}
          {activeNode && (
            <circle
              cx={`${activeNode.x}%`}
              cy={`${activeNode.y}%`}
              r="70"
              fill="url(#torch-beam)"
              className="transition-all duration-500 ease-out"
            />
          )}

          {edges.map((e, idx) => {
            const fromNode = nodes.find(n => n.id === e.from);
            const toNode = nodes.find(n => n.id === e.to);
            if (!fromNode || !toNode) return null;

            const isMst = e.isInMst;
            const isHigh = e.isHighlighted;
            const isDisc = e.isDiscarded;

            const stroke = isMst
              ? '#9333ea'
              : isHigh
              ? '#f59e0b'
              : isDisc
              ? '#f43f5e'
              : '#cbd5e1';

            const strokeWidth = isMst || isHigh ? 4 : isDisc ? 2 : 2.5;

            // Compute midpoint for edge weight badge
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;

            return (
              <g key={idx}>
                {/* Edge line */}
                <line
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  strokeDasharray={isDisc ? '4 4' : undefined}
                  strokeLinecap="round"
                  filter={isHigh ? 'url(#edge-glow)' : undefined}
                  className="transition-all duration-300"
                />

                {/* Animated footprints along edge if backtracking */}
                {isDfs && isBacktracking && isHigh && (
                  <g className="animate-pulse">
                    <circle cx={`${(fromNode.x * 2 + toNode.x) / 3}%`} cy={`${(fromNode.y * 2 + toNode.y) / 3}%`} r="3" fill="#f59e0b" />
                    <circle cx={`${(fromNode.x + toNode.x) / 2}%`} cy={`${(fromNode.y + toNode.y) / 2}%`} r="3.5" fill="#f59e0b" />
                    <circle cx={`${(fromNode.x + toNode.x * 2) / 3}%`} cy={`${(fromNode.y + toNode.y * 2) / 3}%`} r="3" fill="#f59e0b" />
                  </g>
                )}

                {/* Edge weight badge if specified */}
                {e.weight !== undefined && (
                  <g style={{ transform: `translate(${midX}%, ${midY}%)` }}>
                    <rect
                      x="-14"
                      y="-11"
                      width="28"
                      height="22"
                      rx="7"
                      fill="#ffffff"
                      stroke={stroke}
                      strokeWidth="1.5"
                      className="shadow-xs"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="monospace"
                      fill={isMst ? '#7e22ce' : isHigh ? '#b45309' : '#334155'}
                    >
                      {e.weight}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Cartoon Nodes with Expressive Faces */}
        {nodes.map(node => {
          const isVisiting = node.status === 'visiting' || (activeNode && activeNode.id === node.id);
          const isVisited = node.status === 'visited';
          const isInPath = node.status === 'in_path';

          // Color themes for nodes
          let bgStyle = 'bg-gradient-to-b from-white to-sky-50 border-sky-300 text-sky-950 shadow-xs';
          let eyeColor = '#334155';
          let cheekColor = '#fda4af';
          let mouthSvg = 'M 14 26 Q 20 30 26 26'; // friendly smile

          if (isVisiting) {
            bgStyle = 'bg-gradient-to-b from-amber-50 to-amber-100 border-amber-500 text-amber-950 scale-115 ring-4 ring-amber-300/60 shadow-lg';
            eyeColor = '#78350f';
            cheekColor = '#fb7185';
            mouthSvg = 'M 14 25 Q 20 32 26 25'; // joyful wide smile
          } else if (isInPath) {
            bgStyle = 'bg-gradient-to-b from-purple-50 to-purple-100 border-purple-500 text-purple-950 scale-110 ring-4 ring-purple-300/60 shadow-md';
            eyeColor = '#581c87';
            mouthSvg = 'M 14 26 Q 20 31 26 26';
          } else if (isVisited) {
            bgStyle = 'bg-gradient-to-b from-emerald-50 to-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200';
            eyeColor = '#065f46';
            mouthSvg = 'M 15 26 Q 20 29 25 26';
          }

          return (
            <div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center select-none group transition-all duration-300 z-10"
            >
              {/* Node Avatar Circle */}
              <div
                className={`w-15 h-15 rounded-full border-3 flex flex-col items-center justify-center font-mono font-black text-sm relative transition-all duration-300 ${bgStyle}`}
              >
                {/* SVG Cartoon Face (Eyes, Cheeks, Smile) */}
                <svg viewBox="0 0 40 40" className="w-10 h-10 -mt-1 pointer-events-none">
                  {/* Left Eye */}
                  <circle cx="13" cy="16" r="3" fill={eyeColor} />
                  <circle cx="12" cy="15" r="1" fill="#ffffff" />

                  {/* Right Eye */}
                  <circle cx="27" cy="16" r="3" fill={eyeColor} />
                  <circle cx="26" cy="15" r="1" fill="#ffffff" />

                  {/* Rosy Cheeks */}
                  <ellipse cx="9" cy="20" rx="2.5" ry="1.5" fill={cheekColor} opacity="0.65" />
                  <ellipse cx="31" cy="20" rx="2.5" ry="1.5" fill={cheekColor} opacity="0.65" />

                  {/* Cartoon Mouth */}
                  <path
                    d={mouthSvg}
                    fill="none"
                    stroke={eyeColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Node Label */}
                <span className="-mt-1.5 text-xs font-black tracking-tight">{node.label}</span>

                {/* Visited Checkmark Badge */}
                {isVisited && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                    ✓
                  </span>
                )}

                {/* In-Path Star Badge */}
                {isInPath && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-amber-300 text-[10px] font-black flex items-center justify-center shadow-xs">
                    ★
                  </span>
                )}
              </div>

              {/* Distance / Level Badge */}
              {node.distance !== undefined && (
                <span className="mt-1 text-[10px] font-mono font-bold px-2 py-0.5 bg-white/95 border border-sky-200 rounded-md shadow-2xs text-slate-700">
                  {node.distance === '∞' ? '∞ unreached' : `dist: ${node.distance}`}
                </span>
              )}
            </div>
          );
        })}

        {/* Animated Explorer Mascot ("Explorer Algo") */}
        {activeNode && (
          <div
            style={{
              left: `${activeNode.x}%`,
              top: `${activeNode.y}%`,
              transition: reducedMotion ? 'none' : 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            className="absolute -translate-x-1/2 -translate-y-full -mt-7 z-20 pointer-events-none flex flex-col items-center"
          >
            {/* Mascot Speech Callout */}
            <div className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold uppercase shadow-sm border mb-1 whitespace-nowrap animate-bounce ${
              isBacktracking
                ? 'bg-amber-100 text-amber-950 border-amber-300'
                : 'bg-sky-600 text-white border-sky-700'
            }`}>
              {isBacktracking ? '↩ Retracing Footprints' : `Scouting Node ${activeNode.label.split(' ')[0]}!`}
            </div>

            {/* Explorer Mascot Avatar (Safari Hat + Torch + Robot) */}
            <div className="relative">
              {/* Safari Explorer Hat */}
              <div className="absolute -top-3 inset-x-0 flex justify-center z-10">
                <div className="relative">
                  {/* Hat Crown */}
                  <div className="w-6 h-3 bg-amber-700 rounded-t-full mx-auto border border-amber-900" />
                  {/* Hat Brim */}
                  <div className="w-10 h-1.5 bg-amber-800 rounded-full -mt-0.5 border border-amber-950" />
                  {/* Green Hat Ribbon */}
                  <div className="absolute top-1.5 inset-x-1.5 h-1 bg-emerald-600 rounded-xs" />
                </div>
              </div>

              {/* Robot Face / Head */}
              <div className="w-10 h-10 rounded-2xl bg-white border-2 border-sky-400 flex flex-col items-center justify-center shadow-md relative mt-1">
                {/* Blinking Visor Eyes */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                  <div className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                </div>
                {/* Cheerful Robot Mouth */}
                <div className="w-3 h-1 bg-sky-600 rounded-full mt-1" />
              </div>

              {/* Glowing Explorer Torch / Lantern in hand */}
              <div className="absolute -right-2 top-4 w-4 h-5 bg-amber-500 rounded-sm border border-amber-700 shadow-sm flex items-center justify-center">
                <span className="text-[9px] animate-pulse">🔦</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Traversal Auxiliary Dock: BFS Queue vs DFS Call Stack */}
      {isBfs && (
        <div className="w-full bg-gradient-to-r from-sky-50/80 via-white to-sky-50/80 border border-sky-200 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold">
            <span className="flex items-center gap-1.5 text-sky-800">
              <Compass className="w-4 h-4 text-sky-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>BFS FIFO Frontier Queue Pipeline</span>
            </span>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md border border-rose-200">
                ← FRONT (Service Window)
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                REAR (Arrival Gate) ←
              </span>
            </div>
          </div>

          {/* Queue Chips Conveyor */}
          <div className="w-full h-20 border-2 border-sky-300 rounded-xl bg-white p-2 flex items-center gap-2.5 overflow-x-auto shadow-inner">
            {queueItems.length === 0 ? (
              <div className="w-full text-center text-slate-400 font-mono text-xs font-semibold">
                Queue is empty &bull; All reachable components explored!
              </div>
            ) : (
              queueItems.map((item, idx) => {
                const isFront = idx === 0;
                const isRear = idx === queueItems.length - 1;
                return (
                  <div
                    key={idx}
                    className={`min-w-[90px] h-14 rounded-xl border-2 px-3 flex flex-col items-center justify-center font-mono font-extrabold text-xs transition-all duration-300 ${
                      isFront
                        ? 'bg-amber-100 border-amber-400 text-amber-950 scale-105 shadow-md ring-4 ring-amber-300/40'
                        : isRear
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs'
                        : 'bg-sky-50 border-sky-300 text-sky-900'
                    }`}
                  >
                    <span className="text-sm font-black">{item}</span>
                    <span className="text-[9px] opacity-75 font-semibold">
                      {isFront ? 'FRONT (Next Out)' : isRear ? 'REAR (Last In)' : `Slot #${idx}`}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between">
            <span>Level Guarantee: Shortest path in unweighted graphs</span>
            <span className="font-bold text-sky-700">Queue Count: {queueItems.length}</span>
          </div>
        </div>
      )}

      {isDfs && (
        <div className="w-full bg-gradient-to-r from-indigo-50/80 via-white to-indigo-50/80 border border-indigo-200 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold">
            <span className="flex items-center gap-1.5 text-indigo-900">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>DFS Recursion Call Stack &amp; Breadcrumb Trail</span>
            </span>
            <div className="text-[11px] font-mono">
              <span className={`px-2.5 py-0.5 rounded-full border font-bold ${
                isBacktracking
                  ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                {isBacktracking ? '↩ Dead-end: Popping Stack Frame' : '⬇ Diving Deep: Pushing Frame'}
              </span>
            </div>
          </div>

          {/* Call Stack Frames Bar */}
          <div className="w-full h-20 border-2 border-indigo-300 rounded-xl bg-white p-2 flex items-center gap-2.5 overflow-x-auto shadow-inner">
            {stackItems.length === 0 ? (
              <div className="w-full text-center text-slate-400 font-mono text-xs font-semibold">
                Call stack empty &bull; Traversal completed!
              </div>
            ) : (
              stackItems.map((item, idx) => {
                const isTop = idx === stackItems.length - 1;
                return (
                  <div
                    key={idx}
                    className={`min-w-[90px] h-14 rounded-xl border-2 px-3 flex flex-col items-center justify-center font-mono font-extrabold text-xs transition-all duration-300 ${
                      isTop
                        ? isBacktracking
                          ? 'bg-rose-100 border-rose-400 text-rose-950 scale-105 shadow-md ring-4 ring-rose-300/40 animate-pulse'
                          : 'bg-indigo-600 border-indigo-700 text-white scale-105 shadow-md ring-4 ring-indigo-300/40'
                        : 'bg-indigo-50 border-indigo-200 text-indigo-950'
                    }`}
                  >
                    <span className="text-sm font-black">{item}</span>
                    <span className="text-[9px] opacity-80 font-semibold">
                      {isTop ? 'TOP (Active)' : `Depth #${idx}`}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Breadcrumb Path Banner */}
          <div className="flex items-center gap-2 text-[11px] font-mono bg-indigo-50/60 p-2 rounded-xl border border-indigo-100 text-slate-700">
            <Footprints className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="font-bold text-indigo-900">Breadcrumb Path:</span>
            <span className="truncate">
              {stackItems.join(' ➔ ') || 'All frames unwound'}
            </span>
            {isBacktracking && (
              <span className="ml-auto text-amber-800 font-bold shrink-0">
                (Retracing to parent)
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
