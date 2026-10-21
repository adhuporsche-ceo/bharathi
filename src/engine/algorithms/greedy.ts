// Greedy Algorithms Trace Generator
// Implements: Activity Selection, Fractional Knapsack, Huffman Coding
import { AlgorithmStep, ActivityInterval } from '../types';

export function generateActivitySelectionSteps(input?: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];

  // Activities with start and finish times
  // By greedy choice theorem: Sort by earliest finish time!
  const rawActivities: Array<{ id: string; name: string; start: number; finish: number }> = [
    { id: 'A1', name: 'Lab 1', start: 1, finish: 3 },
    { id: 'A2', name: 'Seminar', start: 2, finish: 5 },
    { id: 'A3', name: 'Code Review', start: 0, finish: 6 },
    { id: 'A4', name: 'Design Sprint', start: 4, finish: 7 },
    { id: 'A5', name: 'Algo Testing', start: 6, finish: 9 },
    { id: 'A6', name: 'Project Demo', start: 8, finish: 10 }
  ];

  // Already sorted by finish time
  const sorted = [...rawActivities].sort((a, b) => a.finish - b.finish);

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Activity Selection initialized. Objective: Maximize non-overlapping scheduled activities in 1 conference hall. Sorted by finish time.`,
    codeLine: 1,
    activityIntervals: sorted.map(a => ({ ...a, isSelected: false, isExamined: false, isRejected: false })),
    variables: {
      'Total Activities': `${sorted.length}`,
      'Greedy Rule': 'Sort by finish time, greedily pick first and all subsequent non-overlapping intervals',
      'Hall Capacity': '1 concurrent activity'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  const selected: string[] = [];
  let lastFinish = -1;

  for (let idx = 0; idx < sorted.length; idx++) {
    const act = sorted[idx];
    const isCompatible = act.start >= lastFinish;

    if (isCompatible) {
      selected.push(act.id);
      lastFinish = act.finish;

      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `Inspecting ${act.name} [start=${act.start}, finish=${act.finish}]. Compatible with previous finish (${lastFinish === act.finish ? 'Hall Free' : lastFinish})! SCHEDULED!`,
        codeLine: 4,
        activityIntervals: sorted.map(a => ({
          ...a,
          isSelected: selected.includes(a.id),
          isExamined: a.id === act.id,
          isRejected: !selected.includes(a.id) && sorted.indexOf(a) < idx
        })),
        variables: {
          'Inspecting': `${act.name} (${act.start} -> ${act.finish})`,
          'Status': 'ACCEPTED & SCHEDULED',
          'Current Finish Boundary': `${lastFinish}`,
          'Total Scheduled': `${selected.length}`
        },
        stats: { comparisons: idx + 1, swaps: 0, operations: idx * 2 + 1 }
      });
    } else {
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `Inspecting ${act.name} [start=${act.start}, finish=${act.finish}]. OVERLAPS with current busy hall until time ${lastFinish}. REJECTED.`,
        codeLine: 6,
        activityIntervals: sorted.map(a => ({
          ...a,
          isSelected: selected.includes(a.id),
          isExamined: a.id === act.id,
          isRejected: a.id === act.id || (!selected.includes(a.id) && sorted.indexOf(a) < idx)
        })),
        variables: {
          'Inspecting': `${act.name} (${act.start} -> ${act.finish})`,
          'Status': `CONFLICT with Hall Finish (${lastFinish})`,
          'Total Scheduled': `${selected.length}`
        },
        stats: { comparisons: idx + 1, swaps: 0, operations: idx * 2 + 2 }
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: steps.length + 1,
    description: `Optimal schedule complete! Maximum non-overlapping activities scheduled = ${selected.length} (${selected.join(', ')}). Solved in O(n log n) time.`,
    codeLine: 8,
    activityIntervals: sorted.map(a => ({
      ...a,
      isSelected: selected.includes(a.id),
      isRejected: !selected.includes(a.id)
    })),
    variables: {
      'Status': 'Optimal Schedule Reached',
      'Selected Activities': selected.join(', '),
      'Total Activities': `${selected.length} of ${sorted.length}`
    },
    stats: { comparisons: sorted.length, swaps: 0, operations: sorted.length * 2 }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateFractionalKnapsackSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const capacity = 50;
  const items = [
    { id: '1', name: 'Platinum Ore', weight: 10, value: 60, ratio: 6.0 },
    { id: '2', name: 'Gold Dust', weight: 20, value: 100, ratio: 5.0 },
    { id: '3', name: 'Silver Bars', weight: 30, value: 120, ratio: 4.0 }
  ];

  // Already sorted by value/weight ratio descending
  steps.push({
    stepIndex: 0,
    totalSteps: 5,
    description: `Fractional Knapsack initialized. Max Capacity W = ${capacity} kg. Items sorted by value density (value/weight).`,
    codeLine: 1,
    arrayState: items.map(i => i.ratio * 10),
    variables: {
      'Knapsack Capacity': `${capacity} kg`,
      'Items': '3 precious materials',
      'Greedy Strategy': 'Pick item with highest value/weight ratio first. Cut fractions if needed.'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  let curWeight = 0;
  let totalVal = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (curWeight + item.weight <= capacity) {
      curWeight += item.weight;
      totalVal += item.value;
      steps.push({
        stepIndex: i + 1,
        totalSteps: 5,
        description: `Take 100% of ${item.name} (wt=${item.weight}kg, val=$${item.value}, ratio=$${item.ratio}/kg). Knapsack weight: ${curWeight}/${capacity} kg. Total profit: $${totalVal}.`,
        codeLine: 3,
        arrayState: [curWeight, capacity],
        variables: {
          'Item Chosen': `${item.name} (100%)`,
          'Weight Added': `${item.weight} kg`,
          'Value Added': `$${item.value}`,
          'Total Profit': `$${totalVal}`,
          'Remaining Space': `${capacity - curWeight} kg`
        },
        stats: { comparisons: i + 1, swaps: 0, operations: (i + 1) * 2 }
      });
    } else {
      const remain = capacity - curWeight;
      const frac = remain / item.weight;
      const addedVal = item.value * frac;
      curWeight += remain;
      totalVal += addedVal;

      steps.push({
        stepIndex: i + 1,
        totalSteps: 5,
        description: `Knapsack has only ${remain} kg remaining space. Take fractional piece (${Math.round(frac * 100)}%) of ${item.name}. Added value: $${addedVal}. Knapsack is now FULL!`,
        codeLine: 5,
        arrayState: [capacity, capacity],
        variables: {
          'Item Chosen': `${item.name} (${Math.round(frac * 100)}% partial fraction)`,
          'Weight Added': `${remain} kg`,
          'Value Added': `$${addedVal}`,
          'Total Profit': `$${totalVal}`,
          'Status': 'Capacity Reached'
        },
        stats: { comparisons: i + 1, swaps: 0, operations: (i + 1) * 2 + 1 }
      });
      break;
    }
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: 5,
    description: `Optimal solution achieved! Total Maximum Value = $${totalVal} with 100% capacity utilization (${capacity} kg). Solved in O(n log n).`,
    codeLine: 7,
    arrayState: [50, 50],
    variables: {
      'Final Max Profit': `$${totalVal}`,
      'Total Weight': `${capacity} kg`,
      'Proof of Optimality': 'Greedy choice property holds for Fractional Knapsack, unlike 0/1 Knapsack.'
    },
    stats: { comparisons: 3, swaps: 0, operations: 6 }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}

export function generateHuffmanCodingSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const chars = [
    { char: 'A', freq: 45 },
    { char: 'B', freq: 13 },
    { char: 'C', freq: 12 },
    { char: 'D', freq: 16 },
    { char: 'E', freq: 9 },
    { char: 'F', freq: 5 }
  ];

  steps.push({
    stepIndex: 0,
    totalSteps: 5,
    description: 'Huffman Coding initialized. Objective: Lossless variable-length prefix code minimizing weighted path length. Characters sorted by frequencies.',
    codeLine: 1,
    arrayState: chars.map(c => c.freq),
    variables: {
      'Alphabet': 'A:45, B:13, C:12, D:16, E:9, F:5',
      'Prefix Property': 'No code word is a prefix of any other code word (unambiguous decoding).'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  steps.push({
    stepIndex: 1,
    totalSteps: 5,
    description: "Extract two minimum frequency nodes: 'F' (5) and 'E' (9). Merge into internal node (14). Left branch = 0, Right branch = 1.",
    codeLine: 3,
    arrayState: [14, 12, 13, 16, 45],
    variables: {
      'Extracted': 'F(5), E(9)',
      'Merged Node': '14',
      'Remaining Queue': 'C(12), B(13), (14), D(16), A(45)'
    },
    stats: { comparisons: 2, swaps: 0, operations: 3 }
  });

  steps.push({
    stepIndex: 2,
    totalSteps: 5,
    description: "Extract two minimums: 'C' (12) and 'B' (13). Merge into internal node (25).",
    codeLine: 4,
    arrayState: [14, 16, 25, 45],
    variables: {
      'Extracted': 'C(12), B(13)',
      'Merged Node': '25',
      'Remaining Queue': '(14), D(16), (25), A(45)'
    },
    stats: { comparisons: 4, swaps: 0, operations: 5 }
  });

  steps.push({
    stepIndex: 3,
    totalSteps: 5,
    description: 'Extract (14) and D(16). Merge into internal node (30). Root combines with (25) and A(45) to build complete optimal prefix tree.',
    codeLine: 5,
    arrayState: [25, 30, 45],
    variables: {
      'Extracted': '(14), D(16)',
      'Merged Node': '30',
      'Subtree Weights': '25, 30, 45'
    },
    stats: { comparisons: 6, swaps: 0, operations: 7 }
  });

  steps.push({
    stepIndex: 4,
    totalSteps: 5,
    description: 'Huffman Tree Complete! Codes generated: A="0", B="101", C="100", D="111", E="1101", F="1100". Most frequent character (A) gets shortest 1-bit code!',
    codeLine: 7,
    arrayState: [1, 3, 3, 3, 4, 4], // code lengths
    variables: {
      'A (freq 45)': '0 (1 bit)',
      'B (freq 13)': '101 (3 bits)',
      'C (freq 12)': '100 (3 bits)',
      'D (freq 16)': '111 (3 bits)',
      'E (freq 9)': '1101 (4 bits)',
      'F (freq 5)': '1100 (4 bits)'
    },
    stats: { comparisons: 8, swaps: 0, operations: 10 }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}
