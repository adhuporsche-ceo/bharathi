export interface AlgorithmCategory {
  id: string;
  indexStr: string;
  title: string;
  lessonCount: number;
  description: string;
  iconName: string;
}

export interface ComplexityInfo {
  best: string;
  average: string;
  worst: string;
  space: string;
  paradigm: string;
  stability: string;
  inPlace: string;
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

export interface QuizQuestion {
  id?: string;
  question?: string;
  prompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GraphNodeState {
  id: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
  status: 'unvisited' | 'visiting' | 'visited' | 'in_path' | 'discarded';
  distance?: string;
  predecessor?: string;
}

export interface GraphEdgeState {
  from: string;
  to: string;
  weight?: number;
  isHighlighted?: boolean;
}

export interface DpTableState {
  rowHeaders: string[];
  colHeaders: string[];
  matrix: (number | string)[][];
  activeRow?: number;
  activeCol?: number;
  formulaExplanation: string;
}

export interface TreeNodeState {
  val: number;
  left?: TreeNodeState;
  right?: TreeNodeState;
  x: number; // percentage
  y: number; // percentage
  isHighlighted?: boolean;
  isCurrent?: boolean;
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

export interface AlgorithmStep {
  stepIndex: number;
  totalSteps: number;
  description: string;
  codeLine: number;
  arrayState?: number[];
  activeIndices?: number[];
  swappedIndices?: number[];
  sortedIndices?: number[];
  pivotIndex?: number;
  targetIndex?: number;
  searchRange?: [number, number];
  stackState?: string[];
  queueState?: string[];
  isCircularQueue?: boolean;
  circularQueueFront?: number;
  circularQueueRear?: number;
  circularQueueCapacity?: number;
  graphNodes?: GraphNodeState[];
  graphEdges?: GraphEdgeState[];
  dpTable?: DpTableState;
  queensPlacement?: number[];
  treeRoot?: TreeNodeState;
  activityIntervals?: ActivityInterval[];
  stringPatternState?: StringPatternState;
  matrixGridState?: MatrixGridState;
  minimaxTreeState?: { nodes: MinimaxNode[]; currentId?: string };
  mathEquationState?: { a: number; b: number; quotient: number; remainder: number; equation: string };
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

export const CATEGORIES: AlgorithmCategory[] = [
  {
    id: 'cat_analysis',
    indexStr: '01',
    title: 'Analysis & Correctness',
    lessonCount: 10,
    description: 'Master Big-O/Omega/Theta, loop invariants, recurrence relations, substitution, recursion trees, and Master Theorem.',
    iconName: 'TrendingUp'
  },
  {
    id: 'cat_divide_conquer',
    indexStr: '02',
    title: 'Divide and Conquer',
    lessonCount: 6,
    description: 'Divide into independent subproblems, solve recursively, and combine: Merge Sort, Quick Sort, Karatsuba, Strassen.',
    iconName: 'Split'
  },
  {
    id: 'cat_branch_bound',
    indexStr: '03',
    title: 'Branch and Bound',
    lessonCount: 4,
    description: 'State space tree pruning with upper/lower bounding functions: 0/1 Knapsack B&B, Traveling Salesperson (TSP), 15-Puzzle.',
    iconName: 'GitBranch'
  },
  {
    id: 'cat_complexity',
    indexStr: '04',
    title: 'Complexity Theory',
    lessonCount: 5,
    description: 'Tractable vs Intractable problems, P vs NP, Polynomial Reductions, Cook-Levin Theorem, and NP-Completeness.',
    iconName: 'Gauge'
  },
  {
    id: 'cat_extensions',
    indexStr: '05',
    title: 'DAA Extensions',
    lessonCount: 20,
    description: 'Randomized algorithms, QuickSelect, aggregate/potential amortized analysis, and approximation bounds.',
    iconName: 'FlaskConical'
  },
  {
    id: 'cat_sorting',
    indexStr: '06',
    title: 'Sorting',
    lessonCount: 15,
    description: 'Fundamental and advanced ordering algorithms: Bubble, Selection, Insertion, Merge, Quick, Heap, Radix.',
    iconName: 'ArrowUpDown'
  },
  {
    id: 'cat_searching',
    indexStr: '07',
    title: 'Searching',
    lessonCount: 14,
    description: 'Linear, Binary, Ternary, Jump, and Interpolation search strategies with logarithmic bounds.',
    iconName: 'Search'
  },
  {
    id: 'cat_ds',
    indexStr: '08',
    title: 'Data Structures',
    lessonCount: 49,
    description: 'Stack, Queue, Linked Lists, Binary Search Trees, Self-balancing AVL, Heaps, and Disjoint Set Union.',
    iconName: 'Layers'
  },
  {
    id: 'cat_graphs',
    indexStr: '09',
    title: 'Graphs',
    lessonCount: 19,
    description: 'Breadth-First, Depth-First, Dijkstra’s Shortest Path, Bellman-Ford, Kruskal’s & Prim’s MSTs, Topological Sort.',
    iconName: 'Share2'
  },
  {
    id: 'cat_dp',
    indexStr: '10',
    title: 'Dynamic Programming',
    lessonCount: 14,
    description: 'Overlapping subproblems & optimal substructure: Knapsack, LCS, LIS, Matrix Chain Multiplication, Coin Change.',
    iconName: 'Grid'
  },
  {
    id: 'cat_strings',
    indexStr: '11',
    title: 'Strings',
    lessonCount: 5,
    description: 'Pattern matching with Knuth-Morris-Pratt (KMP), Rabin-Karp rolling hash, Z-Algorithm, and Tries.',
    iconName: 'Type'
  },
  {
    id: 'cat_number_theory',
    indexStr: '12',
    title: 'Number Theory',
    lessonCount: 2,
    description: 'Euclidean GCD, Modular Exponentiation, and Sieve of Eratosthenes prime factorization.',
    iconName: 'Binary'
  },
  {
    id: 'cat_backtracking',
    indexStr: '13',
    title: 'Backtracking',
    lessonCount: 6,
    description: 'Systematic trial-and-error state pruning: N-Queens problem, Rat in a Maze, Sudoku Solver, Subset Sum.',
    iconName: 'RotateCcw'
  },
  {
    id: 'cat_greedy',
    indexStr: '14',
    title: 'Greedy',
    lessonCount: 5,
    description: 'Locally optimal choices yielding globally optimal solutions: Huffman Coding, Fractional Knapsack, Activity Selection.',
    iconName: 'Crosshair'
  },
  {
    id: 'cat_matrix',
    indexStr: '15',
    title: 'Matrix / Grid',
    lessonCount: 2,
    description: 'Grid pathfinding BFS/A*, Matrix Rotation in-place, Spiral Traversal, and Connected Components Island Counting.',
    iconName: 'Table'
  },
  {
    id: 'cat_games',
    indexStr: '16',
    title: 'Games',
    lessonCount: 8,
    description: 'Adversarial search: Minimax Decision Rule with Alpha-Beta Pruning, Game of Nim, and Cellular Automata.',
    iconName: 'Gamepad2'
  }
];

export const ALGORITHMS: AlgorithmItem[] = [
  // 1. Bubble Sort
  {
    id: 'bubble_sort',
    categoryId: 'cat_sorting',
    name: 'Bubble Sort',
    shortDesc: 'Repeatedly steps through list, compares adjacent elements, and swaps them if in wrong order.',
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      paradigm: 'Comparison-based Iterative',
      stability: 'Stable',
      inPlace: 'Yes'
    },
    commonMistake: 'A lower step count on one input does not prove a better algorithm overall. Bubble sort degrades severely on reverse-sorted inputs.',
    kctExamTip: 'KCT DAA Unit 1: State the loop invariant: After pass k, the last k elements are in their final sorted positions.',
    codeSnippets: {
      pseudo: `function bubbleSort(A):
  n = length(A)
  for i from 0 to n - 2:
    swapped = false
    for j from 0 to n - i - 2:
      if A[j] > A[j+1]:
        swap(A[j], A[j+1])
        swapped = true
    if not swapped: break
  return A`,
      cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`
    },
    glossary: [
      { term: 'Inversion', definition: 'A pair of elements (A[i], A[j]) such that i < j and A[i] > A[j].' },
      { term: 'Stability', definition: 'Preserves the relative order of elements with equal keys.' },
      { term: 'Adaptive', definition: 'Runs faster (O(n)) when the array is already sorted or nearly sorted.' }
    ],
    inputRequirement: 'Array of 4 to 8 positive integers (e.g. 65, 35, 45, 90, 55, 75)',
    defaultInput: [65, 35, 45, 90, 55, 75]
  },
  // 2. Selection Sort
  {
    id: 'selection_sort',
    categoryId: 'cat_sorting',
    name: 'Selection Sort',
    shortDesc: 'Divides the array into sorted and unsorted subarrays; repeatedly selects the minimum element.',
    complexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      paradigm: 'Selection Iterative',
      stability: 'Unstable',
      inPlace: 'Yes'
    },
    commonMistake: 'Assuming Selection Sort is faster on sorted arrays. It always performs exactly n(n-1)/2 comparisons regardless of initial order.',
    kctExamTip: 'Selection Sort performs at most n swaps (O(n)), making it useful when write/swap operations are costly (e.g. Flash EEPROM).',
    codeSnippets: {
      pseudo: `function selectionSort(A):
  n = length(A)
  for i from 0 to n - 2:
    min_idx = i
    for j from i + 1 to n - 1:
      if A[j] < A[min_idx]:
        min_idx = j
    if min_idx != i:
      swap(A[i], A[min_idx])`,
      cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        if (min_idx != i) swap(arr[i], arr[min_idx]);
    }
}`,
      java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}`,
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`
    },
    glossary: [
      { term: 'Minimum Index', definition: 'Pointer tracking the lowest value found in the current pass.' },
      { term: 'Non-adaptive', definition: 'Takes the same O(n²) time regardless of whether input is sorted or reversed.' }
    ],
    inputRequirement: 'Array of 4 to 8 positive integers',
    defaultInput: [65, 35, 45, 90, 55, 75]
  },
  // 3. Insertion Sort
  {
    id: 'insertion_sort',
    categoryId: 'cat_sorting',
    name: 'Insertion Sort',
    shortDesc: 'Builds sorted array one item at a time by repeatedly taking the next element and inserting it in place.',
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      paradigm: 'Incremental Insertion',
      stability: 'Stable',
      inPlace: 'Yes'
    },
    commonMistake: 'Assuming quicksort is always superior. For small arrays (n <= 16), Insertion Sort is usually faster due to cache locality and low overhead.',
    kctExamTip: 'Often used as the base case in hybrid sorting algorithms like TimSort (used in Python and Java standard libraries).',
    codeSnippets: {
      pseudo: `function insertionSort(A):
  for i from 1 to length(A) - 1:
    key = A[i]
    j = i - 1
    while j >= 0 and A[j] > key:
      A[j + 1] = A[j]
      j = j - 1
    A[j + 1] = key`,
      cpp: `void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`
    },
    glossary: [
      { term: 'Key Element', definition: 'The element currently being inserted into the sorted segment.' },
      { term: 'Online Algorithm', definition: 'Can sort a list as it receives it on-the-fly without needing all elements upfront.' }
    ],
    inputRequirement: 'Array of 4 to 8 positive integers',
    defaultInput: [65, 35, 45, 90, 55, 75]
  },
  // 4. Quick Sort
  {
    id: 'quick_sort',
    categoryId: 'cat_sorting',
    name: 'Quick Sort (Lomuto)',
    shortDesc: 'Picks a pivot, partitions the array such that smaller elements go left and larger go right, then recurses.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)',
      paradigm: 'Divide and Conquer',
      stability: 'Unstable',
      inPlace: 'Yes'
    },
    commonMistake: 'Picking the first or last element as pivot on already sorted arrays causes worst-case O(n²) behavior.',
    kctExamTip: 'Randomized QuickSort achieves expected O(n log n) running time on ANY input distribution.',
    codeSnippets: {
      pseudo: `function partition(A, low, high):
  pivot = A[high]
  i = low - 1
  for j from low to high - 1:
    if A[j] < pivot:
      i = i + 1
      swap(A[i], A[j])
  swap(A[i + 1], A[high])
  return i + 1`,
      cpp: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`,
      java: `int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
    return i + 1;
}`,
      python: `def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`
    },
    glossary: [
      { term: 'Pivot', definition: 'The reference element used to partition the array.' },
      { term: 'Lomuto Partition', definition: 'Simpler partition scheme using a single scanning pointer and a boundary pointer.' }
    ],
    inputRequirement: 'Array of 4 to 8 positive integers',
    defaultInput: [65, 35, 45, 90, 55, 75]
  },
  // 5. Binary Search
  {
    id: 'binary_search',
    categoryId: 'cat_searching',
    name: 'Binary Search',
    shortDesc: 'Halves the search interval each step in a sorted sequence, achieving logarithmic time.',
    complexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
      space: 'O(1)',
      paradigm: 'Divide and Conquer',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Applying Binary Search to unsorted arrays. The precondition MUST be monotonic order.',
    kctExamTip: 'Avoid integer overflow when computing mid: use low + (high - low) / 2 instead of (low + high) / 2.',
    codeSnippets: {
      pseudo: `function binarySearch(A, target):
  low = 0, high = length(A) - 1
  while low <= high:
    mid = low + (high - low) / 2
    if A[mid] == target: return mid
    else if A[mid] < target: low = mid + 1
    else: high = mid - 1
  return -1`,
      cpp: `int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      java: `public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1`
    },
    glossary: [
      { term: 'Midpoint', definition: 'Index splitting current range into equal halves.' },
      { term: 'Logarithmic reduction', definition: 'Search interval is halved at each step: n -> n/2 -> n/4 -> ... -> 1.' }
    ],
    inputRequirement: 'Sorted array of integers (e.g. 35, 45, 55, 65, 75, 90)',
    defaultInput: [35, 45, 55, 65, 75, 90]
  },
  // 6. Stack
  {
    id: 'stack_ds',
    categoryId: 'cat_ds',
    name: 'Stack (LIFO)',
    shortDesc: 'Linear data structure where elements are added and removed strictly from the top.',
    complexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      space: 'O(n)',
      paradigm: 'LIFO Storage',
      stability: 'N/A',
      inPlace: 'N/A'
    },
    commonMistake: 'Attempting to Pop or Peek on an empty stack leads to Stack Underflow exception.',
    kctExamTip: 'Applications in CS: Function call recursion stack, parenthesis matching, infix to postfix, undo operations.',
    codeSnippets: {
      pseudo: `class Stack:
  top = -1
  push(x):
    top = top + 1
    A[top] = x
  pop():
    val = A[top]
    top = top - 1
    return val
  peek():
    return A[top]`,
      cpp: `stack<int> s;
s.push(10);
s.push(20);
int topVal = s.top(); // 20
s.pop();`,
      java: `Stack<Integer> s = new Stack<>();
s.push(10);
s.push(20);
int topVal = s.peek(); // 20
s.pop();`,
      python: `stack = []
stack.append(10)
stack.append(20)
top_val = stack[-1]  # 20
popped = stack.pop()`
    },
    glossary: [
      { term: 'LIFO', definition: 'Last In, First Out.' },
      { term: 'Underflow', definition: 'Popping from an empty stack.' },
      { term: 'Overflow', definition: 'Pushing to a full fixed-size stack.' }
    ],
    inputRequirement: 'Push and Pop sequential operations',
    defaultInput: [10, 25, 42, 77]
  },
  // 7. Queue
  {
    id: 'queue_ds',
    categoryId: 'cat_ds',
    name: 'Queue (FIFO)',
    shortDesc: 'Linear structure where elements are inserted at the rear and removed from the front.',
    complexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      space: 'O(n)',
      paradigm: 'FIFO Storage',
      stability: 'N/A',
      inPlace: 'N/A'
    },
    commonMistake: 'Using a linear array without circular wrap-around causes false overflow even when front cells are vacant.',
    kctExamTip: 'Essential for Level-Order tree traversal, BFS in graphs, CPU scheduling queues, and printer spoolers.',
    codeSnippets: {
      pseudo: `class Queue:
  enqueue(x):
    rear = (rear + 1) % MAX
    A[rear] = x
  dequeue():
    val = A[front]
    front = (front + 1) % MAX
    return val`,
      cpp: `queue<int> q;
q.push(10); // enqueue
q.push(20);
int frontVal = q.front();
q.pop();    // dequeue`,
      java: `Queue<Integer> q = new LinkedList<>();
q.offer(10);
q.offer(20);
int frontVal = q.peek();
q.poll();`,
      python: `from collections import deque
q = deque()
q.append(10)
q.append(20)
front_val = q[0]
popped = q.popleft()`
    },
    glossary: [
      { term: 'FIFO', definition: 'First In, First Out.' },
      { term: 'Circular Queue', definition: 'Connects rear back to front using modulo arithmetic to prevent space wastage.' }
    ],
    inputRequirement: 'Enqueue and Dequeue sequence',
    defaultInput: [1, 2, 3, 4]
  },
  // 8. Graph BFS
  {
    id: 'graph_bfs',
    categoryId: 'cat_graphs',
    name: 'Breadth-First Search (BFS)',
    shortDesc: 'Explores a graph level by level from a source vertex using a FIFO Queue.',
    complexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V)',
      paradigm: 'Level-order Traversal',
      stability: 'N/A',
      inPlace: 'No'
    },
    commonMistake: 'Forgetting to mark a vertex as visited immediately upon enqueuing causes redundant re-enqueuing and exponential queue blowout.',
    kctExamTip: 'BFS guarantees the shortest path (minimum number of edges) in an unweighted graph.',
    codeSnippets: {
      pseudo: `function BFS(graph, start):
  visited = set()
  queue = [start]
  visited.add(start)
  while queue is not empty:
    u = queue.dequeue()
    for neighbor v in graph[u]:
      if v not in visited:
        visited.add(v)
        queue.enqueue(v)`,
      cpp: `void bfs(int start, const vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
      java: `void bfs(int start, List<List<Integer>> adj) {
    boolean[] visited = new boolean[adj.size()];
    Queue<Integer> q = new LinkedList<>();
    visited[start] = true;
    q.offer(start);
    while (!q.isEmpty()) {
        int u = q.poll();
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                visited[v] = true;
                q.offer(v);
            }
        }
    }
}`,
      python: `def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        u = queue.popleft()
        for v in graph[u]:
            if v not in visited:
                visited.add(v)
                queue.append(v)`
    },
    glossary: [
      { term: 'Visited Set', definition: 'Tracks vertices that have entered the queue to prevent infinite cycles.' },
      { term: 'Shortest Path Property', definition: 'In unweighted graphs, the first time BFS visits a node, it arrives via the shortest route.' }
    ],
    inputRequirement: 'Unweighted directed/undirected graph vertices',
    defaultInput: [0, 1, 2, 3, 4, 5]
  },
  // 9. Knapsack DP
  {
    id: 'knapsack_dp',
    categoryId: 'cat_dp',
    name: '0/1 Knapsack Problem',
    shortDesc: 'Maximize value within a weight capacity where each item can either be taken or left behind.',
    complexity: {
      best: 'O(n * W)',
      average: 'O(n * W)',
      worst: 'O(n * W)',
      space: 'O(n * W)',
      paradigm: 'Dynamic Programming',
      stability: 'N/A',
      inPlace: 'No'
    },
    commonMistake: 'Assuming greedy choice (highest value/weight ratio) works for 0/1 knapsack. Greedy works ONLY for Fractional Knapsack!',
    kctExamTip: 'Knapsack time complexity O(n*W) is Pseudo-polynomial because W depends on the numeric value, not the number of bits in input.',
    codeSnippets: {
      pseudo: `dp[i][w] = max(
  dp[i-1][w],
  dp[i-1][w - wt[i-1]] + val[i-1] (if w >= wt[i-1])
)`,
      cpp: `int knapSack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w)
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}`,
      java: `public static int knapSack(int W, int[] wt, int[] val, int n) {
    int[][] dp = new int[n + 1][W + 1];
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w)
                dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}`,
      python: `def knapsack(W, wt, val, n):
    dp = [[0 for _ in range(W + 1)] for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if wt[i - 1] <= w:
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][W]`
    },
    glossary: [
      { term: 'Optimal Substructure', definition: 'An optimal solution contains optimal solutions to its subproblems.' },
      { term: 'Overlapping Subproblems', definition: 'Subproblems are recomputed multiple times in a naive recursive solution.' }
    ],
    inputRequirement: 'Item weights, values, and knapsack capacity W',
    defaultInput: [2, 3, 4, 5]
  },
  // 10. N-Queens
  {
    id: 'n_queens',
    categoryId: 'cat_backtracking',
    name: 'N-Queens Problem',
    shortDesc: 'Place N chess queens on an N×N board so that no two queens threaten each other.',
    complexity: {
      best: 'O(N!)',
      average: 'O(N!)',
      worst: 'O(N!)',
      space: 'O(N)',
      paradigm: 'Backtracking Depth-First Search',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Only checking horizontal and vertical threats. Diagonal threats occur when |row1 - row2| == |col1 - col2|.',
    kctExamTip: 'For N=1 and N>=4, valid solutions always exist. N=2 and N=3 have 0 solutions.',
    codeSnippets: {
      pseudo: `function solveNQueens(row):
  if row == N:
    recordSolution()
    return
  for col from 0 to N - 1:
    if isSafe(row, col):
      placeQueen(row, col)
      solveNQueens(row + 1)
      removeQueen(row, col) // backtrack`,
      cpp: `bool isSafe(int row, int col, vector<int>& board) {
    for (int r = 0; r < row; r++) {
        if (board[r] == col || abs(board[r] - col) == abs(r - row))
            return false;
    }
    return true;
}`,
      java: `boolean isSafe(int row, int col, int[] board) {
    for (int r = 0; r < row; r++) {
        if (board[r] == col || Math.abs(board[r] - col) == Math.abs(r - row))
            return false;
    }
    return true;
}`,
      python: `def is_safe(row, col, board):
    for r in range(row):
        if board[r] == col or abs(board[r] - col) == abs(r - row):
            return False
    return True`
    },
    glossary: [
      { term: 'Pruning', definition: 'Terminating exploration of a branch early as soon as a constraint is violated.' },
      { term: 'State Space Tree', definition: 'Tree representing all candidate configurations explored during backtracking.' }
    ],
    inputRequirement: 'Board dimension N (e.g. 4 for 4x4 chessboard)',
    defaultInput: [4]
  },
  // 11. Activity Selection (Greedy)
  {
    id: 'activity_selection',
    categoryId: 'cat_greedy',
    name: 'Activity Selection (Interval Scheduling)',
    shortDesc: 'Greedily select maximum number of non-overlapping activities by sorting by finish time.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(1)',
      paradigm: 'Greedy Method',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Sorting by start time or shortest duration instead of earliest finish time.',
    kctExamTip: 'Greedy Choice Property: The earliest finishing activity always leaves maximum room for remaining activities.',
    codeSnippets: {
      pseudo: `function activitySelection(start, finish):
  sort activities by finish time
  selected = [activities[0]]
  last_finish = activities[0].finish
  for i from 1 to n - 1:
    if activities[i].start >= last_finish:
      selected.append(activities[i])
      last_finish = activities[i].finish
  return selected`,
      cpp: `vector<int> selectActivities(vector<pair<int, int>>& act) {
    sort(act.begin(), act.end(), [](auto& a, auto& b) { return a.second < b.second; });
    vector<int> res = {0};
    int lastFinish = act[0].second;
    for (int i = 1; i < act.size(); i++) {
        if (act[i].first >= lastFinish) {
            res.push_back(i);
            lastFinish = act[i].second;
        }
    }
    return res;
}`,
      java: `public static List<Integer> selectActivities(int[] start, int[] finish) {
    List<Integer> res = new ArrayList<>();
    res.add(0);
    int lastFinish = finish[0];
    for (int i = 1; i < start.length; i++) {
        if (start[i] >= lastFinish) {
            res.add(i);
            lastFinish = finish[i];
        }
    }
    return res;
}`,
      python: `def activity_selection(start, finish):
    activities = sorted(zip(start, finish), key=lambda x: x[1])
    selected = [activities[0]]
    last_finish = activities[0][1]
    for act in activities[1:]:
        if act[0] >= last_finish:
            selected.append(act)
            last_finish = act[1]
    return selected`
    },
    glossary: [
      { term: 'Interval Scheduling', definition: 'Optimal selection of compatible intervals that do not overlap.' },
      { term: 'Greedy Choice Property', definition: 'A globally optimal choice can be reached by making a locally optimal choice.' }
    ],
    inputRequirement: 'Activity start and finish intervals',
    defaultInput: [1, 3, 0, 5, 8, 5]
  },
  // 12. Euclidean GCD (Number Theory)
  {
    id: 'euclidean_gcd',
    categoryId: 'cat_number_theory',
    name: 'Euclidean GCD Algorithm',
    shortDesc: 'Computes Greatest Common Divisor using modulo arithmetic gcd(a, b) = gcd(b, a % b).',
    complexity: {
      best: 'O(1)',
      average: 'O(log(min(a, b)))',
      worst: 'O(log(min(a, b)))',
      space: 'O(1)',
      paradigm: 'Decrease and Conquer',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Forgetting that gcd(a, 0) = a, and assuming order of arguments matters.',
    kctExamTip: 'Lamé’s Theorem: The number of division steps never exceeds 5 times the number of digits in the smaller number.',
    codeSnippets: {
      pseudo: `function gcd(a, b):
  while b != 0:
    temp = b
    b = a mod b
    a = temp
  return a`,
      cpp: `int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}`,
      java: `public static int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}`,
      python: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a`
    },
    glossary: [
      { term: 'GCD', definition: 'Greatest Common Divisor (Highest Common Factor).' },
      { term: 'Coprime', definition: 'Two numbers having GCD equal to 1.' }
    ],
    inputRequirement: 'Two positive integers [a, b] (e.g. 48, 18)',
    defaultInput: [48, 18]
  },
  // 13. Merge Sort
  {
    id: 'merge_sort',
    categoryId: 'cat_divide_conquer',
    name: 'Merge Sort',
    shortDesc: 'Divide array into halves, recursively sort both, and merge in linear time.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
      paradigm: 'Divide and Conquer',
      stability: 'Stable',
      inPlace: 'No'
    },
    commonMistake: 'Assuming Merge Sort is in-place. Standard array merge requires O(n) auxiliary memory buffer.',
    kctExamTip: 'Recurrence T(n) = 2T(n/2) + Theta(n). Solves to Theta(n log n) by Master Theorem Case 2.',
    codeSnippets: {
      pseudo: `function mergeSort(A, left, right):
  if left < right:
    mid = (left + right) / 2
    mergeSort(A, left, mid)
    mergeSort(A, mid + 1, right)
    merge(A, left, mid, right)`,
      cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}`,
      java: `public static void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        # merge back into arr`
    },
    glossary: [
      { term: 'Divide and Conquer', definition: 'Break problem into smaller subproblems, solve recursively, and combine.' },
      { term: 'Stable Merge', definition: 'Left elements chosen on ties (<=) preserving original relative ordering.' }
    ],
    inputRequirement: 'Array of positive integers',
    defaultInput: [65, 35, 45, 90, 55, 75]
  },
  // 14. Heap Sort
  {
    id: 'heap_sort',
    categoryId: 'cat_sorting',
    name: 'Heap Sort',
    shortDesc: 'Build a Max-Heap, repeatedly swap root with last leaf and heapify.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(1)',
      paradigm: 'Transform and Conquer',
      stability: 'Unstable',
      inPlace: 'Yes'
    },
    commonMistake: 'Thinking building a max heap takes O(n log n). Sifting down nodes bottom-up takes only O(n) total time.',
    kctExamTip: 'Guaranteed O(n log n) upper bound with zero additional memory, but cache locality is worse than Quick Sort.',
    codeSnippets: {
      pseudo: `function heapSort(A):
  buildMaxHeap(A)
  for i from n - 1 down to 1:
    swap(A[0], A[i])
    heapify(A, 0, i)`,
      cpp: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i, l = 2*i + 1, r = 2*i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}`,
      java: `public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
      python: `def heap_sort(arr):
    # Phase 1: Build Max Heap
    # Phase 2: Extract Max elements`
    },
    glossary: [
      { term: 'Max-Heap Property', definition: 'The key at each node is greater than or equal to keys of its children.' },
      { term: 'In-Place Heapify', definition: 'Fixes heap property violations in O(log n) time without auxiliary arrays.' }
    ],
    inputRequirement: 'Array of positive integers',
    defaultInput: [65, 35, 45, 90, 55, 75]
  },
  // 15. Linear Search
  {
    id: 'linear_search',
    categoryId: 'cat_searching',
    name: 'Linear Search',
    shortDesc: 'Sequentially checks each element until a match is found or the array ends.',
    complexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      space: 'O(1)',
      paradigm: 'Sequential Scan',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Searching unsorted data with Binary Search instead of Linear Search.',
    kctExamTip: 'Linear Search is optimal for unordered data or when n is very small.',
    codeSnippets: {
      pseudo: `function linearSearch(A, target):
  for i from 0 to length(A) - 1:
    if A[i] == target: return i
  return -1`,
      cpp: `int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      java: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      python: `def linear_search(arr, target):
    for idx, val in enumerate(arr):
        if val == target: return idx
    return -1`
    },
    glossary: [
      { term: 'Sequential Scan', definition: 'Examines elements one by one from beginning to end.' }
    ],
    inputRequirement: 'Array and target integer',
    defaultInput: [35, 45, 55, 65, 75, 90]
  },
  // 16. Circular Queue
  {
    id: 'circular_queue',
    categoryId: 'cat_ds',
    name: 'Circular Queue (Wraparound)',
    shortDesc: 'Ring buffer data structure that reuses vacated front memory slots using modulo arithmetic.',
    complexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      space: 'O(k)',
      paradigm: 'Modulo Ring Buffer',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Confusing empty (front == -1) and full ((rear + 1) % cap == front) queue conditions.',
    kctExamTip: 'Always cite the pointer update formulas: rear = (rear + 1) % capacity and front = (front + 1) % capacity.',
    codeSnippets: {
      pseudo: `function enqueue(val):
  if (rear + 1) % cap == front: return "Full"
  if front == -1: front = 0
  rear = (rear + 1) % cap
  buffer[rear] = val`,
      cpp: `void enqueue(int val) {
    if ((rear + 1) % capacity == front) return; // Full
    if (front == -1) front = 0;
    rear = (rear + 1) % capacity;
    arr[rear] = val;
}`,
      java: `public void enqueue(int val) {
    if ((rear + 1) % capacity == front) return;
    if (front == -1) front = 0;
    rear = (rear + 1) % capacity;
    arr[rear] = val;
}`,
      python: `def enqueue(self, val):
    if (self.rear + 1) % self.capacity == self.front: return False
    if self.front == -1: self.front = 0
    self.rear = (self.rear + 1) % self.capacity
    self.buffer[self.rear] = val`
    },
    glossary: [
      { term: 'Modulo Wraparound', definition: 'Index cycles from capacity - 1 back to 0 seamlessly.' }
    ],
    inputRequirement: 'Fixed capacity ring buffer',
    defaultInput: [1, 2, 3, 4]
  },
  // 17. Depth-First Search (DFS)
  {
    id: 'graph_dfs',
    categoryId: 'cat_graphs',
    name: 'Depth-First Search (DFS)',
    shortDesc: 'Explores as deep as possible along each branch before backtracking.',
    complexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V)',
      paradigm: 'Backtracking Graph Traversal',
      stability: 'N/A',
      inPlace: 'N/A'
    },
    commonMistake: 'Forgetting visited array leading to infinite loops in cyclic graphs.',
    kctExamTip: 'DFS produces a DFS tree and classifies edges into tree, back, forward, and cross edges.',
    codeSnippets: {
      pseudo: `function DFS(u):
  visited[u] = true
  for neighbor v in adj[u]:
    if not visited[v]: DFS(v)`,
      cpp: `void dfs(int u, vector<vector<int>>& adj, vector<bool>& vis) {
    vis[u] = true;
    for (int v : adj[u]) {
        if (!vis[v]) dfs(v, adj, vis);
    }
}`,
      java: `public static void dfs(int u, List<List<Integer>> adj, boolean[] vis) {
    vis[u] = true;
    for (int v : adj.get(u)) {
        if (!vis[v]) dfs(v, adj, vis);
    }
}`,
      python: `def dfs(u, adj, visited):
    visited.add(u)
    for v in adj[u]:
        if v not in visited:
            dfs(v, adj, visited)`
    },
    glossary: [
      { term: 'Backtracking', definition: 'Returning to previous vertex when all outgoing edges have been explored.' }
    ],
    inputRequirement: 'Graph vertices and adjacency list',
    defaultInput: [1, 2, 3, 4, 5, 6]
  },
  // 18. Dijkstra's Algorithm
  {
    id: 'dijkstra',
    categoryId: 'cat_graphs',
    name: "Dijkstra's Shortest Path",
    shortDesc: 'Greedily extracts minimum distance unsettled vertex and relaxes outgoing edges.',
    complexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)',
      space: 'O(V)',
      paradigm: 'Greedy Method',
      stability: 'N/A',
      inPlace: 'N/A'
    },
    commonMistake: 'Using Dijkstra on graphs with negative edge weights. Negative edges require Bellman-Ford.',
    kctExamTip: 'Triangle Inequality: dist[v] <= dist[u] + weight(u, v). Edge relaxation checks if dist[u] + w < dist[v].',
    codeSnippets: {
      pseudo: `function dijkstra(src):
  dist[all] = inf, dist[src] = 0
  pq.insert({0, src})
  while pq not empty:
    {d, u} = pq.extractMin()
    for {v, w} in adj[u]:
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
        pq.insert({dist[v], v})`,
      cpp: `void dijkstra(int src, vector<vector<pair<int,int>>>& adj, vector<int>& dist) {
    dist[src] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}`,
      java: `// PriorityQueue based Dijkstra`,
      python: `import heapq
def dijkstra(src, adj):
    dist = {node: float('inf') for node in adj}
    dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))`
    },
    glossary: [
      { term: 'Edge Relaxation', definition: 'Updating distance to a vertex if a shorter path through another vertex is discovered.' }
    ],
    inputRequirement: 'Weighted graph with non-negative edge weights',
    defaultInput: [1, 2, 3, 4, 5, 6]
  },
  // 19. Kruskal's Minimum Spanning Tree
  {
    id: 'kruskal_mst',
    categoryId: 'cat_greedy',
    name: "Kruskal's Minimum Spanning Tree",
    shortDesc: 'Sorts all edges by weight and greedily accepts edges that do not form a cycle.',
    complexity: {
      best: 'O(E log E)',
      average: 'O(E log E)',
      worst: 'O(E log E)',
      space: 'O(V)',
      paradigm: 'Greedy with Disjoint Set Union',
      stability: 'N/A',
      inPlace: 'N/A'
    },
    commonMistake: 'Forgetting to check if both endpoints already belong to the same component, causing a cycle.',
    kctExamTip: 'An MST on a connected graph with V vertices always contains exactly V - 1 edges.',
    codeSnippets: {
      pseudo: `function kruskal(edges, V):
  sort edges by weight
  dsu = makeSet(V)
  mst = []
  for (u, v, w) in edges:
    if find(u) != find(v):
      union(u, v)
      mst.append((u, v, w))
  return mst`,
      cpp: `int kruskal(int V, vector<vector<int>>& edges) {
    sort(edges.begin(), edges.end(), [](auto& a, auto& b) { return a[2] < b[2]; });
    DSU dsu(V);
    int totalWeight = 0;
    for (auto& e : edges) {
        if (dsu.find(e[0]) != dsu.find(e[1])) {
            dsu.unite(e[0], e[1]);
            totalWeight += e[2];
        }
    }
    return totalWeight;
}`,
      java: `// Kruskal with DSU`,
      python: `def kruskal(edges, V):
    edges.sort(key=lambda x: x[2])
    dsu = DSU(V)
    mst_weight = 0
    for u, v, w in edges:
        if dsu.find(u) != dsu.find(v):
            dsu.union(u, v)
            mst_weight += w
    return mst_weight`
    },
    glossary: [
      { term: 'Minimum Spanning Tree', definition: 'A tree spanning all vertices with minimal total edge weight.' },
      { term: 'DSU / Union-Find', definition: 'Data structure supporting near-O(1) cycle detection via path compression.' }
    ],
    inputRequirement: 'Connected undirected weighted graph',
    defaultInput: [1, 2, 3, 4, 5, 6]
  },
  // 20. Longest Common Subsequence (LCS)
  {
    id: 'lcs_dp',
    categoryId: 'cat_dp',
    name: 'Longest Common Subsequence (LCS)',
    shortDesc: 'Finds the longest subsequence present in both sequences in identical relative order.',
    complexity: {
      best: 'O(m * n)',
      average: 'O(m * n)',
      worst: 'O(m * n)',
      space: 'O(m * n)',
      paradigm: 'Dynamic Programming',
      stability: 'N/A',
      inPlace: 'N/A'
    },
    commonMistake: 'Confusing substring (contiguous elements) with subsequence (relative order preserved, not necessarily contiguous).',
    kctExamTip: 'Recurrence: if X[i-1] == Y[j-1]: dp[i][j] = 1 + dp[i-1][j-1]. Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
    codeSnippets: {
      pseudo: `function LCS(X, Y):
  for i from 1 to m:
    for j from 1 to n:
      if X[i-1] == Y[j-1]: dp[i][j] = dp[i-1][j-1] + 1
      else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
  return dp[m][n]`,
      cpp: `int lcs(string X, string Y) {
    int m = X.size(), n = Y.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X[i - 1] == Y[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}`,
      java: `public static int lcs(String X, String Y) { /* DP table calculation */ return 0; }`,
      python: `def lcs(X, Y):
    m, n = len(X), len(Y)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if X[i-1] == Y[j-1]: dp[i][j] = 1 + dp[i-1][j-1]
            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`
    },
    glossary: [
      { term: 'Subsequence', definition: 'Sequence derived by deleting zero or more elements without changing relative order.' }
    ],
    inputRequirement: 'Two strings',
    defaultInput: [1, 2, 3, 4]
  },
  // 21. Rat in a Maze
  {
    id: 'rat_in_maze',
    categoryId: 'cat_backtracking',
    name: 'Rat in a Maze',
    shortDesc: 'Backtracking pathfinding from source (0,0) to destination (N-1,N-1) through grid barriers.',
    complexity: {
      best: 'O(4^(N²))',
      average: 'O(4^(N²))',
      worst: 'O(4^(N²))',
      space: 'O(N²)',
      paradigm: 'Backtracking Grid Search',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Not marking visited cells causing infinite back-and-forth loops.',
    kctExamTip: 'Backtracking step: When all 4 directions fail, unmark the cell before returning false.',
    codeSnippets: {
      pseudo: `function solveMaze(r, c):
  if r == n-1 and c == n-1: return true
  for (dr, dc) in directions:
    if isSafe(r+dr, c+dc):
      markVisited()
      if solveMaze(r+dr, c+dc): return true
      unmark() // Backtrack
  return false`,
      cpp: `bool solveMaze(int r, int c, vector<vector<int>>& maze, vector<vector<int>>& sol) {
    if (r == N - 1 && c == N - 1) { sol[r][c] = 1; return true; }
    if (isSafe(r, c, maze)) {
        sol[r][c] = 1;
        if (solveMaze(r + 1, c, maze, sol)) return true;
        if (solveMaze(r, c + 1, maze, sol)) return true;
        sol[r][c] = 0; // Backtrack
    }
    return false;
}`,
      java: `// Rat in Maze solution`,
      python: `def solve_maze(r, c, maze, sol):
    # Backtracking search
    pass`
    },
    glossary: [
      { term: 'Grid Backtracking', definition: 'Exploration with state undoing upon reaching dead ends.' }
    ],
    inputRequirement: 'Grid dimensions N',
    defaultInput: [4]
  },
  // 22. Asymptotic Growth Comparator (Unit 01: Analysis & Correctness)
  {
    id: 'asymptotic_growth',
    categoryId: 'cat_analysis',
    name: 'Asymptotic Growth Comparator (Big-O)',
    shortDesc: 'Compares growth rates of O(1), O(log n), O(n), O(n log n), O(n²), and O(2ⁿ) as problem size scales.',
    complexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      space: 'O(1)',
      paradigm: 'Mathematical Order Analysis',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Thinking O(n log n) is worse than O(n²). For large n, n log n is drastically faster than n².',
    kctExamTip: 'Strict hierarchy: O(1) ⊂ O(log n) ⊂ O(n) ⊂ O(n log n) ⊂ O(n²) ⊂ O(n³) ⊂ O(2ⁿ) ⊂ O(n!).',
    codeSnippets: {
      pseudo: `function compareGrowth(n):
  return {
    constant: 1,
    logarithmic: log2(n),
    linear: n,
    linearithmic: n * log2(n),
    quadratic: n * n,
    exponential: 2^n
  }`,
      cpp: `struct ComplexitySample {
    double logN, N, nLogN, nSquared, twoPowerN;
    static ComplexitySample at(int n) {
        return { log2(n), (double)n, n * log2(n), (double)(n*n), pow(2, n) };
    }
};`,
      java: `public class GrowthRates {
    public static void printHierarchy(int n) {
        System.out.println("O(log n) = " + (Math.log(n)/Math.log(2)));
        System.out.println("O(n log n) = " + (n * Math.log(n)/Math.log(2)));
    }
}`,
      python: `import math
def growth_rates(n):
    return {
        "log_n": math.log2(n),
        "n": n,
        "n_log_n": n * math.log2(n),
        "n_sq": n**2,
        "exp": 2**n
    }`
    },
    glossary: [
      { term: 'Big-O (O)', definition: 'Asymptotic upper bound: f(n) <= c · g(n) for all n >= n0.' },
      { term: 'Big-Omega (Ω)', definition: 'Asymptotic lower bound: f(n) >= c · g(n) for all n >= n0.' },
      { term: 'Big-Theta (Θ)', definition: 'Asymptotically tight bound: c1·g(n) <= f(n) <= c2·g(n).' }
    ],
    inputRequirement: 'Input scale array n values [1, 2, 4, 8, 16]',
    defaultInput: [1, 2, 4, 8, 16]
  },
  // 23. Master Theorem Recurrence Solver (Unit 01: Analysis)
  {
    id: 'master_theorem_sim',
    categoryId: 'cat_analysis',
    name: 'Master Theorem Recurrence Solver',
    shortDesc: 'Automated solver for divide-and-conquer recurrences T(n) = a·T(n/b) + f(n).',
    complexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      space: 'O(1)',
      paradigm: 'Recurrence Equation Analysis',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Applying Master Theorem when b <= 1, a < 1, or f(n) is not polynomial (e.g. 2^n).',
    kctExamTip: 'Case 1: log_b(a) > d => Θ(n^(log_b a)). Case 2: log_b(a) == d => Θ(n^d · log n). Case 3: log_b(a) < d => Θ(f(n)).',
    codeSnippets: {
      pseudo: `function solveMasterTheorem(a, b, d):
  crit = log_b(a)
  if crit > d: return "Theta(n^" + crit + ")"
  else if crit == d: return "Theta(n^" + d + " * log n)"
  else: return "Theta(n^" + d + ")"`,
      cpp: `string solveMaster(double a, double b, double d) {
    double crit = log(a) / log(b);
    if (abs(crit - d) < 1e-6) return "Theta(n^" + to_string((int)d) + " log n)";
    if (crit > d) return "Theta(n^" + to_string(crit) + ")";
    return "Theta(n^" + to_string((int)d) + ")";
}`,
      java: `public static String solveMaster(double a, double b, double d) {
    double crit = Math.log(a) / Math.log(b);
    if (Math.abs(crit - d) < 1e-5) return "Theta(n^" + d + " log n)";
    return crit > d ? "Theta(n^" + crit + ")" : "Theta(n^" + d + ")";
}`,
      python: `import math
def master_theorem(a, b, d):
    crit = math.log(a, b)
    if math.isclose(crit, d): return f"Theta(n^{d} log n)"
    elif crit > d: return f"Theta(n^{crit:.2f})"
    else: return f"Theta(n^{d})"`
    },
    glossary: [
      { term: 'Critical Exponent', definition: 'log_b(a): The watershed exponent separating leaf-heavy and root-heavy recurrences.' }
    ],
    inputRequirement: 'Parameters a, b, d for recurrence T(n) = a·T(n/b) + Θ(n^d)',
    defaultInput: [2, 2, 1]
  },
  // 24. Karatsuba Multiplication (Unit 02: Divide & Conquer)
  {
    id: 'karatsuba_mult',
    categoryId: 'cat_divide_conquer',
    name: 'Karatsuba Fast Multiplication',
    shortDesc: 'Multiplies large integers in O(n^1.585) using 3 recursive multiplications instead of 4.',
    complexity: {
      best: 'O(n^1.585)',
      average: 'O(n^1.585)',
      worst: 'O(n^1.585)',
      space: 'O(n)',
      paradigm: 'Divide and Conquer',
      stability: 'N/A',
      inPlace: 'No'
    },
    commonMistake: 'Assuming standard grade-school multiplication O(n²) cannot be asymptotically beaten.',
    kctExamTip: 'Karatsuba recurrence: T(n) = 3T(n/2) + O(n). By Master Theorem: a=3, b=2 => log_2(3) ≈ 1.585.',
    codeSnippets: {
      pseudo: `function karatsuba(x, y):
  if x < 10 or y < 10: return x * y
  m = max(len(x), len(y)) / 2
  a, b = split(x, m)
  c, d = split(y, m)
  z0 = karatsuba(b, d)
  z2 = karatsuba(a, c)
  z1 = karatsuba(a + b, c + d) - z2 - z0
  return z2 * 10^(2m) + z1 * 10^m + z0`,
      cpp: `long long karatsuba(long long x, long long y) {
    if (x < 10 || y < 10) return x * y;
    int n = to_string(max(x, y)).length();
    int m = n / 2;
    long long base = pow(10, m);
    long long a = x / base, b = x % base;
    long long c = y / base, d = y % base;
    long long z0 = karatsuba(b, d);
    long long z2 = karatsuba(a, c);
    long long z1 = karatsuba(a + b, c + d) - z2 - z0;
    return z2 * pow(10, 2*m) + z1 * base + z0;
}`,
      java: `public static long karatsuba(long x, long y) {
    if (x < 10 || y < 10) return x * y;
    int m = Math.max(String.valueOf(x).length(), String.valueOf(y).length()) / 2;
    long base = (long) Math.pow(10, m);
    long a = x / base, b = x % base, c = y / base, d = y % base;
    long z0 = karatsuba(b, d), z2 = karatsuba(a, c);
    long z1 = karatsuba(a + b, c + d) - z2 - z0;
    return z2 * (long)Math.pow(10, 2 * m) + z1 * base + z0;
}`,
      python: `def karatsuba(x, y):
    if x < 10 or y < 10: return x * y
    m = max(len(str(x)), len(str(y))) // 2
    base = 10**m
    a, b = divmod(x, base)
    c, d = divmod(y, base)
    z0 = karatsuba(b, d)
    z2 = karatsuba(a, c)
    z1 = karatsuba(a + b, c + d) - z2 - z0
    return z2 * 10**(2*m) + z1 * base + z0`
    },
    glossary: [
      { term: 'Sub-quadratic multiplication', definition: 'Beating O(n²) integer multiplication using algebraic identity.' }
    ],
    inputRequirement: 'Two multi-digit integers [X, Y]',
    defaultInput: [1234, 5678]
  },
  // 25. Closest Pair of Points (Unit 02: Divide & Conquer)
  {
    id: 'closest_pair',
    categoryId: 'cat_divide_conquer',
    name: 'Closest Pair of 2D Points',
    shortDesc: 'Finds two closest points in a plane in O(n log n) by dividing along a vertical strip.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
      paradigm: 'Divide and Conquer',
      stability: 'N/A',
      inPlace: 'No'
    },
    commonMistake: 'Checking all pairs in the strip in O(n²). Only 7 subsequent points in sorted y order need testing!',
    kctExamTip: 'Geometric packing argument: Within a d × 2d rectangle, at most 8 points can exist without violating minimum distance d.',
    codeSnippets: {
      pseudo: `function closestPair(P):
  sort P by X
  divide into Left and Right
  d = min(closest(Left), closest(Right))
  strip = points within d of midline
  sort strip by Y
  for each p in strip:
    check next 7 points for dist < d`,
      cpp: `double closestPair(vector<Point>& P) {
    sort(P.begin(), P.end(), [](auto& a, auto& b) { return a.x < b.x; });
    return closestUtil(P, 0, P.size() - 1);
}`,
      java: `// Divide and Conquer Closest Pair`,
      python: `def closest_pair(points):
    points.sort(key=lambda p: p[0])
    # Recursive divide and 7-neighbor strip check`
    },
    glossary: [
      { term: 'Strip Optimization', definition: 'Restricting cross-boundary distance queries to a 2d boundary band.' }
    ],
    inputRequirement: '2D Cartesian coordinates',
    defaultInput: [2, 12, 40, 5, 12, 3]
  },
  // 26. Fractional Knapsack (Unit 03: Design Techniques)
  {
    id: 'fractional_knapsack',
    categoryId: 'cat_design_tech',
    name: 'Fractional Knapsack Problem',
    shortDesc: 'Greedily takes items by highest value/weight ratio with ability to cut fractional portions.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(1)',
      paradigm: 'Greedy Method',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Confusing 0/1 Knapsack with Fractional Knapsack. Fractional CAN be solved with Greedy; 0/1 CANNOT!',
    kctExamTip: 'Always cite Greedy Choice Property: Taking the item with highest value density is provably optimal.',
    codeSnippets: {
      pseudo: `function fractionalKnapsack(items, W):
  sort items by (value / weight) descending
  totalVal = 0
  for item in items:
    if W >= item.weight:
      totalVal += item.value
      W -= item.weight
    else:
      totalVal += item.value * (W / item.weight)
      break
  return totalVal`,
      cpp: `double fractionalKnapsack(int W, vector<Item>& items) {
    sort(items.begin(), items.end(), [](auto& a, auto& b) {
        return (double)a.val / a.wt > (double)b.val / b.wt;
    });
    double totalVal = 0.0;
    for (auto& item : items) {
        if (W >= item.wt) { totalVal += item.val; W -= item.wt; }
        else { totalVal += item.val * ((double)W / item.wt); break; }
    }
    return totalVal;
}`,
      java: `// Fractional Knapsack Greedy implementation`,
      python: `def fractional_knapsack(items, W):
    items.sort(key=lambda x: x['val']/x['wt'], reverse=True)
    total_val = 0.0
    for it in items:
        if W >= it['wt']: total_val += it['val']; W -= it['wt']
        else: total_val += it['val'] * (W / it['wt']); break
    return total_val`
    },
    glossary: [
      { term: 'Value Density', definition: 'The ratio value / weight; metric for greedy priority.' }
    ],
    inputRequirement: 'Item weights, values, and total capacity',
    defaultInput: [10, 20, 30]
  },
  // 27. Huffman Coding (Unit 03: Design Techniques)
  {
    id: 'huffman_coding',
    categoryId: 'cat_design_tech',
    name: 'Huffman Optimal Prefix Code',
    shortDesc: 'Constructs an optimal prefix tree for lossless data compression based on character frequencies.',
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
      paradigm: 'Greedy Priority Queue',
      stability: 'N/A',
      inPlace: 'No'
    },
    commonMistake: 'Using fixed-length binary codes for variable frequency data, wasting bandwidth.',
    kctExamTip: 'Huffman codes satisfy the Prefix Rule: No valid code word is a prefix of any other code word.',
    codeSnippets: {
      pseudo: `function buildHuffmanTree(freqs):
  pq = PriorityQueue(freqs)
  while pq.size() > 1:
    left = pq.extractMin()
    right = pq.extractMin()
    merged = Node(left.freq + right.freq, left, right)
    pq.insert(merged)
  return pq.extractMin()`,
      cpp: `Node* buildHuffman(const vector<pair<char, int>>& freqs) {
    priority_queue<Node*, vector<Node*>, Compare> pq;
    for (auto& f : freqs) pq.push(new Node(f.first, f.second));
    while (pq.size() > 1) {
        auto l = pq.top(); pq.pop();
        auto r = pq.top(); pq.pop();
        pq.push(new Node('$', l->freq + r->freq, l, r));
    }
    return pq.top();
}`,
      java: `// Huffman PriorityQueue Tree`,
      python: `import heapq
def huffman_tree(freqs):
    heap = [[wt, [sym, ""]] for sym, wt in freqs.items()]
    heapq.heapify(heap)
    # Merge two lowest frequencies repeatedly`
    },
    glossary: [
      { term: 'Prefix Code', definition: 'Code system where no codeword is a prefix of another, enabling instant greedy parsing.' }
    ],
    inputRequirement: 'Character frequency distribution array',
    defaultInput: [45, 13, 12, 16, 9, 5]
  },
  // 28. Vertex Cover 2-Approximation (Unit 04: Complexity & NP)
  {
    id: 'vertex_cover_approx',
    categoryId: 'cat_complexity',
    name: 'Vertex Cover 2-Approximation',
    shortDesc: 'Polynomial-time approximation algorithm guaranteeing cover size <= 2 × OPT for NP-Hard problem.',
    complexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
      space: 'O(V)',
      paradigm: 'Greedy Maximal Matching',
      stability: 'N/A',
      inPlace: 'No'
    },
    commonMistake: 'Thinking all NP-Hard problems have no practical algorithms. Approximation algorithms provide provable bounds.',
    kctExamTip: 'Proof of 2-approximation: Picked edges form a matching M. No two edges in M share a vertex, so OPT >= |M|. We pick 2|M| vertices, so |C| = 2|M| <= 2·OPT.',
    codeSnippets: {
      pseudo: `function approxVertexCover(G):
  C = empty set
  E_copy = copy of edges in G
  while E_copy is not empty:
    pick arbitrary edge (u, v) in E_copy
    C.add(u)
    C.add(v)
    remove all edges incident to u or v from E_copy
  return C`,
      cpp: `vector<int> approxVertexCover(int V, const vector<pair<int,int>>& edges) {
    vector<bool> visited(V, false);
    vector<int> cover;
    for (auto& [u, v] : edges) {
        if (!visited[u] && !visited[v]) {
            visited[u] = true;
            visited[v] = true;
            cover.push_back(u);
            cover.push_back(v);
        }
    }
    return cover;
}`,
      java: `// 2-Approximation for Vertex Cover`,
      python: `def approx_vertex_cover(edges):
    cover = set()
    for u, v in edges:
        if u not in cover and v not in cover:
            cover.add(u)
            cover.add(v)
    return cover`
    },
    glossary: [
      { term: 'Approximation Ratio (ρ)', definition: 'Cost(Approximation) / Cost(OPT) <= ρ (here ρ = 2).' }
    ],
    inputRequirement: 'Graph vertices and edges',
    defaultInput: [5, 6]
  },
  // 29. Traveling Salesperson Problem (Unit 04: Complexity)
  {
    id: 'tsp_held_karp',
    categoryId: 'cat_complexity',
    name: 'Traveling Salesperson Problem (TSP)',
    shortDesc: 'Finds optimal minimum Hamiltonian cycle. Solved via Held-Karp dynamic programming in O(n² · 2ⁿ).',
    complexity: {
      best: 'O(n² · 2ⁿ)',
      average: 'O(n² · 2ⁿ)',
      worst: 'O(n² · 2ⁿ)',
      space: 'O(n · 2ⁿ)',
      paradigm: 'NP-Hard Dynamic Programming / 2-Opt',
      stability: 'N/A',
      inPlace: 'No'
    },
    commonMistake: 'Attempting brute force O(n!) for n > 15. Held-Karp reduces n=20 from 2.4×10¹⁸ operations to 4×10⁸ operations.',
    kctExamTip: 'Metric TSP with Triangle Inequality admits a 2-approximation using MST preorder traversal.',
    codeSnippets: {
      pseudo: `function heldKarp(dist, n):
  dp[mask][u] = min cost to visit subset 'mask' ending at 'u'
  for mask from 1 to 2^n - 1:
    for u in mask:
      for v not in mask:
        dp[mask | (1 << v)][v] = min(dp[mask][u] + dist[u][v])
  return min over u of (dp[(1<<n)-1][u] + dist[u][0])`,
      cpp: `int tsp(int mask, int pos, int n, const vector<vector<int>>& dist, vector<vector<int>>& dp) {
    if (mask == (1 << n) - 1) return dist[pos][0];
    if (dp[mask][pos] != -1) return dp[mask][pos];
    int ans = 1e9;
    for (int nxt = 0; nxt < n; nxt++) {
        if ((mask & (1 << nxt)) == 0)
            ans = min(ans, dist[pos][nxt] + tsp(mask | (1 << nxt), nxt, n, dist, dp));
    }
    return dp[mask][pos] = ans;
}`,
      java: `// Held-Karp O(n^2 2^n) TSP`,
      python: `def tsp(mask, u, n, dist, memo):
    if mask == (1 << n) - 1: return dist[u][0]
    # Bitmask DP memoization`
    },
    glossary: [
      { term: 'Hamiltonian Cycle', definition: 'A closed loop that visits each vertex of a graph exactly once.' }
    ],
    inputRequirement: 'Distance matrix for cities',
    defaultInput: [4]
  },
  // 30. QuickSelect (Unit 05: DAA Extensions)
  {
    id: 'quick_select',
    categoryId: 'cat_extensions',
    name: "QuickSelect (Hoare's Selection)",
    shortDesc: 'Finds the k-th smallest element in an unordered list in O(n) average time without full sorting.',
    complexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n²)',
      space: 'O(1)',
      paradigm: 'Prune and Search (Decrease & Conquer)',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Sorting the array in O(n log n) when only the k-th order statistic is needed.',
    kctExamTip: 'Recurrence: T(n) = T(n/2) + O(n). Solves to T(n) = O(n) because n + n/2 + n/4 + ... <= 2n.',
    codeSnippets: {
      pseudo: `function quickSelect(A, low, high, k):
  p = partition(A, low, high)
  if p == k: return A[p]
  else if p > k: return quickSelect(A, low, p - 1, k)
  else: return quickSelect(A, p + 1, high, k)`,
      cpp: `int quickSelect(vector<int>& arr, int l, int r, int k) {
    int p = partition(arr, l, r);
    if (p == k) return arr[p];
    if (p > k) return quickSelect(arr, l, p - 1, k);
    return quickSelect(arr, p + 1, r, k);
}`,
      java: `public static int quickSelect(int[] arr, int l, int r, int k) {
    int p = partition(arr, l, r);
    if (p == k) return arr[p];
    return p > k ? quickSelect(arr, l, p - 1, k) : quickSelect(arr, p + 1, r, k);
}`,
      python: `def quick_select(arr, l, r, k):
    p = partition(arr, l, r)
    if p == k: return arr[p]
    elif p > k: return quick_select(arr, l, p - 1, k)
    else: return quick_select(arr, p + 1, r, k)`
    },
    glossary: [
      { term: 'Order Statistic', definition: 'The k-th smallest element in a statistical dataset.' }
    ],
    inputRequirement: 'Unsorted array of integers and target rank k',
    defaultInput: [65, 35, 45, 90, 55, 75]
  },
  // 31. Dynamic Array Doubling (Unit 05: DAA Extensions)
  {
    id: 'dynamic_array_amortized',
    categoryId: 'cat_extensions',
    name: 'Dynamic Array Doubling (Amortized O(1))',
    shortDesc: 'Demonstrates amortized analysis via aggregate and potential methods for geometric array resizing.',
    complexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(n)',
      space: 'O(n)',
      paradigm: 'Amortized Analysis (Potential / Banker Method)',
      stability: 'N/A',
      inPlace: 'No'
    },
    commonMistake: 'Assuming single-operation worst case O(n) means the average cost per insert is O(n).',
    kctExamTip: 'Amortized Cost: Total cost of n operations divided by n is strictly O(1) when capacity doubles.',
    codeSnippets: {
      pseudo: `function push_back(val):
  if size == capacity:
    allocate new array of 2 * capacity
    copy old elements
    capacity = 2 * capacity
  arr[size] = val
  size++`,
      cpp: `void pushBack(int val) {
    if (size == capacity) {
        capacity *= 2;
        int* newArr = new int[capacity];
        for (int i = 0; i < size; i++) newArr[i] = arr[i];
        delete[] arr;
        arr = newArr;
    }
    arr[size++] = val;
}`,
      java: `// ArrayList dynamic resize amortized demonstration`,
      python: `def append_amortized(val):
    # Potential function Phi = 2 * size - capacity
    pass`
    },
    glossary: [
      { term: 'Amortized Time', definition: 'Average running time per operation over a worst-case sequence of operations.' }
    ],
    inputRequirement: 'Sequence of insert elements',
    defaultInput: [10, 20, 30, 40, 50, 60, 70, 80, 90]
  },
  // 32. Knuth-Morris-Pratt (KMP) (Unit 11: Strings)
  {
    id: 'kmp_string_match',
    categoryId: 'cat_strings',
    name: 'Knuth-Morris-Pratt (KMP) Search',
    shortDesc: 'Linear time string matching O(n + m) utilizing precomputed longest prefix-suffix (π-table).',
    complexity: {
      best: 'O(n)',
      average: 'O(n + m)',
      worst: 'O(n + m)',
      space: 'O(m)',
      paradigm: 'Prefix Automaton Preprocessing',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Backtracking the text pointer upon a mismatch. In KMP, the text pointer i NEVER moves backward!',
    kctExamTip: 'KMP achieves deterministic linear time because the text index i is monotonically non-decreasing.',
    codeSnippets: {
      pseudo: `function KMP(text, pattern):
  lps = computeLPS(pattern)
  i = 0, j = 0
  while i < len(text):
    if text[i] == pattern[j]: i++, j++
    if j == len(pattern):
      recordMatch(i - j)
      j = lps[j - 1]
    else if i < len(text) and text[i] != pattern[j]:
      if j != 0: j = lps[j - 1]
      else: i++`,
      cpp: `void KMPSearch(string pat, string txt) {
    int m = pat.size(), n = txt.size();
    vector<int> lps(m, 0);
    computeLPS(pat, m, lps);
    int i = 0, j = 0;
    while (i < n) {
        if (pat[j] == txt[i]) { i++; j++; }
        if (j == m) { cout << "Found at " << i - j << endl; j = lps[j - 1]; }
        else if (i < n && pat[j] != txt[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
}`,
      java: `// KMP pattern search`,
      python: `def kmp_search(text, pattern):
    lps = compute_lps(pattern)
    i = j = 0
    while i < len(text):
        if text[i] == pattern[j]: i += 1; j += 1
        if j == len(pattern): return i - j
        elif i < len(text) and text[i] != pattern[j]:
            j = lps[j - 1] if j != 0 else 0
            if j == 0: i += 1`
    },
    glossary: [
      { term: 'LPS Array (π-table)', definition: 'Precomputed array storing the length of the longest proper prefix that is also a suffix.' }
    ],
    inputRequirement: 'Target text and search pattern',
    defaultInput: [1, 2, 3, 4]
  },
  // 33. Rabin-Karp Rolling Hash (Unit 11: Strings)
  {
    id: 'rabin_karp',
    categoryId: 'cat_strings',
    name: 'Rabin-Karp Rolling Hash Search',
    shortDesc: 'String search using rolling polynomial hash to achieve O(n + m) expected running time.',
    complexity: {
      best: 'O(n + m)',
      average: 'O(n + m)',
      worst: 'O(n · m)',
      space: 'O(1)',
      paradigm: 'Rolling Hash / Modular Arithmetic',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Recomputing hash of each window from scratch in O(m). Rolling hash updates in O(1) arithmetic operations!',
    kctExamTip: 'Spurious Hits: When hash values match due to modulo collision, verify characters character-by-character.',
    codeSnippets: {
      pseudo: `function rabinKarp(text, pattern, prime):
  pHash = hash(pattern)
  tHash = hash(text[0..m-1])
  for i from 0 to n - m:
    if pHash == tHash and text[i..i+m-1] == pattern:
      return i
    tHash = rollHash(tHash, text[i], text[i+m])`,
      cpp: `int rabinKarp(string txt, string pat, int q = 101) {
    int d = 256, m = pat.size(), n = txt.size();
    int p = 0, t = 0, h = 1;
    for (int i = 0; i < m - 1; i++) h = (h * d) % q;
    for (int i = 0; i < m; i++) {
        p = (d * p + pat[i]) % q;
        t = (d * t + txt[i]) % q;
    }
    for (int i = 0; i <= n - m; i++) {
        if (p == t && txt.substr(i, m) == pat) return i;
        if (i < n - m) {
            t = (d * (t - txt[i] * h) + txt[i + m]) % q;
            if (t < 0) t += q;
        }
    }
    return -1;
}`,
      java: `// Rabin-Karp rolling hash`,
      python: `def rabin_karp(text, pattern):
    # Rolling hash implementation
    pass`
    },
    glossary: [
      { term: 'Rolling Hash', definition: 'Hash function enabling update of window hash in O(1) time without re-examining internal characters.' }
    ],
    inputRequirement: 'Target text and search pattern',
    defaultInput: [1, 2, 3, 4]
  },
  // 34. Sieve of Eratosthenes (Unit 12: Number Theory)
  {
    id: 'sieve_eratosthenes',
    categoryId: 'cat_number_theory',
    name: 'Sieve of Eratosthenes (Primes)',
    shortDesc: 'Ancient algorithm generating all prime numbers up to N in near-linear O(N log log N) time.',
    complexity: {
      best: 'O(N log log N)',
      average: 'O(N log log N)',
      worst: 'O(N log log N)',
      space: 'O(N)',
      paradigm: 'Multiplicative Elimination',
      stability: 'N/A',
      inPlace: 'No'
    },
    commonMistake: 'Checking multiples starting at 2p. You can start striking out at p² because smaller multiples are already eliminated.',
    kctExamTip: 'Sum of reciprocals of primes: Sum_{p <= n} 1/p = Θ(log log n). Hence total time is O(n log log n).',
    codeSnippets: {
      pseudo: `function sieve(n):
  prime = array of size n+1 filled with true
  prime[0] = prime[1] = false
  for p from 2 to sqrt(n):
    if prime[p]:
      for i from p*p to n step p:
        prime[i] = false
  return prime`,
      cpp: `vector<int> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (int i = p * p; i <= n; i += p) isPrime[i] = false;
        }
    }
    vector<int> primes;
    for (int i = 2; i <= n; i++) if (isPrime[i]) primes.push_back(i);
    return primes;
}`,
      java: `// Sieve of Eratosthenes`,
      python: `def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for p in range(2, int(n**0.5) + 1):
        if is_prime[p]:
            for i in range(p*p, n + 1, p): is_prime[i] = False
    return [i for i, p in enumerate(is_prime) if p]`
    },
    glossary: [
      { term: 'Prime Sieve', definition: 'Technique that identifies primes by systematically eliminating composite multiples.' }
    ],
    inputRequirement: 'Upper limit integer N',
    defaultInput: [20]
  },
  // 35. Number of Connected Islands (Unit 15: Matrix / Grid)
  {
    id: 'flood_fill_islands',
    categoryId: 'cat_matrix',
    name: 'Number of Connected Islands (Flood Fill)',
    shortDesc: 'Grid pathfinding traversal counting disjoint 4-directionally connected land components.',
    complexity: {
      best: 'O(M × N)',
      average: 'O(M × N)',
      worst: 'O(M × N)',
      space: 'O(min(M, N))',
      paradigm: 'Grid Breadth-First Search / Flood Fill',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Forgetting 4-way boundary checks (0 <= r < M and 0 <= c < N) causing index out of bounds.',
    kctExamTip: 'Flood Fill can mutate the grid in-place (changing 1s to 0s or 2s) to achieve O(1) auxiliary space beyond recursion/queue.',
    codeSnippets: {
      pseudo: `function countIslands(grid):
  count = 0
  for r from 0 to M-1:
    for c from 0 to N-1:
      if grid[r][c] == 1:
        count++
        floodFillBFS(r, c)
  return count`,
      cpp: `int numIslands(vector<vector<char>>& grid) {
    int m = grid.size(), n = grid[0].size(), count = 0;
    for (int r = 0; r < m; r++) {
        for (int c = 0; c < n; c++) {
            if (grid[r][c] == '1') {
                count++;
                bfs(grid, r, c);
            }
        }
    }
    return count;
}`,
      java: `// Grid BFS Islands`,
      python: `def num_islands(grid):
    # Flood Fill Breadth-First Search
    pass`
    },
    glossary: [
      { term: 'Connected Component', definition: 'Sub-grid where every cell is reachable from any other cell via valid land moves.' }
    ],
    inputRequirement: 'Binary 2D grid matrix',
    defaultInput: [4, 5]
  },
  // 36. Spiral Matrix Traversal (Unit 15: Matrix / Grid)
  {
    id: 'spiral_matrix',
    categoryId: 'cat_matrix',
    name: 'Spiral Matrix Traversal',
    shortDesc: 'Clockwise perimeter spiral navigation peeling outer boundary layers inward in O(M × N).',
    complexity: {
      best: 'O(M × N)',
      average: 'O(M × N)',
      worst: 'O(M × N)',
      space: 'O(1)',
      paradigm: 'Layer-by-Layer Boundary Shrinking',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Failing to check top <= bottom or left <= right before reverse sweeps, printing duplicate rows.',
    kctExamTip: 'Maintain 4 boundary pointers: top, bottom, left, right, and increment/decrement after every directional pass.',
    codeSnippets: {
      pseudo: `function spiralOrder(matrix):
  top = 0, bottom = M - 1, left = 0, right = N - 1
  while top <= bottom and left <= right:
    sweepRight(top, left, right); top++
    sweepDown(right, top, bottom); right--
    if top <= bottom: sweepLeft(bottom, right, left); bottom--
    if left <= right: sweepUp(left, bottom, top); left++`,
      cpp: `vector<int> spiralOrder(vector<vector<int>>& mat) {
    vector<int> res;
    int top = 0, bottom = mat.size() - 1, left = 0, right = mat[0].size() - 1;
    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) res.push_back(mat[top][c]);
        top++;
        for (int r = top; r <= bottom; r++) res.push_back(mat[r][right]);
        right--;
        if (top <= bottom) { for (int c = right; c >= left; c--) res.push_back(mat[bottom][c]); bottom--; }
        if (left <= right) { for (int r = bottom; r >= top; r--) res.push_back(mat[r][left]); left++; }
    }
    return res;
}`,
      java: `// Spiral matrix traversal`,
      python: `def spiral_order(matrix):
    res = []
    # Peel outer layers clockwise
    return res`
    },
    glossary: [
      { term: 'Perimeter Peeling', definition: 'Processing outer grid perimeter and shrinking boundaries until matrix is exhausted.' }
    ],
    inputRequirement: '2D matrix dimensions',
    defaultInput: [4, 4]
  },
  // 37. Minimax with Alpha-Beta Pruning (Unit 16: Games)
  {
    id: 'minimax_alphabeta',
    categoryId: 'cat_games',
    name: 'Minimax with Alpha-Beta Pruning',
    shortDesc: 'Adversarial decision game tree search pruning provably sub-optimal branches via alpha-beta bounds.',
    complexity: {
      best: 'O(b^(d/2))',
      average: 'O(b^(3d/4))',
      worst: 'O(b^d)',
      space: 'O(d)',
      paradigm: 'Adversarial Game Tree Search',
      stability: 'N/A',
      inPlace: 'No'
    },
    commonMistake: 'Assuming alpha-beta pruning changes the computed move. The outcome is 100% IDENTICAL to plain Minimax, just faster!',
    kctExamTip: 'Alpha-Beta Condition: Prune (cutoff) when alpha >= beta. Alpha is best MAX score; Beta is best MIN score.',
    codeSnippets: {
      pseudo: `function alphaBeta(node, depth, alpha, beta, isMax):
  if depth == 0 or node.isTerminal(): return node.val
  if isMax:
    maxEval = -inf
    for child in node.children:
      eval = alphaBeta(child, depth-1, alpha, beta, false)
      maxEval = max(maxEval, eval)
      alpha = max(alpha, eval)
      if beta <= alpha: break // Prune!
    return maxEval
  else:
    minEval = +inf
    for child in node.children:
      eval = alphaBeta(child, depth-1, alpha, beta, true)
      minEval = min(minEval, eval)
      beta = min(beta, eval)
      if beta <= alpha: break // Prune!
    return minEval`,
      cpp: `int alphabeta(Node* node, int d, int alpha, int beta, bool isMax) {
    if (d == 0 || node->isLeaf()) return node->val;
    if (isMax) {
        int maxE = -1e9;
        for (auto c : node->children) {
            maxE = max(maxE, alphabeta(c, d - 1, alpha, beta, false));
            alpha = max(alpha, maxE);
            if (beta <= alpha) break; // Cutoff
        }
        return maxE;
    } else {
        int minE = 1e9;
        for (auto c : node->children) {
            minE = min(minE, alphabeta(c, d - 1, alpha, beta, true));
            beta = min(beta, minE);
            if (beta <= alpha) break; // Cutoff
        }
        return minE;
    }
}`,
      java: `// Minimax Alpha-Beta Pruning`,
      python: `def alphabeta(node, depth, alpha, beta, is_max):
    if depth == 0 or node.is_leaf(): return node.val
    # Alpha-Beta branch pruning`
    },
    glossary: [
      { term: 'Alpha Bound', definition: 'The highest value that the MAX player is guaranteed to achieve so far.' },
      { term: 'Beta Bound', definition: 'The lowest value that the MIN player is guaranteed to achieve so far.' }
    ],
    inputRequirement: 'Leaf evaluation payoffs',
    defaultInput: [3, 5, 6, 9]
  },
  // 38. Game of Nim (Unit 16: Games)
  {
    id: 'game_of_nim',
    categoryId: 'cat_games',
    name: "Game of Nim (Bouton's Theorem)",
    shortDesc: 'Impartial combinatorial game solved via Sprague-Grundy theorem and bitwise XOR Nim-Sum.',
    complexity: {
      best: 'O(k)',
      average: 'O(k)',
      worst: 'O(k)',
      space: 'O(1)',
      paradigm: "Sprague-Grundy Theorem / Bouton's Nim-Sum",
      stability: 'N/A',
      inPlace: 'Yes'
    },
    commonMistake: 'Thinking Nim requires exploring game trees. Bouton proved in 1901 that XOR sum determines win in O(k)!',
    kctExamTip: 'Winning Position (N-position): Nim-Sum != 0 (Player 1 can force win). Losing Position (P-position): Nim-Sum == 0.',
    codeSnippets: {
      pseudo: `function solveNim(heaps):
  nimSum = heaps[0] XOR heaps[1] XOR ... XOR heaps[k-1]
  if nimSum != 0: return "First Player (P1) Wins"
  else: return "Second Player (P2) Wins"`,
      cpp: `bool isWinningNim(const vector<int>& heaps) {
    int nimSum = 0;
    for (int h : heaps) nimSum ^= h;
    return nimSum != 0;
}`,
      java: `public static boolean isWinning(int[] heaps) {
    int nimSum = 0;
    for (int h : heaps) nimSum ^= h;
    return nimSum != 0;
}`,
      python: `def solve_nim(heaps):
    nim_sum = 0
    for h in heaps: nim_sum ^= h
    return "Player 1 Wins" if nim_sum != 0 else "Player 2 Wins"`
    },
    glossary: [
      { term: 'Nim-Sum', definition: 'Bitwise XOR sum of all heap sizes; determines winning vs losing game states.' }
    ],
    inputRequirement: 'Heap sizes array',
    defaultInput: [3, 4, 5]
  }
];

// Step Generator for Quick Sort
export function generateQuickSortSteps(input: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...input];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Quick Sort initialized with ${n} elements. Using Lomuto partition scheme (pivot = last element).`,
    codeLine: 1,
    arrayState: [...arr],
    variables: { low: '0', high: `${n - 1}`, pivot: `${arr[n - 1]}` },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  function quickSort(low: number, high: number) {
    if (low < high) {
      const pIdx = partition(low, high);
      quickSort(low, pIdx - 1);
      quickSort(pIdx + 1, high);
    }
  }

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Partitioning subarray [${low}..${high}]. Pivot chosen as arr[${high}] = ${pivot}.`,
      codeLine: 2,
      arrayState: [...arr],
      pivotIndex: high,
      activeIndices: [low, high],
      variables: { low: `${low}`, high: `${high}`, pivot: `${pivot}`, i: `${i}` },
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      const needSwap = arr[j] < pivot;

      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `Comparing arr[${j}]=${arr[j]} with pivot ${pivot}. ${needSwap ? `${arr[j]} < ${pivot}, increment boundary i and swap.` : `${arr[j]} >= ${pivot}, keep in right partition.`}`,
        codeLine: 4,
        arrayState: [...arr],
        pivotIndex: high,
        activeIndices: [j],
        variables: { j: `${j}`, 'arr[j]': `${arr[j]}`, pivot: `${pivot}`, i: `${i}` },
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });

      if (needSwap) {
        i++;
        if (i !== j) {
          const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
          swaps++;
          steps.push({
            stepIndex: steps.length,
            totalSteps: steps.length + 1,
            description: `Swapped arr[${i}] (${arr[j]}) with arr[${j}] (${arr[i]}) to group smaller elements on left.`,
            codeLine: 6,
            arrayState: [...arr],
            pivotIndex: high,
            swappedIndices: [i, j],
            variables: { i: `${i}`, j: `${j}`, 'arr[i]': `${arr[i]}`, 'arr[j]': `${arr[j]}` },
            stats: { comparisons, swaps, operations: comparisons + swaps }
          });
        }
      }
    }

    const t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
    swaps++;
    const finalPivotIdx = i + 1;

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Placed pivot ${pivot} into its exact final sorted position at index ${finalPivotIdx}.`,
      codeLine: 7,
      arrayState: [...arr],
      sortedIndices: [finalPivotIdx],
      pivotIndex: finalPivotIdx,
      variables: { final_pivot_idx: `${finalPivotIdx}`, pivot: `${pivot}` },
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });

    return finalPivotIdx;
  }

  quickSort(0, n - 1);

  const allIndices = arr.map((_, idx) => idx);
  steps.push({
    stepIndex: steps.length,
    totalSteps: steps.length + 1,
    description: `Quick Sort completed! Total comparisons: ${comparisons}, swaps: ${swaps}.`,
    codeLine: 8,
    arrayState: [...arr],
    sortedIndices: allIndices,
    variables: { status: 'Sorted', total_comparisons: `${comparisons}`, total_swaps: `${swaps}` },
    stats: { comparisons, swaps, operations: comparisons + swaps }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

// Step Generator for Euclidean GCD
export function generateEuclideanGcdSteps(input: number[]): AlgorithmStep[] {
  let a = input[0] || 48;
  let b = input[1] || 18;
  const originalA = a;
  const originalB = b;
  const steps: AlgorithmStep[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Computing GCD(${a}, ${b}) using Euclidean algorithm. Recurrence: gcd(a, b) = gcd(b, a % b).`,
    codeLine: 1,
    variables: { a: `${a}`, b: `${b}` },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  let stepCount = 0;
  while (b !== 0) {
    stepCount++;
    const rem = a % b;
    const quotient = Math.floor(a / b);

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Step ${stepCount}: Divide ${a} by ${b}. Equation: ${a} = ${quotient} × ${b} + ${rem}. Remainder = ${rem}.`,
      codeLine: 3,
      variables: { a: `${a}`, b: `${b}`, quotient: `${quotient}`, remainder: `${rem}` },
      stats: { comparisons: stepCount, swaps: 0, operations: stepCount * 2 }
    });

    a = b;
    b = rem;

    if (b !== 0) {
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `New values for next step: a = ${a}, b = ${b}.`,
        codeLine: 4,
        variables: { new_a: `${a}`, new_b: `${b}` },
        stats: { comparisons: stepCount, swaps: 0, operations: stepCount * 2 + 1 }
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: steps.length + 1,
    description: `Remainder reached 0! GCD(${originalA}, ${originalB}) = ${a}.`,
    codeLine: 6,
    variables: { 'FINAL_GCD': `${a}`, status: 'Completed' },
    stats: { comparisons: stepCount, swaps: 0, operations: stepCount * 2 + 2 }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

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
    description: `Initial state: Array with ${n} elements ready for Bubble Sort pass 1.`,
    codeLine: 1,
    arrayState: [...arr],
    activeIndices: [],
    sortedIndices: [],
    variables: { n: `${n}`, status: 'Starting pass 1' },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  for (let i = 0; i < n - 1; i++) {
    let passSwapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      const willSwap = arr[j] > arr[j + 1];
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `Pass ${i + 1}: Comparing arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}.`,
        codeLine: 4,
        arrayState: [...arr],
        activeIndices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        variables: { i: `${i}`, j: `${j}`, 'arr[j]': `${arr[j]}`, 'arr[j+1]': `${arr[j + 1]}` },
        stats: { comparisons, swaps, operations: comparisons + swaps },
        quiz: steps.length === 2 ? {
          question: `Will ${arr[j]} and ${arr[j + 1]} be swapped?`,
          options: [
            `Yes, because ${arr[j]} > ${arr[j + 1]}`,
            `No, because ${arr[j]} <= ${arr[j + 1]}`,
            'Cannot determine yet'
          ],
          correctIndex: willSwap ? 0 : 1,
          explanation: willSwap
            ? `${arr[j]} is strictly greater than ${arr[j + 1]}, so Bubble Sort swaps them.`
            : `They are already in relative ascending order.`
        } : undefined
      });

      if (willSwap) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swaps++;
        passSwapped = true;

        steps.push({
          stepIndex: steps.length,
          totalSteps: steps.length + 1,
          description: `Swapped: ${arr[j]} <-> ${arr[j + 1]} because ${arr[j + 1]} was larger than ${arr[j]}.`,
          codeLine: 6,
          arrayState: [...arr],
          activeIndices: [j, j + 1],
          swappedIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          variables: { i: `${i}`, j: `${j}`, swapped: 'true' },
          stats: { comparisons, swaps, operations: comparisons + swaps }
        });
      }
    }
    sortedIndices.push(n - i - 1);
    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `End of Pass ${i + 1}: Element ${arr[n - i - 1]} at index ${n - i - 1} bubbled to its final position.`,
      codeLine: 8,
      arrayState: [...arr],
      sortedIndices: [...sortedIndices],
      variables: { pass: `${i + 1}`, settled: `${arr[n - i - 1]}` },
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });
    if (!passSwapped) break;
  }
  const allIndices = arr.map((_, idx) => idx);
  steps.push({
    stepIndex: steps.length,
    totalSteps: steps.length + 1,
    description: `Bubble Sort Complete! Entire array is strictly ordered. Total comparisons: ${comparisons}, swaps: ${swaps}.`,
    codeLine: 10,
    arrayState: [...arr],
    sortedIndices: allIndices,
    variables: { status: 'Sorted', total_passes: `${steps.length}` },
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
    description: 'Selection Sort: Ready to find the minimum element in unsorted range.',
    codeLine: 1,
    arrayState: [...arr],
    variables: { n: `${n}` },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Starting pass ${i + 1}. Current assumed minimum is arr[${i}] = ${arr[i]}.`,
      codeLine: 2,
      arrayState: [...arr],
      pivotIndex: i,
      sortedIndices: [...sortedIndices],
      variables: { i: `${i}`, min_idx: `${minIdx}`, min_val: `${arr[minIdx]}` },
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `Comparing arr[${j}]=${arr[j]} with current minimum arr[${minIdx}]=${arr[minIdx]}.`,
        codeLine: 4,
        arrayState: [...arr],
        activeIndices: [j],
        pivotIndex: minIdx,
        sortedIndices: [...sortedIndices],
        variables: { i: `${i}`, j: `${j}`, min_idx: `${minIdx}` },
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          stepIndex: steps.length,
          totalSteps: steps.length + 1,
          description: `Found new smaller minimum at index ${minIdx} (val ${arr[minIdx]})!`,
          codeLine: 5,
          arrayState: [...arr],
          pivotIndex: minIdx,
          sortedIndices: [...sortedIndices],
          variables: { i: `${i}`, new_min_idx: `${minIdx}`, new_min_val: `${arr[minIdx]}` },
          stats: { comparisons, swaps, operations: comparisons + swaps }
        });
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      swaps++;
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `Swapped minimum element ${arr[i]} into position index ${i} with ${arr[minIdx]}.`,
        codeLine: 7,
        arrayState: [...arr],
        swappedIndices: [i, minIdx],
        sortedIndices: [...sortedIndices, i],
        variables: { swapped: `arr[${i}] <-> arr[${minIdx}]` },
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
    }
    sortedIndices.push(i);
  }
  sortedIndices.push(n - 1);
  steps.push({
    stepIndex: steps.length,
    totalSteps: steps.length + 1,
    description: `Selection Sort complete! Exactly ${n} elements ordered in O(n²) time.`,
    codeLine: 8,
    arrayState: [...arr],
    sortedIndices: [...sortedIndices],
    variables: { status: 'Completed', total_comparisons: `${comparisons}`, total_swaps: `${swaps}` },
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
    description: `Insertion Sort: Index 0 (${arr[0]}) is trivially considered a sorted sublist of size 1.`,
    codeLine: 1,
    arrayState: [...arr],
    sortedIndices: [...sortedIndices],
    variables: { sorted_sublist: `[${arr[0]}]` },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Extract key element arr[${i}] = ${key} to insert into sorted sublist [0..${i - 1}].`,
      codeLine: 2,
      arrayState: [...arr],
      pivotIndex: i,
      sortedIndices: [...sortedIndices],
      variables: { i: `${i}`, key: `${key}` },
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });

    while (j >= 0 && arr[j] > key) {
      comparisons++;
      swaps++;
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `arr[${j}] (${arr[j]}) > key (${key}). Shift arr[${j}] right to index ${j + 1}.`,
        codeLine: 4,
        arrayState: [...arr],
        activeIndices: [j, j + 1],
        variables: { j: `${j}`, shifting: `${arr[j]} -> ${j + 1}` },
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
    sortedIndices.push(i);

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Inserted key (${key}) into vacant position index ${j + 1}. Sublist [0..${i}] is now sorted.`,
      codeLine: 6,
      arrayState: [...arr],
      swappedIndices: [j + 1],
      sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
      variables: { inserted_at: `${j + 1}`, key: `${key}` },
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: steps.length + 1,
    description: `Insertion Sort finished in O(n) best-case or O(n²) worst-case. Total comparisons: ${comparisons}.`,
    codeLine: 7,
    arrayState: [...arr],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    variables: { status: 'Sorted' },
    stats: { comparisons, swaps, operations: comparisons + swaps }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateBinarySearchSteps(input: number[], target = 55): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const arr = [...input].sort((a, b) => a - b);
  let low = 0;
  let high = arr.length - 1;
  let comparisons = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `Binary Search: Searching for target ${target} in sorted array. Search range [0, ${high}].`,
    codeLine: 1,
    arrayState: [...arr],
    variables: { low: '0', high: `${high}`, target: `${target}` },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  let found = false;
  while (low <= high) {
    comparisons++;
    const mid = Math.floor(low + (high - low) / 2);
    const midVal = arr[mid];

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Midpoint index = ${mid} (val ${midVal}). Comparing arr[${mid}] with target ${target}.`,
      codeLine: 3,
      arrayState: [...arr],
      activeIndices: [low, high],
      pivotIndex: mid,
      variables: { low: `${low}`, mid: `${mid}`, high: `${high}`, 'arr[mid]': `${midVal}` },
      stats: { comparisons, swaps: 0, operations: comparisons }
    });

    if (midVal === target) {
      found = true;
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `Target ${target} FOUND at index ${mid}! Logarithmic search completed in O(log n).`,
        codeLine: 4,
        arrayState: [...arr],
        sortedIndices: [mid],
        pivotIndex: mid,
        variables: { result: `FOUND at index ${mid}`, comparisons: `${comparisons}` },
        stats: { comparisons, swaps: 0, operations: comparisons }
      });
      break;
    } else if (midVal < target) {
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `arr[${mid}] (${midVal}) < target (${target}). Discard left half [0..${mid}]. Shifting low = ${mid + 1}.`,
        codeLine: 5,
        arrayState: [...arr],
        pivotIndex: mid,
        variables: { new_low: `${mid + 1}`, high: `${high}` },
        stats: { comparisons, swaps: 0, operations: comparisons }
      });
      low = mid + 1;
    } else {
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `arr[${mid}] (${midVal}) > target (${target}). Discard right half [${mid}..${high}]. Shifting high = ${mid - 1}.`,
        codeLine: 7,
        arrayState: [...arr],
        pivotIndex: mid,
        variables: { low: `${low}`, new_high: `${mid - 1}` },
        stats: { comparisons, swaps: 0, operations: comparisons }
      });
      high = mid - 1;
    }
  }

  if (!found) {
    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `low (${low}) > high (${high}). Target ${target} does not exist in array.`,
      codeLine: 9,
      arrayState: [...arr],
      variables: { result: 'NOT FOUND', comparisons: `${comparisons}` },
      stats: { comparisons, swaps: 0, operations: comparisons }
    });
  }

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateStackSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const stack: string[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 7,
    description: 'Empty Stack initialized. LIFO (Last-In-First-Out). Max Capacity = 5.',
    codeLine: 1,
    stackState: [],
    variables: { top: '-1', size: '0', capacity: '5' },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  const pushes = ['10', '25', '42', '77'];
  for (const item of pushes) {
    stack.push(item);
    steps.push({
      stepIndex: steps.length,
      totalSteps: 7,
      description: `PUSH(${item}): Item '${item}' placed at top of stack. Top pointer increments to ${stack.length - 1}.`,
      codeLine: 3,
      stackState: [...stack],
      variables: { top: `${stack.length - 1}`, top_val: item, size: `${stack.length}` },
      stats: { comparisons: 0, swaps: 0, operations: steps.length + 1 }
    });
  }

  // PEEK
  steps.push({
    stepIndex: steps.length,
    totalSteps: 7,
    description: `PEEK(): Inspect top item '${stack[stack.length - 1]}' without removing. O(1) time complexity.`,
    codeLine: 5,
    stackState: [...stack],
    variables: { top: `${stack.length - 1}`, peek_val: stack[stack.length - 1] },
    stats: { comparisons: 0, swaps: 0, operations: steps.length + 1 }
  });

  // POP
  const popped = stack.pop();
  steps.push({
    stepIndex: steps.length,
    totalSteps: 7,
    description: `POP(): Removed and returned top element '${popped}'. Top pointer decremented to ${stack.length - 1}.`,
    codeLine: 6,
    stackState: [...stack],
    variables: { popped_item: popped || '', new_top: `${stack.length - 1}` },
    stats: { comparisons: 0, swaps: 0, operations: steps.length + 1 }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}

export function generateQueueSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const queue: string[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 7,
    description: 'Empty Queue initialized. FIFO (First-In-First-Out). Front = 0, Rear = -1.',
    codeLine: 1,
    queueState: [],
    variables: { front: '0', rear: '-1', size: '0' },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  const enqueues = ['Task 1 (A)', 'Task 2 (B)', 'Task 3 (C)', 'Task 4 (D)'];
  for (const item of enqueues) {
    queue.push(item);
    steps.push({
      stepIndex: steps.length,
      totalSteps: 7,
      description: `ENQUEUE('${item}'): Enqueued at rear. Rear pointer increments.`,
      codeLine: 2,
      queueState: [...queue],
      variables: { front: '0', rear: `${queue.length - 1}`, size: `${queue.length}` },
      stats: { comparisons: 0, swaps: 0, operations: steps.length + 1 }
    });
  }

  // DEQUEUE 1
  const dq1 = queue.shift();
  steps.push({
    stepIndex: steps.length,
    totalSteps: 7,
    description: `DEQUEUE(): Removed front item '${dq1}'. First task entered is first serviced in O(1).`,
    codeLine: 4,
    queueState: [...queue],
    variables: { serviced_task: dq1 || '', remaining: `${queue.length}` },
    stats: { comparisons: 0, swaps: 0, operations: steps.length + 1 }
  });

  // DEQUEUE 2
  const dq2 = queue.shift();
  steps.push({
    stepIndex: steps.length,
    totalSteps: 7,
    description: `DEQUEUE(): Removed '${dq2}'. Front now points to '${queue[0]}'.`,
    codeLine: 5,
    queueState: [...queue],
    variables: { serviced_task: dq2 || '', remaining: `${queue.length}` },
    stats: { comparisons: 0, swaps: 0, operations: steps.length + 1 }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}

export function generateGraphBfsSteps(): AlgorithmStep[] {
  const nodes: GraphNodeState[] = [
    { id: 'A', label: 'A (Root)', x: 20, y: 25, status: 'unvisited', distance: '∞' },
    { id: 'B', label: 'B', x: 50, y: 20, status: 'unvisited', distance: '∞' },
    { id: 'C', label: 'C', x: 25, y: 70, status: 'unvisited', distance: '∞' },
    { id: 'D', label: 'D', x: 55, y: 65, status: 'unvisited', distance: '∞' },
    { id: 'E', label: 'E', x: 80, y: 35, status: 'unvisited', distance: '∞' },
    { id: 'F', label: 'F', x: 85, y: 75, status: 'unvisited', distance: '∞' }
  ];

  const edges: GraphEdgeState[] = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'B', to: 'E' },
    { from: 'C', to: 'D' },
    { from: 'D', to: 'F' },
    { from: 'E', to: 'F' }
  ];

  const steps: AlgorithmStep[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 6,
    description: "BFS Start: Traversal begins from root 'A'. Initialize Queue = ['A']. Mark 'A' visited (dist = 0).",
    codeLine: 1,
    graphNodes: nodes.map(n => n.id === 'A' ? { ...n, status: 'visiting', distance: '0' } : n),
    graphEdges: edges,
    queueState: ['A'],
    variables: { queue: "['A']", visited: '{A}' },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  steps.push({
    stepIndex: 1,
    totalSteps: 6,
    description: "Dequeue 'A'. Explore adjacent neighbors of A: 'B' and 'C'. Enqueue both with level 1 distance.",
    codeLine: 3,
    graphNodes: nodes.map(n => {
      if (n.id === 'A') return { ...n, status: 'visited', distance: '0' };
      if (n.id === 'B' || n.id === 'C') return { ...n, status: 'visiting', distance: '1' };
      return n;
    }),
    graphEdges: edges.map(e => e.from === 'A' ? { ...e, isHighlighted: true } : e),
    queueState: ['B', 'C'],
    variables: { current: 'A', queue: "['B', 'C']", level: '1' },
    stats: { comparisons: 2, swaps: 0, operations: 3 }
  });

  steps.push({
    stepIndex: 2,
    totalSteps: 6,
    description: "Dequeue 'B'. Explore neighbors: 'D' (dist=2) and 'E' (dist=2). Enqueue D and E.",
    codeLine: 4,
    graphNodes: nodes.map(n => {
      if (n.id === 'A' || n.id === 'B') return { ...n, status: 'visited' };
      if (n.id === 'C') return { ...n, status: 'visiting', distance: '1' };
      if (n.id === 'D' || n.id === 'E') return { ...n, status: 'visiting', distance: '2' };
      return n;
    }),
    graphEdges: edges.map(e => (e.from === 'B' && (e.to === 'D' || e.to === 'E')) || (e.from === 'A' && e.to === 'C') ? { ...e, isHighlighted: true } : e),
    queueState: ['C', 'D', 'E'],
    variables: { current: 'B', queue: "['C', 'D', 'E']", level: '2' },
    stats: { comparisons: 4, swaps: 0, operations: 5 }
  });

  steps.push({
    stepIndex: 3,
    totalSteps: 6,
    description: "Dequeue 'C'. Neighbor 'D' is already discovered in queue. Mark 'C' visited.",
    codeLine: 4,
    graphNodes: nodes.map(n => {
      if (n.id === 'A' || n.id === 'B' || n.id === 'C') return { ...n, status: 'visited' };
      if (n.id === 'D' || n.id === 'E') return { ...n, status: 'visiting', distance: '2' };
      return n;
    }),
    graphEdges: edges,
    queueState: ['D', 'E'],
    variables: { current: 'C', queue: "['D', 'E']" },
    stats: { comparisons: 5, swaps: 0, operations: 6 }
  });

  steps.push({
    stepIndex: 4,
    totalSteps: 6,
    description: "Dequeue 'D'. Discover neighbor 'F' (dist=3). Enqueue 'F'.",
    codeLine: 5,
    graphNodes: nodes.map(n => {
      if (n.id === 'F') return { ...n, status: 'visiting', distance: '3' };
      if (n.id === 'E') return { ...n, status: 'visiting' };
      return { ...n, status: 'visited' };
    }),
    graphEdges: edges.map(e => e.from === 'D' && e.to === 'F' ? { ...e, isHighlighted: true } : e),
    queueState: ['E', 'F'],
    variables: { current: 'D', queue: "['E', 'F']" },
    stats: { comparisons: 6, swaps: 0, operations: 8 }
  });

  steps.push({
    stepIndex: 5,
    totalSteps: 6,
    description: "Dequeue 'E' & 'F'. All reachable vertices visited! BFS Order: A -> B -> C -> D -> E -> F.",
    codeLine: 7,
    graphNodes: nodes.map(n => ({ ...n, status: 'in_path' })),
    graphEdges: edges.map(e => ({ ...e, isHighlighted: true })),
    queueState: [],
    variables: { status: 'Completed', time: 'O(V + E)', space: 'O(V)' },
    stats: { comparisons: 7, swaps: 0, operations: 10 }
  });

  return steps;
}

export function generateKnapsackDpSteps(): AlgorithmStep[] {
  const weights = [2, 3, 4, 5];
  const values = [3, 4, 5, 8];
  const capacity = 5;
  const n = weights.length;

  const rowHeaders = ['Ø (0)', ...weights.map((w, idx) => `Item ${idx + 1} (w=${w}, v=${values[idx]})`)];
  const colHeaders = Array.from({ length: capacity + 1 }, (_, c) => `W=${c}`);

  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  const steps: AlgorithmStep[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 15,
    description: '0/1 Knapsack: Capacity W=5, 4 items. Base row dp[0][w]=0 and column dp[i][0]=0.',
    codeLine: 1,
    dpTable: {
      rowHeaders,
      colHeaders,
      matrix: dp.map(row => [...row]),
      activeRow: 0,
      activeCol: 0,
      formulaExplanation: 'dp[i][w] = maximum value achievable with a subset of first i items under capacity w'
    },
    variables: { Capacity: '5', Items: '4' },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  let ops = 0;
  for (let i = 1; i <= n; i++) {
    const w = weights[i - 1];
    const v = values[i - 1];
    for (let c = 1; c <= capacity; c++) {
      ops++;
      const withoutItem = dp[i - 1][c];
      const withItem = c >= w ? dp[i - 1][c - w] + v : -1;
      const chosen = Math.max(withoutItem, withItem);
      dp[i][c] = chosen;

      if (c === w || c === capacity) {
        steps.push({
          stepIndex: steps.length,
          totalSteps: 15,
          description: `Item ${i} (wt=${w}, val=${v}) at capacity ${c}: ${c >= w ? `max(without=${withoutItem}, with=${v} + dp[${i - 1}][${c - w}] (${withItem})) = ${chosen}` : `weight > cap, carry forward ${withoutItem}`}.`,
          codeLine: 4,
          dpTable: {
            rowHeaders,
            colHeaders,
            matrix: dp.map(row => [...row]),
            activeRow: i,
            activeCol: c,
            formulaExplanation: c >= w
              ? `dp[${i}][${c}] = max(dp[${i - 1}][${c}], dp[${i - 1}][${c - w}] + ${v}) = ${chosen}`
              : `dp[${i}][${c}] = dp[${i - 1}][${c}] = ${chosen}`
          },
          variables: { item: `${i}`, cap: `${c}`, 'dp[i][w]': `${chosen}` },
          stats: { comparisons: ops, swaps: 0, operations: ops }
        });
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: 15,
    description: `Optimal solution reached! Maximum value in Knapsack = ${dp[n][capacity]} with total weight <= ${capacity}.`,
    codeLine: 8,
    dpTable: {
      rowHeaders,
      colHeaders,
      matrix: dp.map(row => [...row]),
      activeRow: n,
      activeCol: capacity,
      formulaExplanation: `Max Profit = dp[4][5] = ${dp[n][capacity]}`
    },
    variables: { max_profit: `${dp[n][capacity]}`, time: 'O(n * W)', space: 'O(n * W)' },
    stats: { comparisons: ops, swaps: 0, operations: ops }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}

export function generateNQueensSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [
    {
      stepIndex: 0,
      totalSteps: 6,
      description: '4-Queens Backtracking: Place 4 non-attacking queens on a 4x4 chessboard.',
      codeLine: 1,
      queensPlacement: [],
      variables: { board_size: '4x4', target_queens: '4' },
      stats: { comparisons: 0, swaps: 0, operations: 1 }
    },
    {
      stepIndex: 1,
      totalSteps: 6,
      description: 'Row 0: Trying Queen at Column 1. Safe position. Move to Row 1.',
      codeLine: 2,
      queensPlacement: [1],
      variables: { row: '0', col: '1', status: 'SAFE' },
      stats: { comparisons: 1, swaps: 0, operations: 2 }
    },
    {
      stepIndex: 2,
      totalSteps: 6,
      description: 'Row 1: Check columns. Col 0 (diag conflict), Col 1 (column conflict), Col 2 (diag conflict). Col 3 is SAFE!',
      codeLine: 3,
      queensPlacement: [1, 3],
      variables: { row: '1', col: '3', status: 'SAFE' },
      stats: { comparisons: 4, swaps: 0, operations: 5 }
    },
    {
      stepIndex: 3,
      totalSteps: 6,
      description: 'Row 2: Check columns. Col 0 is safe from queens at (0,1) and (1,3). Place Queen at (2,0).',
      codeLine: 3,
      queensPlacement: [1, 3, 0],
      variables: { row: '2', col: '0', status: 'SAFE' },
      stats: { comparisons: 6, swaps: 0, operations: 7 }
    },
    {
      stepIndex: 4,
      totalSteps: 6,
      description: 'Row 3: Check columns. Col 2 is safe from queens at (0,1), (1,3), (2,0). Place Queen at (3,2).',
      codeLine: 4,
      queensPlacement: [1, 3, 0, 2],
      variables: { row: '3', col: '2', status: 'SOLUTION_FOUND' },
      stats: { comparisons: 9, swaps: 0, operations: 10 }
    },
    {
      stepIndex: 5,
      totalSteps: 6,
      description: 'VALID 4-QUEENS SOLUTION COMPLETED! No horizontal, vertical, or diagonal threats exist.',
      codeLine: 6,
      queensPlacement: [1, 3, 0, 2],
      variables: { positions: '(0,1), (1,3), (2,0), (3,2)', time: 'O(N!)' },
      stats: { comparisons: 9, swaps: 0, operations: 11 }
    }
  ];

  return steps;
}
