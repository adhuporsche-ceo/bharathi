package com.example.data

object DaaRepository {

    val categories = listOf(
        AlgorithmCategory(
            id = "cat_analysis",
            indexStr = "01",
            title = "Analysis & Correctness",
            lessonCount = 10,
            description = "Master Big-O/Omega/Theta, recurrence relations, substitution, recursion trees, and Master Theorem.",
            iconType = "trending_up"
        ),
        AlgorithmCategory(
            id = "cat_divide_conquer",
            indexStr = "02",
            title = "Divide and Conquer",
            lessonCount = 6,
            description = "Divide into independent subproblems, solve recursively, and combine: Merge Sort, Quick Sort, Karatsuba.",
            iconType = "call_split"
        ),
        AlgorithmCategory(
            id = "cat_branch_bound",
            indexStr = "03",
            title = "Branch and Bound",
            lessonCount = 4,
            description = "State space tree exploration with bounding functions for NP-hard optimization: 0/1 Knapsack, TSP, 15-Puzzle.",
            iconType = "account_tree"
        ),
        AlgorithmCategory(
            id = "cat_complexity",
            indexStr = "04",
            title = "Complexity Theory",
            lessonCount = 5,
            description = "Tractable vs Intractable problems, P vs NP, Polynomial Reductions, Cook-Levin Theorem, and NP-Completeness.",
            iconType = "speed"
        ),
        AlgorithmCategory(
            id = "cat_extensions",
            indexStr = "05",
            title = "DAA Extensions",
            lessonCount = 20,
            description = "Randomized algorithms, QuickSelect, aggregate/potential amortized analysis, and approximation bounds.",
            iconType = "science"
        ),
        AlgorithmCategory(
            id = "cat_sorting",
            indexStr = "06",
            title = "Sorting",
            lessonCount = 15,
            description = "Fundamental and advanced ordering algorithms: Bubble, Selection, Insertion, Merge, Quick, Heap, Radix.",
            iconType = "swap_vert"
        ),
        AlgorithmCategory(
            id = "cat_searching",
            indexStr = "07",
            title = "Searching",
            lessonCount = 14,
            description = "Linear, Binary, Ternary, Jump, and Interpolation search strategies with logarithmic bounds.",
            iconType = "search"
        ),
        AlgorithmCategory(
            id = "cat_ds",
            indexStr = "08",
            title = "Data Structures",
            lessonCount = 49,
            description = "Stack, Queue, Linked Lists, Binary Search Trees, Self-balancing AVL, Heaps, and Disjoint Set Union.",
            iconType = "layers"
        ),
        AlgorithmCategory(
            id = "cat_graphs",
            indexStr = "09",
            title = "Graphs",
            lessonCount = 19,
            description = "Breadth-First, Depth-First, Dijkstra's Shortest Path, Bellman-Ford, Kruskal's & Prim's MSTs, Topological Sort.",
            iconType = "hub"
        ),
        AlgorithmCategory(
            id = "cat_dp",
            indexStr = "10",
            title = "Dynamic Programming",
            lessonCount = 14,
            description = "Overlapping subproblems & optimal substructure: Knapsack, LCS, LIS, Matrix Chain Multiplication, Coin Change.",
            iconType = "grid_view"
        ),
        AlgorithmCategory(
            id = "cat_strings",
            indexStr = "11",
            title = "Strings",
            lessonCount = 5,
            description = "Pattern matching with Knuth-Morris-Pratt (KMP), Rabin-Karp rolling hash, Z-Algorithm, and Tries.",
            iconType = "text_fields"
        ),
        AlgorithmCategory(
            id = "cat_number_theory",
            indexStr = "12",
            title = "Number Theory",
            lessonCount = 2,
            description = "Euclidean GCD, Modular Exponentiation, and Sieve of Eratosthenes prime factorization.",
            iconType = "tag"
        ),
        AlgorithmCategory(
            id = "cat_backtracking",
            indexStr = "13",
            title = "Backtracking",
            lessonCount = 6,
            description = "Systematic trial-and-error state pruning: N-Queens problem, Rat in a Maze, Sudoku Solver, Subset Sum.",
            iconType = "undo"
        ),
        AlgorithmCategory(
            id = "cat_greedy",
            indexStr = "14",
            title = "Greedy",
            lessonCount = 5,
            description = "Locally optimal choice yielding globally optimal solution: Huffman Coding, Fractional Knapsack, Activity Selection.",
            iconType = "track_changes"
        ),
        AlgorithmCategory(
            id = "cat_matrix",
            indexStr = "15",
            title = "Matrix / Grid",
            lessonCount = 2,
            description = "Grid pathfinding BFS/A*, Matrix Rotation, Spiral Traversal, and Connected Components Island Counting.",
            iconType = "table_chart"
        ),
        AlgorithmCategory(
            id = "cat_games",
            indexStr = "16",
            title = "Games",
            lessonCount = 8,
            description = "Adversarial search: Minimax Decision Rule with Alpha-Beta Pruning, Game of Nim, and Cellular Automata.",
            iconType = "sports_esports"
        )
    )

    val algorithms = listOf(
        // Sorting
        AlgorithmItem(
            id = "bubble_sort",
            categoryId = "cat_sorting",
            name = "Bubble Sort",
            shortDesc = "Repeatedly steps through list, compares adjacent elements, and swaps them if in wrong order.",
            complexity = ComplexityInfo(
                best = "O(n)",
                average = "O(n²)",
                worst = "O(n²)",
                space = "O(1)",
                paradigm = "Comparison-based Iterative",
                stability = "Stable",
                inPlace = "Yes"
            ),
            commonMistake = "A lower step count on one input does not prove a better algorithm overall. Bubble sort degrades severely on reverse-sorted inputs.",
            kctExamTip = "KCT DAA Unit 1: State the loop invariant: After pass k, the last k elements are in their final sorted positions.",
            codeSnippets = CodeSnippet(
                pseudo = """function bubbleSort(A):
  n = length(A)
  for i from 0 to n - 2:
    for j from 0 to n - i - 2:
      if A[j] > A[j+1]:
        swap(A[j], A[j+1])
  return A""",
                cpp = """void bubbleSort(vector<int>& arr) {
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
}""",
                java = """public static void bubbleSort(int[] arr) {
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
}""",
                python = """def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr"""
            ),
            glossary = listOf(
                GlossaryItem("Inversion", "A pair of elements (A[i], A[j]) such that i < j and A[i] > A[j]."),
                GlossaryItem("Stability", "Preserves the relative order of elements with equal keys."),
                GlossaryItem("Adaptive", "Runs faster (O(n)) when the array is already sorted or nearly sorted.")
            )
        ),
        AlgorithmItem(
            id = "selection_sort",
            categoryId = "cat_sorting",
            name = "Selection Sort",
            shortDesc = "Divides the array into sorted and unsorted subarrays; repeatedly selects the minimum element.",
            complexity = ComplexityInfo(
                best = "O(n²)",
                average = "O(n²)",
                worst = "O(n²)",
                space = "O(1)",
                paradigm = "Selection Iterative",
                stability = "Unstable",
                inPlace = "Yes"
            ),
            commonMistake = "Assuming Selection Sort is faster on sorted arrays. It always performs exactly n(n-1)/2 comparisons regardless of initial order.",
            kctExamTip = "Selection Sort performs at most n swaps (O(n)), making it useful when write/swap operations are costly (e.g. Flash EEPROM).",
            codeSnippets = CodeSnippet(
                pseudo = """function selectionSort(A):
  n = length(A)
  for i from 0 to n - 2:
    min_idx = i
    for j from i + 1 to n - 1:
      if A[j] < A[min_idx]:
        min_idx = j
    if min_idx != i:
      swap(A[i], A[min_idx])""",
                cpp = """void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        if (min_idx != i) swap(arr[i], arr[min_idx]);
    }
}""",
                java = """public static void selectionSort(int[] arr) {
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
}""",
                python = """def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr"""
            ),
            glossary = listOf(
                GlossaryItem("Minimum Index", "Pointer tracking the lowest value found in the current pass."),
                GlossaryItem("Non-adaptive", "Takes the same O(n²) time regardless of whether input is sorted or reversed.")
            )
        ),
        AlgorithmItem(
            id = "insertion_sort",
            categoryId = "cat_sorting",
            name = "Insertion Sort",
            shortDesc = "Builds the sorted array one item at a time by repeatedly taking the next element and inserting it.",
            complexity = ComplexityInfo(
                best = "O(n)",
                average = "O(n²)",
                worst = "O(n²)",
                space = "O(1)",
                paradigm = "Incremental Insertion",
                stability = "Stable",
                inPlace = "Yes"
            ),
            commonMistake = "Assuming quicksort is always superior. For small arrays (n <= 16), Insertion Sort is usually faster due to cache locality and low constant factors.",
            kctExamTip = "Often used as the base case in hybrid sorting algorithms like TimSort (used in Python and Java standard libraries).",
            codeSnippets = CodeSnippet(
                pseudo = """function insertionSort(A):
  for i from 1 to length(A) - 1:
    key = A[i]
    j = i - 1
    while j >= 0 and A[j] > key:
      A[j + 1] = A[j]
      j = j - 1
    A[j + 1] = key""",
                cpp = """void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}""",
                java = """public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}""",
                python = """def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr"""
            ),
            glossary = listOf(
                GlossaryItem("Key Element", "The element currently being placed into the sorted segment."),
                GlossaryItem("Online Algorithm", "Can sort a list as it receives it on-the-fly.")
            )
        ),

        // Searching
        AlgorithmItem(
            id = "binary_search",
            categoryId = "cat_searching",
            name = "Binary Search",
            shortDesc = "Halves the search interval each step in a sorted sequence, achieving logarithmic time.",
            complexity = ComplexityInfo(
                best = "O(1)",
                average = "O(log n)",
                worst = "O(log n)",
                space = "O(1)",
                paradigm = "Divide and Conquer / Decrease and Conquer",
                stability = "N/A",
                inPlace = "Yes"
            ),
            commonMistake = "Applying Binary Search to unsorted arrays. The precondition MUST be monotonic order.",
            kctExamTip = "Avoid integer overflow when computing mid: use 'low + (high - low) / 2' instead of '(low + high) / 2'.",
            codeSnippets = CodeSnippet(
                pseudo = """function binarySearch(A, target):
  low = 0, high = length(A) - 1
  while low <= high:
    mid = low + (high - low) / 2
    if A[mid] == target:
      return mid
    else if A[mid] < target:
      low = mid + 1
    else:
      high = mid - 1
  return -1""",
                cpp = """int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}""",
                java = """public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}""",
                python = """def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1"""
            ),
            glossary = listOf(
                GlossaryItem("Midpoint", "Index splitting current range into equal halves."),
                GlossaryItem("Logarithmic reduction", "At each step, remaining search space is cut in half: n -> n/2 -> n/4 -> ... -> 1.")
            )
        ),

        // Data Structures: Stack
        AlgorithmItem(
            id = "stack_ds",
            categoryId = "cat_ds",
            name = "Stack (LIFO)",
            shortDesc = "Linear data structure where elements are added and removed strictly from the top.",
            complexity = ComplexityInfo(
                best = "O(1)",
                average = "O(1)",
                worst = "O(1)",
                space = "O(n)",
                paradigm = "LIFO Storage",
                stability = "N/A",
                inPlace = "N/A"
            ),
            commonMistake = "Attempting to Pop or Peek on an empty stack leads to Stack Underflow exception.",
            kctExamTip = "Applications in CS: Function call call-stack recursion, parenthesis matching, infix to postfix conversion, undo operations.",
            codeSnippets = CodeSnippet(
                pseudo = """class Stack:
  top = -1
  push(x):
    top = top + 1
    A[top] = x
  pop():
    val = A[top]
    top = top - 1
    return val
  peek():
    return A[top]""",
                cpp = """stack<int> s;
s.push(10);
s.push(20);
int topVal = s.top(); // 20
s.pop();""",
                java = """Stack<Integer> s = new Stack<>();
s.push(10);
s.push(20);
int topVal = s.peek(); // 20
s.pop();""",
                python = """stack = []
stack.append(10)
stack.append(20)
top_val = stack[-1]  # 20
popped = stack.pop()"""
            ),
            glossary = listOf(
                GlossaryItem("LIFO", "Last In, First Out."),
                GlossaryItem("Underflow", "Popping from an empty stack."),
                GlossaryItem("Overflow", "Pushing to a full fixed-size stack.")
            )
        ),

        // Data Structures: Queue
        AlgorithmItem(
            id = "queue_ds",
            categoryId = "cat_ds",
            name = "Queue (FIFO)",
            shortDesc = "Linear structure where elements are inserted at the rear and removed from the front.",
            complexity = ComplexityInfo(
                best = "O(1)",
                average = "O(1)",
                worst = "O(1)",
                space = "O(n)",
                paradigm = "FIFO Storage",
                stability = "N/A",
                inPlace = "N/A"
            ),
            commonMistake = "Using a linear array without circular wrap-around causes false overflow even when front cells are vacant.",
            kctExamTip = "Essential for Level-Order tree traversal, BFS in graphs, CPU scheduling queues, and printer spoolers.",
            codeSnippets = CodeSnippet(
                pseudo = """class Queue:
  enqueue(x):
    rear = (rear + 1) % MAX
    A[rear] = x
  dequeue():
    val = A[front]
    front = (front + 1) % MAX
    return val""",
                cpp = """queue<int> q;
q.push(10); // enqueue
q.push(20);
int frontVal = q.front();
q.pop();    // dequeue""",
                java = """Queue<Integer> q = new LinkedList<>();
q.offer(10);
q.offer(20);
int frontVal = q.peek();
q.poll();""",
                python = """from collections import deque
q = deque()
q.append(10)
q.append(20)
front_val = q[0]
popped = q.popleft()"""
            ),
            glossary = listOf(
                GlossaryItem("FIFO", "First In, First Out."),
                GlossaryItem("Circular Queue", "Connects rear back to front using modulo arithmetic to prevent space wastage.")
            )
        ),

        // Graphs: BFS
        AlgorithmItem(
            id = "graph_bfs",
            categoryId = "cat_graphs",
            name = "Breadth-First Search (BFS)",
            shortDesc = "Explores a graph level by level from a source vertex using a FIFO Queue.",
            complexity = ComplexityInfo(
                best = "O(V + E)",
                average = "O(V + E)",
                worst = "O(V + E)",
                space = "O(V)",
                paradigm = "Level-order Traversal",
                stability = "N/A",
                inPlace = "No"
            ),
            commonMistake = "Forgetting to mark a vertex as visited immediately upon enqueuing causes redundant re-enqueuing and exponential queue blowout.",
            kctExamTip = "BFS guarantees the shortest path (minimum number of edges) in an unweighted graph.",
            codeSnippets = CodeSnippet(
                pseudo = """function BFS(graph, start):
  visited = set()
  queue = [start]
  visited.add(start)
  while queue is not empty:
    u = queue.dequeue()
    for neighbor v in graph[u]:
      if v not in visited:
        visited.add(v)
        queue.enqueue(v)""",
                cpp = """void bfs(int start, const vector<vector<int>>& adj) {
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
}""",
                java = """void bfs(int start, List<List<Integer>> adj) {
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
}""",
                python = """def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        u = queue.popleft()
        for v in graph[u]:
            if v not in visited:
                visited.add(v)
                queue.append(v)"""
            ),
            glossary = listOf(
                GlossaryItem("Visited Set", "Tracks vertices that have entered the queue to prevent cycles."),
                GlossaryItem("Shortest Path Property", "In unweighted graphs, the first time BFS visits a node, it arrives via the shortest route.")
            )
        ),

        // Dynamic Programming: Knapsack
        AlgorithmItem(
            id = "knapsack_dp",
            categoryId = "cat_dp",
            name = "0/1 Knapsack Problem",
            shortDesc = "Maximize value within a weight capacity where each item can either be taken or left behind.",
            complexity = ComplexityInfo(
                best = "O(n * W)",
                average = "O(n * W)",
                worst = "O(n * W)",
                space = "O(n * W)",
                paradigm = "Dynamic Programming",
                stability = "N/A",
                inPlace = "No"
            ),
            commonMistake = "Assuming greedy choice (highest value/weight ratio) works for 0/1 knapsack. Greedy works ONLY for Fractional Knapsack!",
            kctExamTip = "Knapsack time complexity O(n*W) is Pseudo-polynomial because W depends on the numeric value, not the number of bits in input.",
            codeSnippets = CodeSnippet(
                pseudo = """dp[i][w] = max(
  dp[i-1][w],
  dp[i-1][w - wt[i-1]] + val[i-1] (if w >= wt[i-1])
)""",
                cpp = """int knapSack(int W, const vector<int>& wt, const vector<int>& val, int n) {
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
}""",
                java = """public static int knapSack(int W, int[] wt, int[] val, int n) {
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
}""",
                python = """def knapsack(W, wt, val, n):
    dp = [[0 for _ in range(W + 1)] for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if wt[i - 1] <= w:
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][W]"""
            ),
            glossary = listOf(
                GlossaryItem("Optimal Substructure", "An optimal solution contains optimal solutions to its subproblems."),
                GlossaryItem("Overlapping Subproblems", "Subproblems are recomputed multiple times in a naive recursive solution.")
            )
        ),

        // Backtracking: N-Queens
        AlgorithmItem(
            id = "n_queens",
            categoryId = "cat_backtracking",
            name = "N-Queens Problem",
            shortDesc = "Place N chess queens on an N×N board so that no two queens threaten each other.",
            complexity = ComplexityInfo(
                best = "O(N!)",
                average = "O(N!)",
                worst = "O(N!)",
                space = "O(N)",
                paradigm = "Backtracking Depth-First Search",
                stability = "N/A",
                inPlace = "Yes"
            ),
            commonMistake = "Only checking horizontal and vertical threats. Diagonal threats occur when |row1 - row2| == |col1 - col2|.",
            kctExamTip = "For N=1 and N>=4, valid solutions always exist. N=2 and N=3 have 0 solutions.",
            codeSnippets = CodeSnippet(
                pseudo = """function solveNQueens(row):
  if row == N:
    recordSolution()
    return
  for col from 0 to N - 1:
    if isSafe(row, col):
      placeQueen(row, col)
      solveNQueens(row + 1)
      removeQueen(row, col) // backtrack""",
                cpp = """bool isSafe(int row, int col, vector<int>& board) {
    for (int r = 0; r < row; r++) {
        if (board[r] == col || abs(board[r] - col) == abs(r - row))
            return false;
    }
    return true;
}""",
                java = """boolean isSafe(int row, int col, int[] board) {
    for (int r = 0; r < row; r++) {
        if (board[r] == col || Math.abs(board[r] - col) == Math.abs(r - row))
            return false;
    }
    return true;
}""",
                python = """def is_safe(row, col, board):
    for r in range(row):
        if board[r] == col or abs(board[r] - col) == abs(r - row):
            return False
    return True"""
            ),
            glossary = listOf(
                GlossaryItem("Pruning", "Terminating exploration of a branch early as soon as a constraint is violated."),
                GlossaryItem("State Space Tree", "Tree representing all possible configurations explored by backtracking.")
            )
        )
    )

    fun getCategoryById(id: String): AlgorithmCategory? = categories.find { it.id == id }

    fun getAlgorithmById(id: String): AlgorithmItem? = algorithms.find { it.id == id }

    fun getAlgorithmsForCategory(catId: String): List<AlgorithmItem> = algorithms.filter { it.categoryId == catId }
}
