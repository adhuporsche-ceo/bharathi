# 🎓 Bharthi DAA Visualizer

> **Interactive step-by-step algorithm visualizer and DAA learning platform**
> Built for KCT Computer Science students — Course **23CS401 · Design & Analysis of Algorithms**

---

## 📖 About

**Bharthi DAA Visualizer** is a real-time, interactive web application that brings algorithms to life through animated cartoon simulations, engineering-style canvas diagrams, and structured learning modules. Designed for Kumaraguru College of Technology (KCT) CSE students following the autonomous academic regulation, it covers the full **16-unit DAA syllabus** with **35+ algorithms**.

Whether you are preparing for university exams, running lab dry-runs, or simply trying to build algorithmic intuition — this tool makes complex concepts visual, audible, and hands-on.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Cartoon Stage** | Animated character-driven visualizations with sound effects for every swap, comparison, and completion |
| ⚙️ **Engineering Canvas** | Classic bar-chart and node-graph rendering for a traditional algorithmic view |
| 📊 **Complexity Cards** | Best / Average / Worst case analysis with formal invariant proofs |
| 💻 **Multi-Language Code** | Synchronized line-by-line code trace in **C++**, **Java**, and **Python** |
| 📝 **Dry-Run Worksheet** | Fillable student tracing table — perfect for lab evaluations and internal assessments |
| 🎯 **Step Prediction Quiz** | Interactive checkpoint quizzes to test your understanding at each algorithm step |
| 🏁 **Algorithm Race Arena** | Side-by-side benchmark comparisons of multiple algorithms on the same input |
| 🎓 **Live Classroom Mode** | Real-time session tools for instructors to conduct interactive lab classes |
| 🧮 **Master Theorem Solver** | Guided recurrence relation analysis using the Master Theorem |
| 📡 **Engine Telemetry** | Live register state, variable watcher, and CPU invariant dashboard |
| 🔊 **Sound Effects** | Auditory feedback for comparisons, swaps, and successful completions |
| 🔎 **Global Search (⌘K)** | Instantly jump to any algorithm across all 16 units |
| 📋 **Progress Tracking** | Mark algorithms as "Mastered" — saved to localStorage |

---

## 🧠 Algorithms Covered (35+)

### Sorting
- Bubble Sort · Selection Sort · Insertion Sort · Merge Sort · Quick Sort · Heap Sort

### Searching
- Linear Search · Binary Search

### Data Structures
- Stack (LIFO) · Linear Queue (FIFO) · Circular Queue

### Graph Algorithms
- Breadth-First Search (BFS) · Depth-First Search (DFS)
- Dijkstra's Shortest Path · Kruskal's Minimum Spanning Tree

### Greedy Algorithms
- Activity Selection · Fractional Knapsack · Huffman Coding

### Dynamic Programming
- 0/1 Knapsack Problem · Longest Common Subsequence (LCS)

### Backtracking
- N-Queens Problem · Rat in a Maze

### Divide & Conquer
- Merge Sort · Quick Sort · Karatsuba Multiplication · Closest Pair of Points

### String Matching
- Knuth-Morris-Pratt (KMP) · Rabin-Karp Rolling Hash

### Number Theory
- Euclidean GCD · Sieve of Eratosthenes

### Matrix / Grid
- Flood Fill (Islands Count) · Spiral Matrix Traversal

### Game Theory
- Minimax with Alpha-Beta Pruning · Game of Nim (Bouton's Theorem)

### Complexity & NP
- Vertex Cover 2-Approximation · Traveling Salesperson Problem (TSP)

### Analysis & Extensions
- Asymptotic Growth Comparator · Master Theorem Solver
- QuickSelect · Dynamic Array Amortized Doubling

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Motion (Framer Motion) |
| **Icons** | Lucide React |
| **PDF Export** | jsPDF + jsPDF-AutoTable |
| **Runtime** | Node.js (ESM) |

---

## 🚀 Run Locally

### Prerequisites
- **Node.js** v18 or higher

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd bharthi-dsa-visualizer

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**

---

## 📦 Other Commands

```bash
# Type-check the project (no build output)
npm run lint

# Build for production
npm run build

# Preview the production build locally
npm run preview

# Run algorithm unit tests
npm run test
```

---

## 📁 Project Structure

```
bharthi-dsa-visualizer/
├── src/
│   ├── App.tsx                  # Main application shell & view router
│   ├── main.tsx                 # React DOM entry point
│   ├── index.css                # Global styles
│   ├── components/              # All UI components
│   │   ├── animation/           # Cartoon & visual animation stages
│   │   │   ├── CartoonStage.tsx
│   │   │   ├── CartoonCharacter.tsx
│   │   │   ├── GraphCartoonStage.tsx
│   │   │   └── SpeechBubble.tsx
│   │   ├── AlgorithmComparator.tsx
│   │   ├── CheggNavbar.tsx
│   │   ├── ComplexityCard.tsx
│   │   ├── CodeTraceView.tsx
│   │   ├── DryRunWorksheet.tsx
│   │   ├── LiveClassroomSession.tsx
│   │   ├── MasterTheoremSolver.tsx
│   │   ├── PlaybackDeck.tsx
│   │   ├── RealtimeVariableWatcher.tsx
│   │   ├── SearchModal.tsx
│   │   ├── StepPredictionQuiz.tsx
│   │   └── VisualizerCanvas.tsx
│   ├── data/
│   │   └── daaData.ts           # Full 16-unit syllabus data & algorithm metadata
│   ├── engine/
│   │   ├── algorithmRegistry.ts # Central dispatcher for all 35+ algorithm runners
│   │   ├── types.ts             # Shared TypeScript types (AlgorithmStep, etc.)
│   │   └── algorithms/          # Step-generator implementations per paradigm
│   └── utils/
│       └── soundEffects.ts      # Web Audio API sound engine
├── index.html                   # HTML entry point
├── vite.config.ts               # Vite + Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts
```

---

## 🎮 How to Use

1. **Select an Algorithm** — Use the top navbar categories, the dropdown selector, or press **Ctrl+K** to search by name.
2. **Choose View Mode** — Switch between 🎨 **Cartoon Stage** (animated characters) and ⚙️ **Engineering Canvas** (technical diagram).
3. **Control Playback** — Use Play, Step Forward, Step Backward, or scrub the progress bar.
4. **Adjust Speed** — Change playback speed from 0.5x to 4x.
5. **Custom Input** — Click Custom (for sort/search algorithms) to enter your own array.
6. **Explore Tabs** — Switch between Complexity, Dry-Run Worksheet, Multi-Language Code, Quiz, and Summary tabs below the visualizer.
7. **Mark Progress** — Click **Mark Mastered** on any algorithm to track your study progress.

---

## 🏫 Course Information

| | |
|---|---|
| **Course Code** | 23CS401 |
| **Course Title** | Design and Analysis of Algorithms |
| **Institution** | Kumaraguru College of Technology (KCT), Coimbatore |
| **Department** | Computer Science & Engineering |
| **Semester** | 5th Semester |
| **Regulation** | Autonomous 2023-2026 |

---

<div align="center">
  <sub>Made with love for KCT CSE 23CS401 · Bharthi DAA Visualizer · 2025-2026</sub>
</div>
