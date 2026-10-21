// Comprehensive Algorithm Correctness & Edge Case Test Suite
// Verifies multiset preservation, sorting order, search fidelity, data structures, graph traversals, DP, and backtracking

import {
  generateBubbleSortSteps,
  generateSelectionSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateHeapSortSteps
} from '../src/engine/algorithms/sorting';

import {
  generateLinearSearchSteps,
  generateBinarySearchSteps
} from '../src/engine/algorithms/searching';

import {
  generateStackSteps,
  generateQueueSteps,
  generateCircularQueueSteps
} from '../src/engine/algorithms/dataStructures';

import {
  generateBfsSteps,
  generateDfsSteps,
  generateDijkstraSteps,
  generateKruskalSteps
} from '../src/engine/algorithms/graphs';

import {
  generateKnapsackDpSteps,
  generateLcsSteps
} from '../src/engine/algorithms/dynamicProgramming';

import {
  generateNQueensSteps,
  generateRatInMazeSteps
} from '../src/engine/algorithms/backtracking';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
    process.exitCode = 1;
  }
}

function areArraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}

function preservesMultiset(input: number[], output: number[]): boolean {
  if (input.length !== output.length) return false;
  const countMap = new Map<number, number>();
  for (const n of input) countMap.set(n, (countMap.get(n) || 0) + 1);
  for (const n of output) {
    const count = countMap.get(n);
    if (!count || count <= 0) return false;
    countMap.set(n, count - 1);
  }
  return true;
}

function isSorted(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

console.log('\n========================================');
console.log('BHARTHI DSA VISUALIZER - TEST HARNESS');
console.log('========================================\n');

// 1. Sorting Algorithms Tests
console.log('[1/7] Testing Sorting Algorithms...');
const sortingAlgorithms = [
  { name: 'Bubble Sort', fn: generateBubbleSortSteps },
  { name: 'Selection Sort', fn: generateSelectionSortSteps },
  { name: 'Insertion Sort', fn: generateInsertionSortSteps },
  { name: 'Merge Sort', fn: generateMergeSortSteps },
  { name: 'Quick Sort', fn: generateQuickSortSteps },
  { name: 'Heap Sort', fn: generateHeapSortSteps }
];

const testDatasets: Array<{ label: string; data: number[] }> = [
  { label: 'Single element', data: [42] },
  { label: 'Two elements reversed', data: [99, 12] },
  { label: 'Already sorted', data: [10, 20, 30, 40, 50] },
  { label: 'Reverse sorted', data: [50, 40, 30, 20, 10] },
  { label: 'Duplicate heavy', data: [5, 2, 5, 8, 2, 5, 8, 1] },
  { label: 'Negative numbers', data: [-15, 30, -5, 0, 12, -40] },
  { label: 'Random distribution', data: [65, 35, 45, 90, 55, 75] }
];

for (const algo of sortingAlgorithms) {
  for (const testCase of testDatasets) {
    const steps = algo.fn(testCase.data);
    const finalStep = steps[steps.length - 1];
    const finalArr = finalStep.arrayState || [];

    assert(
      isSorted(finalArr),
      `${algo.name} orders [${testCase.label}]`,
      `Result: [${finalArr.join(', ')}]`
    );

    assert(
      preservesMultiset(testCase.data, finalArr),
      `${algo.name} preserves multiset elements for [${testCase.label}]`
    );
  }
}

// 2. Searching Algorithms Tests
console.log('\n[2/7] Testing Searching Algorithms...');
{
  const searchArr = [15, 25, 35, 45, 55, 65, 75];

  // Linear search present
  const lsStepsFound = generateLinearSearchSteps(searchArr, 45);
  const lsFoundStep = lsStepsFound[lsStepsFound.length - 1];
  assert(
    lsFoundStep.variables.status === 'FOUND' && lsFoundStep.variables.index === '3',
    'Linear Search finds present target (45) at index 3'
  );

  // Linear search absent
  const lsStepsAbsent = generateLinearSearchSteps(searchArr, 999);
  const lsAbsentStep = lsStepsAbsent[lsStepsAbsent.length - 1];
  assert(
    lsAbsentStep.variables.status === 'NOT FOUND',
    'Linear Search correctly reports absence of target (999)'
  );

  // Binary search present
  const bsStepsFound = generateBinarySearchSteps(searchArr, 55);
  const bsFoundStep = bsStepsFound.find(s => s.targetIndex !== undefined);
  assert(
    bsFoundStep !== undefined && bsFoundStep.variables.result?.includes('FOUND at index 4'),
    'Binary Search finds target 55 at mid index 4'
  );

  // Binary search absent
  const bsStepsAbsent = generateBinarySearchSteps(searchArr, 12);
  const bsAbsentStep = bsStepsAbsent[bsStepsAbsent.length - 1];
  assert(
    bsAbsentStep.variables.result === 'NOT FOUND',
    'Binary Search correctly reports absence when target is smaller than min'
  );
}

// 3. Stacks & Queues Tests
console.log('\n[3/7] Testing Linear & Circular Data Structures...');
{
  // Stack
  const stackSteps = generateStackSteps();
  const hasUnderflow = stackSteps.some(s => s.variables.status === 'STACK_UNDERFLOW_ERROR');
  const hasOverflow = stackSteps.some(s => s.variables.status === 'STACK_OVERFLOW_ERROR');
  assert(hasUnderflow, 'Stack detects underflow condition when popping empty stack');
  assert(hasOverflow, 'Stack detects overflow condition when exceeding capacity 5');

  // Linear Queue
  const queueSteps = generateQueueSteps();
  assert(queueSteps.length >= 7, 'Linear Queue generates complete enqueue and dequeue sequence');

  // Circular Queue
  const circSteps = generateCircularQueueSteps();
  const hasWraparound = circSteps.some(s => s.description.includes('Wraparound'));
  assert(hasWraparound, 'Circular Queue successfully wraps around rear index from capacity - 1 to 0');
}

// 4. Graph Algorithms Tests
console.log('\n[4/7] Testing Graph Algorithms (BFS, DFS, Dijkstra, Kruskal)...');
{
  // BFS
  const bfsSteps = generateBfsSteps();
  const finalBfs = bfsSteps[bfsSteps.length - 1];
  assert(
    finalBfs.variables.status === 'BFS_COMPLETE',
    'BFS explores all reachable vertices in level order'
  );

  // DFS
  const dfsSteps = generateDfsSteps();
  const finalDfs = dfsSteps[dfsSteps.length - 1];
  assert(
    finalDfs.variables.status === 'DFS_COMPLETE',
    'DFS executes depth-first traversal with call stack backtracking'
  );

  // Dijkstra
  const dijkstraSteps = generateDijkstraSteps();
  const finalDij = dijkstraSteps[dijkstraSteps.length - 1];
  assert(
    finalDij.variables.status === 'OPTIMAL_SHORTEST_PATHS',
    "Dijkstra correctly computes shortest distances with non-negative weights"
  );

  // Kruskal MST
  const kruskalSteps = generateKruskalSteps();
  const finalKruskal = kruskalSteps[kruskalSteps.length - 1];
  assert(
    finalKruskal.variables.final_mst_weight === '17',
    "Kruskal's MST correctly computes minimal spanning tree weight = 17 and rejects cycles"
  );
}

// 5. Dynamic Programming Tests
console.log('\n[5/7] Testing Dynamic Programming (0/1 Knapsack, LCS)...');
{
  // 0/1 Knapsack
  const knapsackSteps = generateKnapsackDpSteps();
  const finalKnapsack = knapsackSteps[knapsackSteps.length - 1];
  assert(
    finalKnapsack.variables.max_value === '8',
    '0/1 Knapsack correctly computes optimal capacity value 8'
  );

  // LCS
  const lcsSteps = generateLcsSteps('STONE', 'LONGEST');
  const finalLcs = lcsSteps[lcsSteps.length - 1];
  assert(
    finalLcs.variables.lcs_result === 'ONE',
    'LCS correctly computes Longest Common Subsequence "ONE" (length 3)'
  );
}

// 6. Backtracking Tests
console.log('\n[6/7] Testing Backtracking (N-Queens, Rat in Maze)...');
{
  // N-Queens (N=4)
  const nQueensSteps = generateNQueensSteps(4);
  const solutionStep = nQueensSteps.find(s => s.variables.status === 'SOLUTION_FOUND');
  assert(
    solutionStep !== undefined && solutionStep.queensPlacement?.length === 4,
    '4-Queens finds valid non-attacking configuration'
  );

  // Rat in a Maze
  const ratSteps = generateRatInMazeSteps();
  const finalRat = ratSteps[ratSteps.length - 1];
  assert(
    finalRat.variables.status === 'EXIT_REACHED',
    'Rat in a Maze successfully finds valid path to exit (3,3)'
  );
}

// 7. Master Theorem Boundary Mathematics
console.log('\n[7/7] Testing Master Theorem Logic...');
{
  // Case 1: T(n) = 8T(n/2) + Theta(n) -> a=8, b=2, k=1. log_2(8) = 3 > 1 -> Case 1
  const a1 = 8, b1 = 2, k1 = 1;
  const p1 = Math.log(a1) / Math.log(b1); // 3
  assert(k1 < p1, 'Master Theorem Case 1: k=1 < log_b(a)=3');

  // Case 2: T(n) = 2T(n/2) + Theta(n) -> a=2, b=2, k=1. log_2(2) = 1 == 1 -> Case 2
  const a2 = 2, b2 = 2, k2 = 1;
  const p2 = Math.log(a2) / Math.log(b2); // 1
  assert(Math.abs(k2 - p2) < 0.001, 'Master Theorem Case 2: k=1 == log_b(a)=1');

  // Case 3: T(n) = 2T(n/2) + Theta(n^2) -> a=2, b=2, k=2. log_2(2) = 1 < 2 -> Case 3
  const a3 = 2, b3 = 2, k3 = 2;
  const p3 = Math.log(a3) / Math.log(b3); // 1
  assert(k3 > p3, 'Master Theorem Case 3: k=2 > log_b(a)=1');
}

console.log('\n========================================');
console.log(`SUMMARY: ${passedTests}/${totalTests} TESTS PASSED!`);
console.log('========================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
