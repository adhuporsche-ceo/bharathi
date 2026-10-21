// Deterministic Sorting Algorithm Trace Generators
// Implements: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort
import { AlgorithmStep } from '../types';

export function generateBubbleSortSteps(input: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...input];
  const n = arr.length;
  const sortedIndices: number[] = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Initialize Bubble Sort on array of size ${n}. Invariant: After pass i, the last i elements are in their final sorted positions.`,
    codeLine: 1,
    arrayState: [...arr],
    activeIndices: [],
    sortedIndices: [],
    variables: { n: `${n}`, pass: '0', comparisons: '0', swaps: '0' },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  if (n <= 1) {
    steps.push({
      stepIndex: 1,
      totalSteps: 2,
      description: `Array of size ${n} is trivially sorted.`,
      codeLine: 8,
      arrayState: [...arr],
      sortedIndices: n === 1 ? [0] : [],
      variables: { status: 'Already Sorted' },
      comparisonsCount: 0,
      swapsCount: 0,
      stats: { comparisons: 0, swaps: 0, operations: 1 }
    });
    return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
  }

  for (let i = 0; i < n - 1; i++) {
    let passSwapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      const willSwap = arr[j] > arr[j + 1];

      // Add quiz at first comparison of pass 0
      const quiz = (i === 0 && j === 1) ? {
        id: `quiz_bubble_${j}`,
        prompt: `Will element ${arr[j]} swap with ${arr[j + 1]}?`,
        options: [
          willSwap ? 'Yes, because arr[j] > arr[j+1]' : 'No, because arr[j] <= arr[j+1]',
          willSwap ? 'No, order is already preserved' : 'Yes, order must invert'
        ],
        correctIndex: 0,
        explanation: willSwap
          ? `${arr[j]} > ${arr[j + 1]}, so an inversion exists. Elements must swap.`
          : `${arr[j]} <= ${arr[j + 1]}, so elements are already in relative order.`
      } : undefined;

      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `Compare arr[${j}] (${arr[j]}) with arr[${j + 1}] (${arr[j + 1]}). ${willSwap ? `${arr[j]} > ${arr[j + 1]}: Inversion found, will swap!` : `${arr[j]} <= ${arr[j + 1]}: In correct relative order.`}`,
        codeLine: 4,
        arrayState: [...arr],
        activeIndices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        variables: { i: `${i}`, j: `${j}`, 'arr[j]': `${arr[j]}`, 'arr[j+1]': `${arr[j + 1]}` },
        comparisonsCount: comparisons,
        swapsCount: swaps,
        stats: { comparisons, swaps, operations: comparisons + swaps },
        quiz
      });

      if (willSwap) {
        swaps++;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        passSwapped = true;

        steps.push({
          stepIndex: steps.length,
          totalSteps: 1,
          description: `Swapped arr[${j}] and arr[${j + 1}]. Larger element ${arr[j + 1]} bubbles rightward.`,
          codeLine: 5,
          arrayState: [...arr],
          swappedIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          variables: { i: `${i}`, j: `${j}`, swapped: 'true' },
          comparisonsCount: comparisons,
          swapsCount: swaps,
          stats: { comparisons, swaps, operations: comparisons + swaps }
        });
      }
    }

    const settledIndex = n - 1 - i;
    sortedIndices.unshift(settledIndex);

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Pass ${i + 1} complete. Element ${arr[settledIndex]} settled at index ${settledIndex}.`,
      codeLine: 7,
      arrayState: [...arr],
      sortedIndices: [...sortedIndices],
      variables: { pass: `${i + 1}`, settled_idx: `${settledIndex}`, settled_val: `${arr[settledIndex]}` },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });

    if (!passSwapped) {
      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `Early exit optimization: 0 swaps in pass ${i + 1}. Array is fully sorted! Best case O(n) achieved.`,
        codeLine: 8,
        arrayState: [...arr],
        sortedIndices: Array.from({ length: n }, (_, idx) => idx),
        variables: { early_exit: 'true', comparisons: `${comparisons}`, swaps: `${swaps}` },
        comparisonsCount: comparisons,
        swapsCount: swaps,
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
      break;
    }
  }

  const allIndices = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `Bubble Sort finished. Total comparisons: ${comparisons}, swaps: ${swaps}. Invariant holds.`,
    codeLine: 9,
    arrayState: [...arr],
    sortedIndices: allIndices,
    variables: { status: 'Sorted', total_comparisons: `${comparisons}`, total_swaps: `${swaps}` },
    comparisonsCount: comparisons,
    swapsCount: swaps,
    stats: { comparisons, swaps, operations: comparisons + swaps }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateSelectionSortSteps(input: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...input];
  const n = arr.length;
  const sortedIndices: number[] = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Selection Sort initialized on ${n} elements. Invariant: Subarray arr[0..i-1] contains the smallest i elements in sorted order.`,
    codeLine: 1,
    arrayState: [...arr],
    variables: { n: `${n}`, i: '0', minIdx: '0' },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Pass ${i + 1}: Set candidate minimum index = ${i} (value ${arr[i]}). Scanning unsorted suffix [${i + 1}..${n - 1}].`,
      codeLine: 2,
      arrayState: [...arr],
      pivotIndex: minIdx,
      sortedIndices: [...sortedIndices],
      variables: { i: `${i}`, minIdx: `${minIdx}`, 'arr[min]': `${arr[minIdx]}` },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      const isSmaller = arr[j] < arr[minIdx];

      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}). ${isSmaller ? `New minimum found: ${arr[j]} at index ${j}!` : `${arr[j]} >= current min ${arr[minIdx]}.`}`,
        codeLine: 4,
        arrayState: [...arr],
        activeIndices: [j, minIdx],
        pivotIndex: minIdx,
        sortedIndices: [...sortedIndices],
        variables: { j: `${j}`, 'arr[j]': `${arr[j]}`, current_min: `${arr[minIdx]}` },
        comparisonsCount: comparisons,
        swapsCount: swaps,
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });

      if (isSmaller) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `Swap arr[${i}] (${temp}) with minimum arr[${minIdx}] (${arr[i]}). Smallest unsorted element placed in slot ${i}.`,
        codeLine: 6,
        arrayState: [...arr],
        swappedIndices: [i, minIdx],
        sortedIndices: [...sortedIndices],
        variables: { swapped: `${temp} <-> ${arr[i]}`, i: `${i}`, minIdx: `${minIdx}` },
        comparisonsCount: comparisons,
        swapsCount: swaps,
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
    }

    sortedIndices.push(i);
  }

  if (n > 0) sortedIndices.push(n - 1);

  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `Selection Sort completed. Always performs exactly n(n-1)/2 = ${(n * (n - 1)) / 2} comparisons. Total swaps: ${swaps}.`,
    codeLine: 8,
    arrayState: [...arr],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    variables: { status: 'Sorted', total_comparisons: `${comparisons}`, total_swaps: `${swaps}` },
    comparisonsCount: comparisons,
    swapsCount: swaps,
    stats: { comparisons, swaps, operations: comparisons + swaps }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateInsertionSortSteps(input: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...input];
  const n = arr.length;
  const sortedIndices: number[] = [0];
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Insertion Sort initialized. Subarray arr[0..0] ([${arr[0]}]) is trivially sorted.`,
    codeLine: 1,
    arrayState: [...arr],
    sortedIndices: [...sortedIndices],
    variables: { sorted_prefix: `[${arr[0]}]` },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Pick key = arr[${i}] (${key}) to insert into sorted prefix arr[0..${i - 1}].`,
      codeLine: 2,
      arrayState: [...arr],
      pivotIndex: i,
      sortedIndices: [...sortedIndices],
      variables: { i: `${i}`, key: `${key}`, j: `${j}` },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });

    while (j >= 0 && arr[j] > key) {
      comparisons++;
      swaps++;
      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `arr[${j}] (${arr[j]}) > key (${key}). Shift arr[${j}] right to position ${j + 1}.`,
        codeLine: 4,
        arrayState: [...arr],
        activeIndices: [j, j + 1],
        variables: { j: `${j}`, shift: `${arr[j]} -> index ${j + 1}`, key: `${key}` },
        comparisonsCount: comparisons,
        swapsCount: swaps,
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
      arr[j + 1] = arr[j];
      j--;
    }

    if (j >= 0) {
      comparisons++; // Account for the comparison that stopped the while loop
    }

    arr[j + 1] = key;
    sortedIndices.push(i);

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Inserted key ${key} into position ${j + 1}. Subarray arr[0..${i}] is now sorted.`,
      codeLine: 6,
      arrayState: [...arr],
      swappedIndices: [j + 1],
      sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
      variables: { inserted_at: `${j + 1}`, key: `${key}` },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `Insertion Sort complete! Best case O(n) for sorted inputs, worst case O(n²) for reverse inputs.`,
    codeLine: 7,
    arrayState: [...arr],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    variables: { status: 'Sorted', total_comparisons: `${comparisons}`, total_shifts: `${swaps}` },
    comparisonsCount: comparisons,
    swapsCount: swaps,
    stats: { comparisons, swaps, operations: comparisons + swaps }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateMergeSortSteps(input: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...input];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Merge Sort: Divide-and-Conquer paradigm. T(n) = 2T(n/2) + Theta(n) -> Theta(n log n). Input size: ${n}.`,
    codeLine: 1,
    arrayState: [...arr],
    variables: { n: `${n}`, paradigm: 'Divide & Conquer' },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  function merge(left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Merge stage: Merging sorted sublists [${left}..${mid}] (${leftArr.join(',')}) and [${mid + 1}..${right}] (${rightArr.join(',')}).`,
      codeLine: 4,
      arrayState: [...arr],
      activeIndices: Array.from({ length: right - left + 1 }, (_, k) => left + k),
      variables: { left: `${left}`, mid: `${mid}`, right: `${right}` },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      const chooseLeft = leftArr[i] <= rightArr[j]; // Stable comparison <=

      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `Compare left element ${leftArr[i]} with right element ${rightArr[j]}. Choose ${chooseLeft ? `${leftArr[i]} (preserves stability)` : `${rightArr[j]}`}.`,
        codeLine: 6,
        arrayState: [...arr],
        activeIndices: [left + i, mid + 1 + j],
        variables: { 'left[i]': `${leftArr[i]}`, 'right[j]': `${rightArr[j]}`, k: `${k}` },
        comparisonsCount: comparisons,
        swapsCount: swaps,
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });

      if (chooseLeft) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      swaps++;
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      swaps++;
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      swaps++;
      j++;
      k++;
    }

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Merged segment [${left}..${right}] successfully: [${arr.slice(left, right + 1).join(', ')}].`,
      codeLine: 8,
      arrayState: [...arr],
      swappedIndices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      variables: { merged_range: `[${left}..${right}]` },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });
  }

  function mergeSortRec(left: number, right: number) {
    if (left >= right) return;
    const mid = Math.floor(left + (right - left) / 2);

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Split: [${left}..${right}] into Left [${left}..${mid}] and Right [${mid + 1}..${right}].`,
      codeLine: 2,
      arrayState: [...arr],
      pivotIndex: mid,
      searchRange: [left, right],
      variables: { left: `${left}`, mid: `${mid}`, right: `${right}` },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });

    mergeSortRec(left, mid);
    mergeSortRec(mid + 1, right);
    merge(left, mid, right);
  }

  mergeSortRec(0, n - 1);

  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `Merge Sort completed in Theta(n log n) time. Auxiliary space: O(n). All elements sorted!`,
    codeLine: 9,
    arrayState: [...arr],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    variables: { status: 'Sorted', total_comparisons: `${comparisons}`, total_writes: `${swaps}` },
    comparisonsCount: comparisons,
    swapsCount: swaps,
    stats: { comparisons, swaps, operations: comparisons + swaps }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateQuickSortSteps(input: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...input];
  const n = arr.length;
  const sortedIndices: number[] = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Quick Sort initialized with ${n} elements. Using Lomuto partition scheme (pivot = last element of subarray).`,
    codeLine: 1,
    arrayState: [...arr],
    variables: { low: '0', high: `${n - 1}`, pivot: `${arr[n - 1]}` },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Partition range [${low}..${high}]. Selected pivot = arr[${high}] (${pivot}). Boundary pointer i = ${i}.`,
      codeLine: 2,
      arrayState: [...arr],
      pivotIndex: high,
      searchRange: [low, high],
      sortedIndices: [...sortedIndices],
      variables: { low: `${low}`, high: `${high}`, pivot: `${pivot}`, i: `${i}` },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      const needSwap = arr[j] < pivot;

      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `Compare arr[${j}] (${arr[j]}) with pivot ${pivot}. ${needSwap ? `${arr[j]} < ${pivot}, increment boundary i and swap.` : `${arr[j]} >= ${pivot}, keep in right partition.`}`,
        codeLine: 4,
        arrayState: [...arr],
        activeIndices: [j],
        pivotIndex: high,
        sortedIndices: [...sortedIndices],
        variables: { j: `${j}`, 'arr[j]': `${arr[j]}`, pivot: `${pivot}`, i: `${i}` },
        comparisonsCount: comparisons,
        swapsCount: swaps,
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });

      if (needSwap) {
        i++;
        if (i !== j) {
          const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
          swaps++;
          steps.push({
            stepIndex: steps.length,
            totalSteps: 1,
            description: `Swapped arr[${i}] (${arr[j]}) with arr[${j}] (${arr[i]}). Smaller elements placed left of boundary.`,
            codeLine: 6,
            arrayState: [...arr],
            pivotIndex: high,
            swappedIndices: [i, j],
            sortedIndices: [...sortedIndices],
            variables: { i: `${i}`, j: `${j}`, 'arr[i]': `${arr[i]}`, 'arr[j]': `${arr[j]}` },
            comparisonsCount: comparisons,
            swapsCount: swaps,
            stats: { comparisons, swaps, operations: comparisons + swaps }
          });
        }
      }
    }

    const t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
    swaps++;
    const finalPivotIdx = i + 1;
    sortedIndices.push(finalPivotIdx);

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Placed pivot ${pivot} into its final sorted slot at index ${finalPivotIdx}. Elements to left are <= ${pivot}, right are >= ${pivot}.`,
      codeLine: 7,
      arrayState: [...arr],
      sortedIndices: [...sortedIndices],
      pivotIndex: finalPivotIdx,
      swappedIndices: [finalPivotIdx, high],
      variables: { final_pivot_idx: `${finalPivotIdx}`, pivot: `${pivot}` },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });

    return finalPivotIdx;
  }

  function quickSort(low: number, high: number) {
    if (low < high) {
      const pIdx = partition(low, high);
      quickSort(low, pIdx - 1);
      quickSort(pIdx + 1, high);
    } else if (low === high) {
      sortedIndices.push(low);
    }
  }

  if (n > 0) quickSort(0, n - 1);

  const allIndices = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `Quick Sort completed! Average time O(n log n), worst case O(n²). Comparisons: ${comparisons}, swaps: ${swaps}.`,
    codeLine: 8,
    arrayState: [...arr],
    sortedIndices: allIndices,
    variables: { status: 'Sorted', total_comparisons: `${comparisons}`, total_swaps: `${swaps}` },
    comparisonsCount: comparisons,
    swapsCount: swaps,
    stats: { comparisons, swaps, operations: comparisons + swaps }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateHeapSortSteps(input: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...input];
  const n = arr.length;
  const sortedIndices: number[] = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Heap Sort: Transform-and-conquer paradigm. Phase 1: Build Max-Heap in O(n). Phase 2: Extract maximum n times in O(n log n).`,
    codeLine: 1,
    arrayState: [...arr],
    variables: { n: `${n}`, heap_size: `${n}` },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  function heapify(size: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size) {
      comparisons++;
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      comparisons++;
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `Heapify violation at node ${i}: Child index ${largest} (${arr[i]}) > parent (${temp}). Swapped!`,
        codeLine: 4,
        arrayState: [...arr],
        swappedIndices: [i, largest],
        sortedIndices: [...sortedIndices],
        variables: { parent: `${i}`, child: `${largest}`, heap_size: `${size}` },
        comparisonsCount: comparisons,
        swapsCount: swaps,
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });

      heapify(size, largest);
    }
  }

  // Phase 1: Build Max Heap
  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `Phase 1: Building initial Max-Heap bottom-up from last non-leaf node index ${Math.floor(n / 2) - 1}.`,
    codeLine: 2,
    arrayState: [...arr],
    variables: { phase: 'Build Max Heap' },
    comparisonsCount: comparisons,
    swapsCount: swaps,
    stats: { comparisons, swaps, operations: comparisons + swaps }
  });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `Max-Heap constructed! Root arr[0] (${arr[0]}) is the guaranteed global maximum.`,
    codeLine: 5,
    arrayState: [...arr],
    pivotIndex: 0,
    variables: { max_root: `${arr[0]}` },
    comparisonsCount: comparisons,
    swapsCount: swaps,
    stats: { comparisons, swaps, operations: comparisons + swaps }
  });

  // Phase 2: Extract Max
  for (let i = n - 1; i > 0; i--) {
    // Swap root (max) with end
    swaps++;
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    sortedIndices.unshift(i);

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Extracted max element ${temp} to index ${i}. Reduced heap size to ${i}.`,
      codeLine: 6,
      arrayState: [...arr],
      swappedIndices: [0, i],
      sortedIndices: [...sortedIndices],
      variables: { extracted_max: `${temp}`, new_heap_size: `${i}` },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });

    heapify(i, 0);
  }

  if (n > 0) sortedIndices.unshift(0);

  steps.push({
    stepIndex: steps.length,
    totalSteps: 1,
    description: `Heap Sort completed in guaranteed O(n log n) time and O(1) in-place auxiliary space. Not stable.`,
    codeLine: 8,
    arrayState: [...arr],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    variables: { status: 'Sorted', total_comparisons: `${comparisons}`, total_swaps: `${swaps}` },
    comparisonsCount: comparisons,
    swapsCount: swaps,
    stats: { comparisons, swaps, operations: comparisons + swaps }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}
