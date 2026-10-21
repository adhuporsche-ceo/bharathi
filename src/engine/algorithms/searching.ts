// Searching Algorithms: Linear Search and Binary Search
import { AlgorithmStep } from '../types';

export function generateLinearSearchSteps(input: number[], target = 55): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...input];
  const n = arr.length;
  let comparisons = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Linear Search initialized: Searching for target ${target} across ${n} elements. Time complexity: O(n). No sorting required.`,
    codeLine: 1,
    arrayState: [...arr],
    variables: { target: `${target}`, n: `${n}`, current_index: 'None' },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  let foundIndex = -1;
  for (let i = 0; i < n; i++) {
    comparisons++;
    const isMatch = arr[i] === target;

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Checking index ${i}: arr[${i}] = ${arr[i]}. ${isMatch ? `MATCH FOUND! arr[${i}] equals target ${target}.` : `${arr[i]} != ${target}. Move to index ${i + 1}.`}`,
      codeLine: 3,
      arrayState: [...arr],
      activeIndices: [i],
      targetIndex: isMatch ? i : undefined,
      variables: { i: `${i}`, 'arr[i]': `${arr[i]}`, target: `${target}`, comparisons: `${comparisons}` },
      comparisonsCount: comparisons,
      swapsCount: 0,
      stats: { comparisons, swaps: 0, operations: comparisons }
    });

    if (isMatch) {
      foundIndex = i;
      break;
    }
  }

  if (foundIndex !== -1) {
    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Search SUCCESS! Target ${target} located at index ${foundIndex} after ${comparisons} comparison${comparisons === 1 ? '' : 's'}.`,
      codeLine: 4,
      arrayState: [...arr],
      sortedIndices: [foundIndex],
      targetIndex: foundIndex,
      variables: { status: 'FOUND', index: `${foundIndex}`, comparisons: `${comparisons}` },
      comparisonsCount: comparisons,
      swapsCount: 0,
      stats: { comparisons, swaps: 0, operations: comparisons }
    });
  } else {
    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Search FAILED: Target ${target} is NOT present in the array. Performed all ${n} comparisons.`,
      codeLine: 6,
      arrayState: [...arr],
      variables: { status: 'NOT FOUND', comparisons: `${comparisons}` },
      comparisonsCount: comparisons,
      swapsCount: 0,
      stats: { comparisons, swaps: 0, operations: comparisons }
    });
  }

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateBinarySearchSteps(input: number[], target = 55): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  // Binary search requires sorted array: explicitly sort a copy and inform learner
  const isOriginallySorted = input.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
  const arr = [...input].sort((a, b) => a - b);
  const n = arr.length;
  let low = 0;
  let high = n - 1;
  let comparisons = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Binary Search: Target = ${target}. ${isOriginallySorted ? 'Input array is sorted.' : 'Input was unsorted: sorted a copy to satisfy monotonic order precondition.'} Range [0, ${high}].`,
    codeLine: 1,
    arrayState: [...arr],
    searchRange: [low, high],
    variables: { low: '0', high: `${high}`, target: `${target}`, sorted_precondition: 'Satisfied' },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  let found = false;
  let foundMid = -1;

  while (low <= high) {
    comparisons++;
    const mid = Math.floor(low + (high - low) / 2);
    const midVal = arr[mid];

    // Prediction quiz for mid computation
    const quiz = (comparisons === 1) ? {
      id: 'quiz_bs_mid',
      prompt: `With low=${low} and high=${high}, what is the mid index and value?`,
      options: [
        `mid = ${mid} (value ${midVal})`,
        `mid = ${low} (value ${arr[low]})`,
        `mid = ${high} (value ${arr[high]})`
      ],
      correctIndex: 0,
      explanation: `mid = low + floor((high - low) / 2) = ${low} + floor(${high - low} / 2) = ${mid}, which contains ${midVal}.`
    } : undefined;

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Compute midpoint mid = ${low} + floor((${high} - ${low}) / 2) = ${mid}. arr[${mid}] = ${midVal}. Compare with target ${target}.`,
      codeLine: 3,
      arrayState: [...arr],
      pivotIndex: mid,
      searchRange: [low, high],
      activeIndices: [mid],
      variables: { low: `${low}`, mid: `${mid}`, high: `${high}`, 'arr[mid]': `${midVal}`, target: `${target}` },
      comparisonsCount: comparisons,
      swapsCount: 0,
      stats: { comparisons, swaps: 0, operations: comparisons },
      quiz
    });

    if (midVal === target) {
      found = true;
      foundMid = mid;
      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `Target ${target} FOUND at index ${mid}! Halving the interval each step yields O(log n) efficiency.`,
        codeLine: 4,
        arrayState: [...arr],
        sortedIndices: [mid],
        pivotIndex: mid,
        targetIndex: mid,
        variables: { result: `FOUND at index ${mid}`, comparisons: `${comparisons}` },
        comparisonsCount: comparisons,
        swapsCount: 0,
        stats: { comparisons, swaps: 0, operations: comparisons }
      });
      break;
    } else if (midVal < target) {
      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `arr[${mid}] (${midVal}) < target (${target}). Target must lie in right half. Eliminate [${low}..${mid}]. New low = ${mid + 1}.`,
        codeLine: 6,
        arrayState: [...arr],
        pivotIndex: mid,
        searchRange: [mid + 1, high],
        variables: { new_low: `${mid + 1}`, high: `${high}`, eliminated: `[${low}..${mid}]` },
        comparisonsCount: comparisons,
        swapsCount: 0,
        stats: { comparisons, swaps: 0, operations: comparisons }
      });
      low = mid + 1;
    } else {
      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `arr[${mid}] (${midVal}) > target (${target}). Target must lie in left half. Eliminate [${mid}..${high}]. New high = ${mid - 1}.`,
        codeLine: 8,
        arrayState: [...arr],
        pivotIndex: mid,
        searchRange: [low, mid - 1],
        variables: { low: `${low}`, new_high: `${mid - 1}`, eliminated: `[${mid}..${high}]` },
        comparisonsCount: comparisons,
        swapsCount: 0,
        stats: { comparisons, swaps: 0, operations: comparisons }
      });
      high = mid - 1;
    }
  }

  if (!found) {
    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Termination: low (${low}) > high (${high}). Search interval is empty. Target ${target} does not exist in array.`,
      codeLine: 9,
      arrayState: [...arr],
      variables: { result: 'NOT FOUND', total_comparisons: `${comparisons}` },
      comparisonsCount: comparisons,
      swapsCount: 0,
      stats: { comparisons, swaps: 0, operations: comparisons }
    });
  }

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}
