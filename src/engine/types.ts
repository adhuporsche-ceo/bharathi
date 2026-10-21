// Core Execution Engine Types for Bharthi DSA Visualizer
// Conforms to KCT 23CS401 DAA syllabus requirements

export type AlgorithmParadigm =
  | 'Brute Force'
  | 'Divide and Conquer'
  | 'Greedy Method'
  | 'Dynamic Programming'
  | 'Backtracking'
  | 'Branch and Bound'
  | 'Decrease and Conquer'
  | 'Transform and Conquer'
  | 'Linear Data Structure'
  | 'Graph Theory';

export interface ComplexityInfo {
  best: string;
  average: string;
  worst: string;
  space: string;
  paradigm: string;
  stability: 'Stable' | 'Unstable' | 'N/A';
  inPlace: 'Yes' | 'No' | 'N/A';
}

export interface CodeSnippet {
  pseudo: string;
  cpp: string;
  java: string;
  python: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface PracticeProblem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  sampleInput: string;
  sampleOutput: string;
  explanation: string;
}

export interface VivaQuestion {
  question: string;
  answer: string;
}

export interface GraphNodeState {
  id: string;
  label: string;
  x: number;
  y: number;
  status: 'unvisited' | 'visiting' | 'visited' | 'in_path' | 'discarded';
  distance?: string;
  predecessor?: string;
}

export interface GraphEdgeState {
  from: string;
  to: string;
  weight?: number;
  isHighlighted?: boolean;
  isInMst?: boolean;
  isDiscarded?: boolean;
}

export interface DpTableState {
  rowHeaders: string[];
  colHeaders: string[];
  matrix: (number | string)[][];
  activeRow?: number;
  activeCol?: number;
  sourceCells?: Array<{ row: number; col: number }>;
  formulaExplanation: string;
  reconstructedPath?: Array<{ row: number; col: number }>;
}

export interface QuizQuestion {
  id?: string;
  prompt?: string;
  question?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AlgorithmStep {
  stepIndex: number;
  totalSteps: number;
  description: string;
  codeLine: number;
  // Array & Sorting / Searching
  arrayState?: number[];
  auxiliaryArrayState?: number[];
  activeIndices?: number[];   // Elements currently being inspected/compared
  swappedIndices?: number[];  // Elements currently being swapped
  sortedIndices?: number[];   // Elements permanently in their sorted positions
  pivotIndex?: number;        // Pivot element in QuickSort or Mid in Binary Search
  targetIndex?: number;       // Found index
  searchRange?: [number, number]; // [low, high]
  
  // Data Structure States
  stackState?: string[];
  queueState?: string[];
  isCircularQueue?: boolean;
  circularQueueFront?: number;
  circularQueueRear?: number;
  circularQueueCapacity?: number;
  
  // Graph States
  graphNodes?: GraphNodeState[];
  graphEdges?: GraphEdgeState[];
  currentFrontier?: string[];
  mstWeight?: number;

  // DP States
  dpTable?: DpTableState;

  // Backtracking States
  queensPlacement?: number[];
  mazeGrid?: number[][];
  mazePath?: Array<[number, number]>;
  mazeCurrent?: [number, number];
  subsetCandidates?: number[];
  subsetCurrentSum?: number;
  subsetIncluded?: number[];

  // Domain-Specific Specialized States
  activityIntervals?: ActivityInterval[];
  stringPatternState?: StringPatternState;
  matrixGridState?: MatrixGridState;
  minimaxTreeState?: { nodes: MinimaxNode[]; currentId?: string };
  mathEquationState?: { a: number; b: number; quotient: number; remainder: number; equation: string };

  // CPU Registers & Stats
  variables: Record<string, string>;
  comparisonsCount?: number;
  swapsCount?: number;
  stats?: {
    comparisons: number;
    swaps: number;
    operations: number;
  };
  quiz?: QuizQuestion;
}

export interface ActivityInterval {
  id: string;
  name: string;
  start: number;
  finish: number;
  isSelected?: boolean;
  isExamined?: boolean;
  isRejected?: boolean;
}

export interface StringPatternState {
  text: string;
  pattern: string;
  textIndex: number;
  patternIndex: number;
  lpsTable?: number[];
  isMatch?: boolean;
  mismatchIndex?: number;
}

export interface MatrixGridState {
  grid: (number | string)[][];
  activeCell?: [number, number];
  visitedCells?: Array<[number, number]>;
  islandCount?: number;
  mode?: string;
}

export interface MinimaxNode {
  id: string;
  label: string;
  value?: number;
  depth: number;
  isMax: boolean;
  isPruned?: boolean;
  isCurrent?: boolean;
  alpha?: number;
  beta?: number;
}

export interface AlgorithmCategory {
  id: string;
  indexStr: string;
  title: string;
  lessonCount: number;
  description: string;
  iconName: string;
}

export interface AlgorithmItem {
  id: string;
  categoryId: string;
  name: string;
  shortDesc: string;
  detailedDefinition?: string;
  realWorldAnalogy?: string;
  whyAndWhen?: string;
  complexity: ComplexityInfo;
  commonMistake: string;
  kctExamTip: string;
  codeSnippets: CodeSnippet;
  glossary: GlossaryItem[];
  inputRequirement: string;
  defaultInput: number[];
  vivaQuestions?: VivaQuestion[];
  practiceProblem?: PracticeProblem;
}
