// Centralized Algorithm Registry & Execution Dispatcher
import { AlgorithmStep } from './types';
import {
  generateBubbleSortSteps,
  generateSelectionSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateHeapSortSteps
} from './algorithms/sorting';
import {
  generateLinearSearchSteps,
  generateBinarySearchSteps
} from './algorithms/searching';
import {
  generateStackSteps,
  generateQueueSteps,
  generateCircularQueueSteps
} from './algorithms/dataStructures';
import {
  generateBfsSteps,
  generateDfsSteps,
  generateDijkstraSteps,
  generateKruskalSteps
} from './algorithms/graphs';
import {
  generateKnapsackDpSteps,
  generateLcsSteps
} from './algorithms/dynamicProgramming';
import {
  generateNQueensSteps,
  generateRatInMazeSteps
} from './algorithms/backtracking';
import {
  generateAsymptoticGrowthSteps,
  generateMasterTheoremSteps
} from './algorithms/analysis';
import {
  generateKmpSteps,
  generateRabinKarpSteps
} from './algorithms/strings';
import {
  generateActivitySelectionSteps,
  generateFractionalKnapsackSteps,
  generateHuffmanCodingSteps
} from './algorithms/greedy';
import {
  generateFloodFillIslandsSteps,
  generateSpiralMatrixSteps
} from './algorithms/matrix';
import {
  generateMinimaxSteps,
  generateGameOfNimSteps
} from './algorithms/games';
import {
  generateEuclideanGcdSteps,
  generateSieveEratosthenesSteps
} from './algorithms/numberTheory';
import {
  generateQuickSelectSteps,
  generateDynamicArrayAmortizedSteps
} from './algorithms/extensions';
import {
  generateVertexCoverApproxSteps,
  generateTspSteps
} from './algorithms/complexity';
import {
  generateKaratsubaSteps,
  generateClosestPairSteps
} from './algorithms/divideAndConquer';

export interface AlgorithmRunnerConfig {
  id: string;
  name: string;
  category: string;
  paradigm: string;
  defaultInput: number[];
  inputValidator: (input: number[]) => { isValid: boolean; error?: string };
  run: (input: number[], target?: number) => AlgorithmStep[];
}

export const ALGORITHM_REGISTRY: Record<string, AlgorithmRunnerConfig> = {
  // 1. Sorting
  bubble_sort: {
    id: 'bubble_sort',
    name: 'Bubble Sort',
    category: 'cat_sorting',
    paradigm: 'Comparison-based Iterative',
    defaultInput: [65, 35, 45, 90, 55, 75],
    inputValidator: (arr) => ({ isValid: arr.length >= 2, error: arr.length < 2 ? 'Array must have at least 2 elements' : undefined }),
    run: (arr) => generateBubbleSortSteps(arr)
  },
  selection_sort: {
    id: 'selection_sort',
    name: 'Selection Sort',
    category: 'cat_sorting',
    paradigm: 'Comparison-based Selection',
    defaultInput: [65, 35, 45, 90, 55, 75],
    inputValidator: (arr) => ({ isValid: arr.length >= 2, error: arr.length < 2 ? 'Array must have at least 2 elements' : undefined }),
    run: (arr) => generateSelectionSortSteps(arr)
  },
  insertion_sort: {
    id: 'insertion_sort',
    name: 'Insertion Sort',
    category: 'cat_sorting',
    paradigm: 'Incremental Insertion',
    defaultInput: [65, 35, 45, 90, 55, 75],
    inputValidator: (arr) => ({ isValid: arr.length >= 2, error: arr.length < 2 ? 'Array must have at least 2 elements' : undefined }),
    run: (arr) => generateInsertionSortSteps(arr)
  },
  merge_sort: {
    id: 'merge_sort',
    name: 'Merge Sort',
    category: 'cat_divide_conquer',
    paradigm: 'Divide and Conquer',
    defaultInput: [65, 35, 45, 90, 55, 75],
    inputValidator: (arr) => ({ isValid: arr.length >= 2, error: arr.length < 2 ? 'Array must have at least 2 elements' : undefined }),
    run: (arr) => generateMergeSortSteps(arr)
  },
  quick_sort: {
    id: 'quick_sort',
    name: 'Quick Sort',
    category: 'cat_sorting',
    paradigm: 'Divide and Conquer',
    defaultInput: [65, 35, 45, 90, 55, 75],
    inputValidator: (arr) => ({ isValid: arr.length >= 2, error: arr.length < 2 ? 'Array must have at least 2 elements' : undefined }),
    run: (arr) => generateQuickSortSteps(arr)
  },
  heap_sort: {
    id: 'heap_sort',
    name: 'Heap Sort',
    category: 'cat_sorting',
    paradigm: 'Transform and Conquer',
    defaultInput: [65, 35, 45, 90, 55, 75],
    inputValidator: (arr) => ({ isValid: arr.length >= 2, error: arr.length < 2 ? 'Array must have at least 2 elements' : undefined }),
    run: (arr) => generateHeapSortSteps(arr)
  },

  // 2. Searching
  linear_search: {
    id: 'linear_search',
    name: 'Linear Search',
    category: 'cat_searching',
    paradigm: 'Sequential Scan',
    defaultInput: [35, 45, 55, 65, 75, 90],
    inputValidator: (arr) => ({ isValid: arr.length >= 1, error: arr.length < 1 ? 'Array cannot be empty' : undefined }),
    run: (arr, target = 55) => generateLinearSearchSteps(arr, target)
  },
  binary_search: {
    id: 'binary_search',
    name: 'Binary Search',
    category: 'cat_searching',
    paradigm: 'Divide and Conquer',
    defaultInput: [35, 45, 55, 65, 75, 90],
    inputValidator: (arr) => ({ isValid: arr.length >= 1, error: arr.length < 1 ? 'Array cannot be empty' : undefined }),
    run: (arr, target = 55) => generateBinarySearchSteps(arr, target)
  },

  // 3. Data Structures
  stack_ds: {
    id: 'stack_ds',
    name: 'Stack (LIFO)',
    category: 'cat_ds',
    paradigm: 'LIFO Storage',
    defaultInput: [10, 25, 42, 77],
    inputValidator: () => ({ isValid: true }),
    run: () => generateStackSteps()
  },
  queue_ds: {
    id: 'queue_ds',
    name: 'Linear Queue (FIFO)',
    category: 'cat_ds',
    paradigm: 'FIFO Storage',
    defaultInput: [1, 2, 3, 4],
    inputValidator: () => ({ isValid: true }),
    run: () => generateQueueSteps()
  },
  circular_queue: {
    id: 'circular_queue',
    name: 'Circular Queue (Wraparound)',
    category: 'cat_ds',
    paradigm: 'Ring Buffer Storage',
    defaultInput: [1, 2, 3, 4],
    inputValidator: () => ({ isValid: true }),
    run: () => generateCircularQueueSteps()
  },

  // 4. Graphs
  graph_bfs: {
    id: 'graph_bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'cat_graphs',
    paradigm: 'Level-Order Graph Traversal',
    defaultInput: [1, 2, 3, 4, 5, 6],
    inputValidator: () => ({ isValid: true }),
    run: () => generateBfsSteps()
  },
  graph_dfs: {
    id: 'graph_dfs',
    name: 'Depth-First Search (DFS)',
    category: 'cat_graphs',
    paradigm: 'Backtracking Graph Traversal',
    defaultInput: [1, 2, 3, 4, 5, 6],
    inputValidator: () => ({ isValid: true }),
    run: () => generateDfsSteps()
  },
  dijkstra: {
    id: 'dijkstra',
    name: "Dijkstra's Shortest Path",
    category: 'cat_graphs',
    paradigm: 'Greedy Relaxation',
    defaultInput: [1, 2, 3, 4, 5, 6],
    inputValidator: () => ({ isValid: true }),
    run: () => generateDijkstraSteps()
  },

  // 5. Greedy
  activity_selection: {
    id: 'activity_selection',
    name: 'Activity Selection (Interval Scheduling)',
    category: 'cat_greedy',
    paradigm: 'Greedy Earliest Finish Time',
    defaultInput: [1, 3, 0, 5, 8, 5],
    inputValidator: () => ({ isValid: true }),
    run: (arr) => generateActivitySelectionSteps(arr)
  },
  kruskal_mst: {
    id: 'kruskal_mst',
    name: "Kruskal's Minimum Spanning Tree",
    category: 'cat_greedy',
    paradigm: 'Greedy Edge Selection (DSU)',
    defaultInput: [1, 2, 3, 4, 5, 6],
    inputValidator: () => ({ isValid: true }),
    run: () => generateKruskalSteps()
  },
  fractional_knapsack: {
    id: 'fractional_knapsack',
    name: 'Fractional Knapsack Problem',
    category: 'cat_design_tech',
    paradigm: 'Greedy Value Density',
    defaultInput: [10, 20, 30],
    inputValidator: () => ({ isValid: true }),
    run: () => generateFractionalKnapsackSteps()
  },
  huffman_coding: {
    id: 'huffman_coding',
    name: 'Huffman Optimal Prefix Code',
    category: 'cat_design_tech',
    paradigm: 'Greedy Priority Queue Merging',
    defaultInput: [45, 13, 12, 16, 9, 5],
    inputValidator: () => ({ isValid: true }),
    run: () => generateHuffmanCodingSteps()
  },

  // 6. Dynamic Programming
  knapsack_dp: {
    id: 'knapsack_dp',
    name: '0/1 Knapsack Problem',
    category: 'cat_dp',
    paradigm: 'Dynamic Programming',
    defaultInput: [2, 3, 4, 5],
    inputValidator: () => ({ isValid: true }),
    run: () => generateKnapsackDpSteps()
  },
  lcs_dp: {
    id: 'lcs_dp',
    name: 'Longest Common Subsequence (LCS)',
    category: 'cat_dp',
    paradigm: 'Dynamic Programming',
    defaultInput: [1, 2, 3, 4],
    inputValidator: () => ({ isValid: true }),
    run: () => generateLcsSteps()
  },

  // 7. Backtracking
  n_queens: {
    id: 'n_queens',
    name: 'N-Queens Problem',
    category: 'cat_backtracking',
    paradigm: 'Backtracking Search',
    defaultInput: [4],
    inputValidator: () => ({ isValid: true }),
    run: () => generateNQueensSteps(4)
  },
  rat_in_maze: {
    id: 'rat_in_maze',
    name: 'Rat in a Maze',
    category: 'cat_backtracking',
    paradigm: 'Backtracking Grid Search',
    defaultInput: [4],
    inputValidator: () => ({ isValid: true }),
    run: () => generateRatInMazeSteps()
  },

  // 8. Analysis & Foundations (Unit 01)
  asymptotic_growth: {
    id: 'asymptotic_growth',
    name: 'Asymptotic Growth Comparator (Big-O)',
    category: 'cat_analysis',
    paradigm: 'Mathematical Analysis',
    defaultInput: [1, 2, 4, 8, 16],
    inputValidator: () => ({ isValid: true }),
    run: (arr) => generateAsymptoticGrowthSteps(arr)
  },
  master_theorem_sim: {
    id: 'master_theorem_sim',
    name: 'Master Theorem Recurrence Solver',
    category: 'cat_analysis',
    paradigm: 'Asymptotic Recurrence Analysis',
    defaultInput: [2, 2, 1],
    inputValidator: () => ({ isValid: true }),
    run: () => generateMasterTheoremSteps()
  },

  // 9. Divide and Conquer (Unit 02)
  karatsuba_mult: {
    id: 'karatsuba_mult',
    name: 'Karatsuba Fast Multiplication',
    category: 'cat_divide_conquer',
    paradigm: 'Divide and Conquer',
    defaultInput: [1234, 5678],
    inputValidator: () => ({ isValid: true }),
    run: () => generateKaratsubaSteps()
  },
  closest_pair: {
    id: 'closest_pair',
    name: 'Closest Pair of 2D Points',
    category: 'cat_divide_conquer',
    paradigm: 'Divide and Conquer',
    defaultInput: [2, 12, 40, 5, 12, 3],
    inputValidator: () => ({ isValid: true }),
    run: () => generateClosestPairSteps()
  },

  // 10. String Matching (Unit 11)
  kmp_string_match: {
    id: 'kmp_string_match',
    name: 'Knuth-Morris-Pratt (KMP) Search',
    category: 'cat_strings',
    paradigm: 'Prefix Automaton (π-table)',
    defaultInput: [1, 2, 3, 4],
    inputValidator: () => ({ isValid: true }),
    run: () => generateKmpSteps()
  },
  rabin_karp: {
    id: 'rabin_karp',
    name: 'Rabin-Karp Rolling Hash Search',
    category: 'cat_strings',
    paradigm: 'Rolling Hash / Modular Arithmetic',
    defaultInput: [1, 2, 3, 4],
    inputValidator: () => ({ isValid: true }),
    run: () => generateRabinKarpSteps()
  },

  // 11. Number Theory (Unit 12)
  euclidean_gcd: {
    id: 'euclidean_gcd',
    name: 'Euclidean GCD Algorithm',
    category: 'cat_number_theory',
    paradigm: 'Decrease and Conquer',
    defaultInput: [48, 18],
    inputValidator: () => ({ isValid: true }),
    run: (arr) => generateEuclideanGcdSteps(arr)
  },
  sieve_eratosthenes: {
    id: 'sieve_eratosthenes',
    name: 'Sieve of Eratosthenes (Primes)',
    category: 'cat_number_theory',
    paradigm: 'Multiplicative Elimination',
    defaultInput: [20],
    inputValidator: () => ({ isValid: true }),
    run: () => generateSieveEratosthenesSteps()
  },

  // 12. Matrix / Grid (Unit 15)
  flood_fill_islands: {
    id: 'flood_fill_islands',
    name: 'Number of Connected Islands (Flood Fill)',
    category: 'cat_matrix',
    paradigm: 'Grid Breadth-First Search',
    defaultInput: [4, 5],
    inputValidator: () => ({ isValid: true }),
    run: () => generateFloodFillIslandsSteps()
  },
  spiral_matrix: {
    id: 'spiral_matrix',
    name: 'Spiral Matrix Traversal',
    category: 'cat_matrix',
    paradigm: 'Perimeter Boundary Traversal',
    defaultInput: [4, 4],
    inputValidator: () => ({ isValid: true }),
    run: () => generateSpiralMatrixSteps()
  },

  // 13. Games & Adversarial (Unit 16)
  minimax_alphabeta: {
    id: 'minimax_alphabeta',
    name: 'Minimax with Alpha-Beta Pruning',
    category: 'cat_games',
    paradigm: 'Adversarial Game Tree Search',
    defaultInput: [3, 5, 6, 9],
    inputValidator: () => ({ isValid: true }),
    run: () => generateMinimaxSteps()
  },
  game_of_nim: {
    id: 'game_of_nim',
    name: "Game of Nim (Bouton's Theorem)",
    category: 'cat_games',
    paradigm: 'Sprague-Grundy Theorem / XOR Nim-Sum',
    defaultInput: [3, 4, 5],
    inputValidator: () => ({ isValid: true }),
    run: () => generateGameOfNimSteps()
  },

  // 14. Complexity & NP (Unit 04)
  vertex_cover_approx: {
    id: 'vertex_cover_approx',
    name: 'Vertex Cover 2-Approximation',
    category: 'cat_complexity',
    paradigm: 'Polynomial Approximation',
    defaultInput: [5, 6],
    inputValidator: () => ({ isValid: true }),
    run: () => generateVertexCoverApproxSteps()
  },
  tsp_held_karp: {
    id: 'tsp_held_karp',
    name: 'Traveling Salesperson Problem (TSP)',
    category: 'cat_complexity',
    paradigm: 'NP-Hard Dynamic Programming / 2-Opt',
    defaultInput: [4],
    inputValidator: () => ({ isValid: true }),
    run: () => generateTspSteps()
  },

  // 15. DAA Extensions (Unit 05)
  quick_select: {
    id: 'quick_select',
    name: "QuickSelect (Hoare's Selection)",
    category: 'cat_extensions',
    paradigm: 'Prune and Search (O(n) average)',
    defaultInput: [65, 35, 45, 90, 55, 75],
    inputValidator: () => ({ isValid: true }),
    run: (arr) => generateQuickSelectSteps(arr, 3)
  },
  dynamic_array_amortized: {
    id: 'dynamic_array_amortized',
    name: 'Dynamic Array Doubling (Amortized O(1))',
    category: 'cat_extensions',
    paradigm: 'Amortized Potential Method',
    defaultInput: [10, 20, 30, 40, 50, 60, 70, 80, 90],
    inputValidator: () => ({ isValid: true }),
    run: () => generateDynamicArrayAmortizedSteps()
  }
};

export function executeAlgorithm(algorithmId: string, input: number[], target?: number): AlgorithmStep[] {
  const runner = ALGORITHM_REGISTRY[algorithmId];
  if (!runner) {
    return generateBubbleSortSteps(input);
  }
  return runner.run(input, target);
}
