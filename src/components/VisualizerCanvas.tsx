import React from 'react';
import { AlgorithmStep } from '../engine/types';

interface VisualizerCanvasProps {
  step: AlgorithmStep;
  algorithmId: string;
}

export const VisualizerCanvas: React.FC<VisualizerCanvasProps> = ({ step, algorithmId }) => {
  // 1. Stack Canvas (Purple, Golden Yellow & Leaf Green)
  if (step.stackState && (step.stackState.length > 0 || algorithmId === 'stack_ds')) {
    const stack = step.stackState || [];
    return (
      <div className="w-full h-80 rounded-2xl bg-white border-2 border-[#E5DCF9] p-6 flex flex-col items-center justify-end shadow-sm shadow-[#8C52FF]/5 relative overflow-hidden">
        <div className="text-xs font-mono text-[#201538] font-bold mb-3 flex items-center gap-2 z-10">
          <span className="bg-[#EDE8FE] text-[#7B42F6] px-3 py-1 rounded-full border border-[#D4C7F5] shadow-2xs">
            TOP POINTER &rarr; {stack.length > 0 ? `[${stack.length - 1}] ${stack[stack.length - 1]}` : 'Empty (top = -1)'}
          </span>
        </div>

        <div className="w-56 h-52 border-x-4 border-b-4 border-[#7B42F6] rounded-b-xl bg-[#F8F6FE] p-2.5 flex flex-col-reverse gap-2 items-center justify-start overflow-hidden shadow-inner">
          {stack.length === 0 ? (
            <div className="text-[#887D9F] text-xs text-center mt-16 font-mono font-medium">
              Stack is Empty<br />
              <span className="text-[11px] text-[#FFB800] font-bold">(Underflow Condition)</span>
            </div>
          ) : (
            stack.map((item, idx) => {
              const isTop = idx === stack.length - 1;
              return (
                <div
                  key={idx}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-mono font-bold flex justify-between items-center transition-all duration-200 ${
                    isTop
                      ? 'bg-[#FFB800] text-[#1E1435] shadow-md ring-2 ring-[#FFE082]'
                      : 'bg-[#7B42F6] text-white border border-[#6830E0] shadow-xs'
                  }`}
                >
                  <span className="text-[10px] opacity-80">#{idx}</span>
                  <span className="text-sm">{item}</span>
                  <span className="text-[10px] uppercase font-extrabold">{isTop ? 'TOP' : ''}</span>
                </div>
              );
            })
          )}
        </div>
        <div className="text-xs font-mono text-[#5B507A] mt-2 font-semibold">
          Stack Canister Base (LIFO Principle)
        </div>
      </div>
    );
  }

  // 2. Circular Queue Canvas
  if (step.isCircularQueue) {
    const queue = step.queueState || [];
    const capacity = step.circularQueueCapacity || 5;
    const front = step.circularQueueFront ?? -1;
    const rear = step.circularQueueRear ?? -1;

    return (
      <div className="w-full h-80 rounded-2xl bg-white border-2 border-[#E5DCF9] p-6 flex flex-col justify-center items-center shadow-sm shadow-[#8C52FF]/5 relative overflow-hidden">
        <div className="text-xs font-mono font-bold text-[#201538] mb-3 bg-[#EDE8FE] text-[#7B42F6] px-3 py-1 rounded-full border border-[#D4C7F5]">
          Circular Queue Ring Buffer &bull; Capacity = {capacity} &bull; Front = {front}, Rear = {rear}
        </div>

        <div className="flex items-center gap-3">
          {queue.map((val, idx) => {
            const isFront = idx === front;
            const isRear = idx === rear;
            const isOccupied = val !== '—';

            return (
              <div
                key={idx}
                className={`w-20 h-24 rounded-2xl border-2 flex flex-col items-center justify-between p-2 font-mono transition-all ${
                  isFront && isRear
                    ? 'bg-[#FFF7D6] border-[#FFB800] text-[#8C5300] ring-2 ring-[#FFE082]'
                    : isFront
                    ? 'bg-[#EDE8FE] border-[#7B42F6] text-[#6B32E8] ring-2 ring-[#D4C7F5]'
                    : isRear
                    ? 'bg-[#EBF7E3] border-[#689F38] text-[#33691E] ring-2 ring-[#C5E1A5]'
                    : isOccupied
                    ? 'bg-[#F8F6FE] border-[#D4C7F5] text-[#201538]'
                    : 'bg-white border-[#E5DCF9] text-[#887D9F] border-dashed'
                }`}
              >
                <span className="text-[10px] font-bold">Slot #{idx}</span>
                <span className="text-xs font-extrabold">{val}</span>
                <span className="text-[9px] font-bold">
                  {isFront && isRear ? 'FRONT/REAR' : isFront ? 'FRONT' : isRear ? 'REAR' : isOccupied ? 'ACTIVE' : 'FREE'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[#5B507A] mt-4">
          Wrap Formula: rear = (rear + 1) % {capacity} &bull; Reuses vacated front memory!
        </div>
      </div>
    );
  }

  // 3. Queue Canvas (Linear)
  if (step.queueState && (step.queueState.length > 0 || algorithmId === 'queue_ds')) {
    const queue = step.queueState || [];
    return (
      <div className="w-full h-80 rounded-2xl bg-white border-2 border-[#E5DCF9] p-6 flex flex-col justify-center items-center shadow-sm shadow-[#8C52FF]/5 relative overflow-hidden">
        <div className="w-full flex justify-between text-xs font-mono font-bold mb-3 px-6">
          <span className="text-[#7B42F6] flex items-center gap-1.5 bg-[#EDE8FE] px-3 py-1 rounded-full border border-[#D4C7F5]">
            &larr; FRONT (Dequeue / Service)
          </span>
          <span className="text-[#689F38] flex items-center gap-1.5 bg-[#EBF7E3] px-3 py-1 rounded-full border border-[#C5E1A5]">
            REAR (Enqueue / Arrive) &larr;
          </span>
        </div>

        <div className="w-full max-w-2xl h-28 border-2 border-[#7B42F6] rounded-2xl bg-[#F8F6FE] p-4 flex items-center gap-3 overflow-x-auto shadow-inner">
          {queue.length === 0 ? (
            <div className="w-full text-center text-[#887D9F] text-xs font-mono">
              Queue is Empty (Front = 0, Rear = -1)
            </div>
          ) : (
            queue.map((item, idx) => {
              const isFront = idx === 0;
              const isRear = idx === queue.length - 1;
              return (
                <div
                  key={idx}
                  className={`flex-1 min-w-[110px] h-16 rounded-xl p-2.5 flex flex-col items-center justify-center font-mono font-bold transition-all duration-200 ${
                    isFront
                      ? 'bg-[#FFB800] text-[#1E1435] shadow-md ring-2 ring-[#FFE082]'
                      : isRear
                      ? 'bg-[#689F38] text-white shadow-md ring-2 ring-[#C5E1A5]'
                      : 'bg-[#7B42F6] text-white border border-[#6830E0] shadow-xs'
                  }`}
                >
                  <span className="text-xs">{item}</span>
                  <span className="text-[10px] font-normal opacity-90 mt-0.5">
                    {isFront && isRear ? 'FRONT & REAR' : isFront ? 'FRONT (Next)' : isRear ? 'REAR (Last)' : `Index #${idx}`}
                  </span>
                </div>
              );
            })
          )}
        </div>
        <div className="text-xs text-[#5B507A] font-mono mt-4">
          FIFO: First In, First Out &bull; Order strictly preserved
        </div>
      </div>
    );
  }

  // 4. Graph Canvas (BFS, DFS, Dijkstra, Kruskal, Prim)
  if (step.graphNodes && step.graphNodes.length > 0) {
    const nodes = step.graphNodes;
    const edges = step.graphEdges || [];
    return (
      <div className="w-full h-80 rounded-2xl bg-white border-2 border-[#E5DCF9] p-4 relative overflow-hidden flex items-center justify-center shadow-sm shadow-[#8C52FF]/5">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {edges.map((e, idx) => {
            const fromNode = nodes.find(n => n.id === e.from);
            const toNode = nodes.find(n => n.id === e.to);
            if (!fromNode || !toNode) return null;

            const strokeColor = e.isInMst
              ? '#689F38'
              : e.isDiscarded
              ? '#E5DCF9'
              : e.isHighlighted
              ? '#FFB800'
              : '#D4C7F5';
            const strokeWidth = e.isInMst || e.isHighlighted ? '3.5' : '1.5';

            return (
              <g key={idx}>
                <line
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
                {e.weight !== undefined && (
                  <text
                    x={`${(fromNode.x + toNode.x) / 2}%`}
                    y={`${(fromNode.y + toNode.y) / 2 - 2}%`}
                    fill="#201538"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="select-none bg-white"
                  >
                    w={e.weight}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {nodes.map(n => {
          let nodeBg = 'bg-white text-[#201538] border-[#D4C7F5] shadow-md';
          if (n.status === 'visiting') nodeBg = 'bg-[#FFB800] text-[#1E1435] border-[#FFA000] ring-4 ring-[#FFE082]/60 shadow-lg scale-110';
          if (n.status === 'visited') nodeBg = 'bg-[#EBF7E3] text-[#33691E] border-[#689F38] ring-2 ring-[#C5E1A5]';
          if (n.status === 'in_path') nodeBg = 'bg-[#7B42F6] text-white border-[#6830E0] ring-4 ring-[#D4C7F5] shadow-lg';

          return (
            <div
              key={n.id}
              style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
              className={`absolute w-13 h-13 rounded-full border-2 flex flex-col items-center justify-center font-mono font-bold text-xs transition-all duration-300 cursor-default select-none ${nodeBg}`}
            >
              <span>{n.id}</span>
              {n.distance && <span className="text-[9px] font-normal opacity-90">d:{n.distance}</span>}
            </div>
          );
        })}

        {step.mstWeight !== undefined && (
          <div className="absolute top-3 right-4 bg-[#EDE8FE] border border-[#D4C7F5] text-[#7B42F6] font-mono text-xs font-bold px-3 py-1 rounded-full shadow-xs">
            MST Weight: {step.mstWeight}
          </div>
        )}
      </div>
    );
  }

  // 5. DP Matrix Canvas (Knapsack, LCS)
  if (step.dpTable) {
    const { rowHeaders, colHeaders, matrix, activeRow, activeCol, formulaExplanation } = step.dpTable;
    return (
      <div className="w-full h-80 rounded-2xl bg-white border-2 border-[#E5DCF9] p-4 flex flex-col shadow-sm shadow-[#8C52FF]/5">
        <div className="text-xs font-mono text-[#201538] font-semibold mb-3 bg-[#F4F0FF] p-2.5 rounded-xl border border-[#E5DCF9]">
          <strong>Recurrence:</strong> {formulaExplanation}
        </div>
        <div className="overflow-auto flex-1 border border-[#E5DCF9] rounded-xl">
          <table className="w-full text-center text-xs font-mono border-collapse">
            <thead className="bg-[#F8F6FE] sticky top-0">
              <tr className="border-b border-[#E5DCF9] text-[#5B507A]">
                <th className="p-2 text-left text-xs font-bold">i \ j</th>
                {colHeaders.map((col, idx) => (
                  <th key={idx} className="p-2 text-xs font-bold">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DCF9]">
              {matrix.map((row, rIdx) => {
                const isRowActive = activeRow === rIdx;
                return (
                  <tr key={rIdx} className={isRowActive ? 'bg-[#EDE8FE]/40' : ''}>
                    <td className={`p-2 text-left text-xs whitespace-nowrap ${isRowActive ? 'text-[#7B42F6] font-bold' : 'text-[#5B507A]'}`}>
                      {rowHeaders[rIdx] || `R${rIdx}`}
                    </td>
                    {row.map((val, cIdx) => {
                      const isCellActive = isRowActive && activeCol === cIdx;
                      let cellClass = 'bg-white text-[#201538] border-[#E5DCF9]';
                      if (isCellActive) cellClass = 'bg-[#FFB800] text-[#1E1435] font-bold ring-2 ring-[#FFE082] shadow-md';
                      else if (typeof val === 'number' && val > 0) cellClass = 'bg-[#EBF7E3] text-[#33691E] border-[#C5E1A5]';

                      return (
                        <td key={cIdx} className="p-1">
                          <div className={`py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 ${cellClass}`}>
                            {val}
                          </div>
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
    );
  }

  // 6. Backtracking Maze Grid (Rat in a Maze)
  if (step.mazeGrid) {
    const maze = step.mazeGrid;
    const path = step.mazePath || [];
    const current = step.mazeCurrent;

    return (
      <div className="w-full h-80 rounded-2xl bg-white border-2 border-[#E5DCF9] p-4 flex flex-col items-center justify-center shadow-sm shadow-[#8C52FF]/5">
        <div className="text-xs font-mono text-[#201538] font-bold mb-3">
          4×4 Grid Maze Traversal (1 = Open Path, 0 = Wall Barrier)
        </div>
        <div className="w-56 h-56 border-2 border-[#E5DCF9] rounded-xl overflow-hidden grid grid-cols-4 grid-rows-4 shadow-md">
          {maze.map((row, r) =>
            row.map((cell, c) => {
              const isWall = cell === 0;
              const isCurrent = current && current[0] === r && current[1] === c;
              const isInPath = path.some(p => p[0] === r && p[1] === c);

              return (
                <div
                  key={`${r}-${c}`}
                  className={`flex items-center justify-center font-mono font-bold text-sm border border-[#E5DCF9] transition-all ${
                    isWall
                      ? 'bg-[#1E1435] text-[#887D9F]'
                      : isCurrent
                      ? 'bg-[#FFB800] text-[#1E1435] shadow-inner'
                      : isInPath
                      ? 'bg-[#EBF7E3] text-[#33691E]'
                      : 'bg-white text-[#201538]'
                  }`}
                >
                  {isCurrent ? '🐭' : isWall ? '🧱' : (r === 0 && c === 0) ? 'START' : (r === 3 && c === 3) ? 'EXIT 🏁' : ''}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // 7. Backtracking N-Queens Canvas
  if (step.queensPlacement && (step.queensPlacement.length > 0 || algorithmId === 'n_queens')) {
    const queens = step.queensPlacement || [];
    const boardSize = 4;
    return (
      <div className="w-full h-80 rounded-2xl bg-white border-2 border-[#E5DCF9] p-4 flex flex-col items-center justify-center shadow-sm shadow-[#8C52FF]/5">
        <div className="text-xs font-mono text-[#201538] font-bold mb-3 flex items-center gap-2">
          <span>4×4 Chessboard Backtracking Configuration</span>
        </div>
        <div className="w-52 h-52 border-2 border-[#E5DCF9] rounded-xl overflow-hidden grid grid-cols-4 grid-rows-4 shadow-lg">
          {Array.from({ length: boardSize }).map((_, r) =>
            Array.from({ length: boardSize }).map((_, c) => {
              const isDark = (r + c) % 2 === 1;
              const hasQueen = queens[r] === c;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`flex items-center justify-center text-3xl transition-all duration-200 ${
                    hasQueen
                      ? 'bg-[#FFF7D6]'
                      : isDark
                      ? 'bg-[#F4F0FF]'
                      : 'bg-white'
                  }`}
                >
                  {hasQueen && (
                    <span className={queens.length === 4 ? 'text-[#689F38] drop-shadow' : 'text-[#FFB800] drop-shadow'}>
                      &#9819;
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
        <div className="text-xs font-mono text-[#5B507A] mt-2 font-medium">
          {queens.length === 4 ? '✓ Complete 4-Queens Solution Found!' : `Placed ${queens.length} of 4 Queens`}
        </div>
      </div>
    );
  }

  // 8. Activity Selection Timeline (Engineering Mode)
  if (step.activityIntervals) {
    const activities = step.activityIntervals;
    return (
      <div className="w-full h-80 rounded-2xl bg-white border-2 border-[#E5DCF9] p-6 flex flex-col justify-between shadow-sm shadow-[#8C52FF]/5 relative overflow-hidden">
        <div className="text-xs font-mono font-bold text-[#7B42F6] bg-[#EDE8FE] px-3 py-1 rounded-full border border-[#D4C7F5] self-start">
          Activity Intervals &bull; Earliest Finish Greedy Scheduling
        </div>
        <div className="space-y-2 w-full my-auto">
          {activities.map((act, idx) => {
            const leftPercent = (act.start / 11) * 100;
            const widthPercent = Math.max(12, ((act.finish - act.start) / 11) * 100);
            return (
              <div key={act.id || idx} className="w-full bg-[#F8F6FE] rounded-lg p-1 relative h-9 flex items-center border border-[#E5DCF9]">
                <div
                  style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                  className={`absolute h-7 rounded px-2 flex items-center justify-between text-[11px] font-mono font-bold border ${
                    act.isSelected
                      ? 'bg-[#689F38] text-white border-[#558B2F] shadow-xs'
                      : act.isRejected
                      ? 'bg-rose-100 text-rose-800 line-through border-rose-300 opacity-60'
                      : act.isExamined
                      ? 'bg-[#FFB800] text-[#1E1435] border-[#FFA000] ring-2 ring-[#FFE082]'
                      : 'bg-[#EDE8FE] text-[#7B42F6] border-[#D4C7F5]'
                  }`}
                >
                  <span className="truncate">{act.name}</span>
                  <span className="text-[9px] uppercase font-mono">{act.isSelected ? 'OK' : act.isRejected ? 'CLASH' : ''}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] font-mono text-[#887D9F] border-t border-[#E5DCF9] pt-1">
          <span>0h</span><span>2h</span><span>4h</span><span>6h</span><span>8h</span><span>10h</span>
        </div>
      </div>
    );
  }

  // 9. String Search (Engineering Mode)
  if (step.stringPatternState) {
    const sp = step.stringPatternState;
    return (
      <div className="w-full h-80 rounded-2xl bg-white border-2 border-[#E5DCF9] p-6 flex flex-col justify-center items-center gap-5 shadow-sm shadow-[#8C52FF]/5 overflow-x-auto">
        <div className="text-xs font-mono font-bold text-[#7B42F6] bg-[#EDE8FE] px-3 py-1 rounded-full border border-[#D4C7F5]">
          String Pattern Matching Engine &bull; i = {sp.textIndex}, j = {sp.patternIndex}
        </div>
        <div className="flex items-center gap-1 bg-[#F8F6FE] p-2.5 rounded-xl border border-[#E5DCF9]">
          {sp.text.split('').map((c, i) => (
            <div
              key={i}
              className={`w-8 h-10 rounded flex items-center justify-center font-mono font-bold text-xs border ${
                i === sp.textIndex
                  ? 'bg-[#FFB800] border-[#FFA000] text-[#1E1435] ring-2 ring-[#FFE082]'
                  : 'bg-white border-[#E5DCF9] text-[#201538]'
              }`}
            >
              {c}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-[#7B42F6] p-2.5 rounded-xl border border-[#6830E0] text-white">
          {sp.pattern.split('').map((c, i) => (
            <div
              key={i}
              className={`w-8 h-10 rounded flex items-center justify-center font-mono font-bold text-xs border ${
                i === sp.patternIndex
                  ? sp.isMatch
                    ? 'bg-[#689F38] border-[#558B2F] text-white ring-2 ring-[#C5E1A5]'
                    : 'bg-[#FFB800] border-[#FFA000] text-[#1E1435]'
                  : 'bg-[#6830E0] border-[#5625BC] text-white'
              }`}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 10. Default: Animated Bar Chart for Sorting & Searching
  const array = step.arrayState || [65, 35, 45, 90, 55, 75];
  const maxVal = Math.max(...array, 10);
  const activeIndices = step.activeIndices || [];
  const swappedIndices = step.swappedIndices || [];
  const sortedIndices = step.sortedIndices || [];
  const pivotIndex = step.pivotIndex;
  const targetIndex = step.targetIndex;

  return (
    <div className="w-full h-80 rounded-2xl bg-white border-2 border-[#E5DCF9] p-6 flex flex-col justify-end shadow-sm shadow-[#8C52FF]/5 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#EDE8FE]/40 to-transparent pointer-events-none" />

      <div className="w-full flex items-end justify-center gap-3 sm:gap-4 md:gap-5 h-56 px-4 pb-2">
        {array.map((val, idx) => {
          const heightPercent = Math.max(15, (val / maxVal) * 100);
          const isComparing = activeIndices.includes(idx);
          const isSwapping = swappedIndices.includes(idx);
          const isSorted = sortedIndices.includes(idx);
          const isPivot = pivotIndex === idx;
          const isTarget = targetIndex === idx;

          let barBg = 'bg-[#7B42F6] text-white border-[#6830E0] shadow-xs';
          let ringEffect = '';

          if (isTarget) {
            barBg = 'bg-[#689F38] text-white border-[#558B2F] shadow-lg';
            ringEffect = 'ring-4 ring-[#C5E1A5] animate-bounce';
          } else if (isSwapping) {
            barBg = 'bg-[#FFB800] text-[#1E1435] border-[#FFA000] shadow-lg';
            ringEffect = 'ring-4 ring-[#FFE082] scale-105';
          } else if (isComparing) {
            barBg = 'bg-[#FFC72C] text-[#1E1435] border-[#FFB800] shadow-md';
            ringEffect = 'ring-4 ring-[#FFE082]/60 scale-102';
          } else if (isPivot) {
            barBg = 'bg-[#1E1435] text-purple-200 border-[#7B42F6] shadow-md';
            ringEffect = 'ring-2 ring-[#D4C7F5]';
          } else if (isSorted) {
            barBg = 'bg-[#689F38] text-white border-[#558B2F]';
          }

          return (
            <div key={idx} className="flex-1 max-w-[56px] flex flex-col items-center justify-end h-full">
              <span className={`text-[11px] font-mono font-bold mb-1 transition-all ${isComparing || isSwapping ? 'text-[#7B42F6] font-extrabold text-xs' : 'text-[#5B507A]'}`}>
                {val}
              </span>
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t-xl border-t-2 border-x-2 transition-all duration-200 flex items-center justify-center ${barBg} ${ringEffect}`}
              >
                {isPivot && <span className="text-[10px] uppercase font-bold text-purple-200">PIV</span>}
              </div>
              <span className="text-[10px] font-mono font-semibold text-[#887D9F] mt-2">
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>

      <div className="w-full flex justify-between items-center text-xs font-mono text-[#5B507A] pt-3 border-t border-[#E5DCF9] mt-1">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FFB800]" /> Comparing</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#7B42F6]" /> Active</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#689F38]" /> Sorted</span>
        </div>
        <div>Total: {array.length} items</div>
      </div>
    </div>
  );
};
