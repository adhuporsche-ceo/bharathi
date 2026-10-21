// DAA Extensions & Randomized / Amortized Analysis Trace Generator
// Implements: QuickSelect (Hoare's Selection) and Dynamic Array Doubling Amortization
import { AlgorithmStep } from '../types';

export function generateQuickSelectSteps(input: number[] = [65, 35, 45, 90, 55, 75], k = 3): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...input];
  const targetK = Math.min(Math.max(1, k), arr.length) - 1; // 0-indexed rank

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `QuickSelect (Hoare's Selection) initialized. Finding ${targetK + 1}-th smallest element without fully sorting. Average time: O(n)!`,
    codeLine: 1,
    arrayState: [...arr],
    variables: {
      'Target Rank (k)': `${targetK + 1}-th smallest`,
      'Array Length': `${arr.length}`,
      'Advantage over Sort': 'O(n) average time vs O(n log n) sorting. Drops unneeded partition each step!'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  let low = 0;
  let high = arr.length - 1;
  let comparisons = 0;

  while (low <= high) {
    // Lomuto partition
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Partitioning range [${low}..${high}] with pivot arr[${high}] = ${pivot}. Seeking rank index ${targetK}.`,
      codeLine: 3,
      arrayState: [...arr],
      pivotIndex: high,
      activeIndices: [low, high],
      variables: {
        'Low': `${low}`,
        'High': `${high}`,
        'Pivot': `${pivot}`,
        'Target Index': `${targetK}`
      },
      stats: { comparisons, swaps: 0, operations: comparisons + 1 }
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      if (arr[j] <= pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    const pIdx = i + 1;

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Pivot ${pivot} placed at its exact final rank index ${pIdx}. Comparing pIdx (${pIdx}) with target rank index (${targetK}).`,
      codeLine: 5,
      arrayState: [...arr],
      sortedIndices: [pIdx],
      pivotIndex: pIdx,
      variables: {
        'Pivot Placed At': `${pIdx}`,
        'Target k Index': `${targetK}`,
        'Check': pIdx === targetK ? 'MATCH!' : pIdx > targetK ? 'Target is in LEFT half' : 'Target is in RIGHT half'
      },
      stats: { comparisons, swaps: 0, operations: comparisons + 2 }
    });

    if (pIdx === targetK) {
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `FOUND! The ${targetK + 1}-th smallest element is ${arr[pIdx]} (at index ${pIdx})! Unneeded partitions were never sorted.`,
        codeLine: 7,
        arrayState: [...arr],
        sortedIndices: [pIdx],
        targetIndex: pIdx,
        variables: {
          'Result': `${targetK + 1}-th smallest = ${arr[pIdx]}`,
          'Average Comparisons': `${comparisons}`,
          'Efficiency': 'Pruned half the array at each recursion level'
        },
        stats: { comparisons, swaps: 0, operations: comparisons + 3 }
      });
      break;
    } else if (pIdx > targetK) {
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `pIdx (${pIdx}) > target (${targetK}). Discard right partition [${pIdx}..${high}]. Recurse ONLY into left range [${low}..${pIdx - 1}].`,
        codeLine: 8,
        arrayState: [...arr],
        variables: {
          'Discarded': `Right side (${pIdx} to ${high})`,
          'New Range': `[${low}..${pIdx - 1}]`
        },
        stats: { comparisons, swaps: 0, operations: comparisons + 4 }
      });
      high = pIdx - 1;
    } else {
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `pIdx (${pIdx}) < target (${targetK}). Discard left partition [${low}..${pIdx}]. Recurse ONLY into right range [${pIdx + 1}..${high}].`,
        codeLine: 10,
        arrayState: [...arr],
        variables: {
          'Discarded': `Left side (${low} to ${pIdx})`,
          'New Range': `[${pIdx + 1}..${high}]`
        },
        stats: { comparisons, swaps: 0, operations: comparisons + 4 }
      });
      low = pIdx + 1;
    }
  }

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateDynamicArrayAmortizedSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const inserts = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  let capacity = 2;
  let size = 0;
  let totalCost = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: 'Dynamic Array (Vector) Amortized Analysis initialized. Initial Capacity = 2, Size = 0. Strategy: Double capacity whenever array becomes full.',
    codeLine: 1,
    arrayState: [0, 0],
    variables: {
      'Size': '0',
      'Capacity': `${capacity}`,
      'Accounting / Banker Method': 'Charge 3 credits per insertion: 1 for current insert, 2 stored as potential for future copy'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  for (let idx = 0; idx < inserts.length; idx++) {
    const val = inserts[idx];
    let isDoubled = false;

    if (size === capacity) {
      const oldCap = capacity;
      capacity *= 2;
      totalCost += size; // Cost of copying old elements
      isDoubled = true;

      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `Array FULL (size=${size}, capacity=${oldCap}). ALLOCATE new buffer with 2x capacity (${capacity}). Copy ${size} existing elements (Cost = ${size}).`,
        codeLine: 3,
        arrayState: Array.from({ length: capacity }, (_, i) => i < size ? inserts[i] : 0),
        variables: {
          'Event': 'CAPACITY DOUBLED 2x',
          'Old Capacity': `${oldCap}`,
          'New Capacity': `${capacity}`,
          'Copy Operations': `${size}`,
          'Total Accumulated Cost': `${totalCost}`
        },
        stats: { comparisons: idx, swaps: size, operations: totalCost }
      });
    }

    size++;
    totalCost += 1; // 1 write operation

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Push element '${val}' at index ${size - 1}. Current size: ${size}/${capacity}. Instant cost = 1.`,
      codeLine: 5,
      arrayState: Array.from({ length: capacity }, (_, i) => i < size ? inserts[i] : 0),
      activeIndices: [size - 1],
      variables: {
        'Element Appended': `${val}`,
        'Size': `${size}`,
        'Capacity': `${capacity}`,
        'Instant Cost': isDoubled ? `${size}` : '1 (O(1))',
        'Amortized Cost per Insert': 'O(1) constant average'
      },
      stats: { comparisons: idx + 1, swaps: 0, operations: totalCost }
    });
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: steps.length + 1,
    description: `Amortized Proof: Total cost for ${inserts.length} insertions = ${totalCost}. Average cost per insertion = ${Math.round((totalCost / inserts.length) * 10) / 10} = O(1)!`,
    codeLine: 8,
    arrayState: Array.from({ length: capacity }, (_, i) => i < size ? inserts[i] : 0),
    sortedIndices: Array.from({ length: size }, (_, i) => i),
    variables: {
      'Total Insertions (N)': `${inserts.length}`,
      'Total Work Done': `${totalCost}`,
      'Amortized Bound': 'O(1) verified via Aggregate & Potential functions Φ'
    },
    stats: { comparisons: inserts.length, swaps: 0, operations: totalCost }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}
