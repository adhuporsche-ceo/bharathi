// NP-Completeness & Approximation Algorithms Trace Generator
// Conforms to KCT 23CS401 Unit 4 Syllabus: P vs NP, Reductions, Approximations
import { AlgorithmStep, GraphNodeState, GraphEdgeState } from '../types';

export function generateVertexCoverApproxSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  // Graph with 5 vertices: A, B, C, D, E
  const nodes: GraphNodeState[] = [
    { id: 'A', label: 'A', x: 25, y: 25, status: 'unvisited' },
    { id: 'B', label: 'B', x: 75, y: 25, status: 'unvisited' },
    { id: 'C', label: 'C', x: 50, y: 55, status: 'unvisited' },
    { id: 'D', label: 'D', x: 25, y: 80, status: 'unvisited' },
    { id: 'E', label: 'E', x: 75, y: 80, status: 'unvisited' }
  ];

  const edges: GraphEdgeState[] = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'C' },
    { from: 'C', to: 'D' },
    { from: 'C', to: 'E' },
    { from: 'D', to: 'E' }
  ];

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: 'Vertex Cover 2-Approximation initialized. Minimum Vertex Cover is NP-Hard. Greedy 2-approximation: Pick arbitrary uncovered edge (u, v), add BOTH endpoints to cover, discard incident edges.',
    codeLine: 1,
    graphNodes: nodes.map(n => ({ ...n })),
    graphEdges: edges.map(e => ({ ...e })),
    variables: {
      'Problem Class': 'NP-Hard (Decision version is NP-Complete)',
      'Approximation Ratio': 'ρ = 2 (Cost <= 2 × OPT)',
      'Covering Set C': 'Empty set {}'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  // Pick edge (A, B)
  const coverNodes = ['A', 'B'];
  steps.push({
    stepIndex: 1,
    totalSteps: 4,
    description: "Step 1: Pick arbitrary uncovered edge (A, B). Add BOTH endpoints {A, B} to Vertex Cover. Discard all edges incident to A or B ((A,B), (A,C), (B,C)).",
    codeLine: 3,
    graphNodes: nodes.map(n => {
      if (coverNodes.includes(n.id)) return { ...n, status: 'visited' };
      return n;
    }),
    graphEdges: edges.map(e => {
      if ((e.from === 'A' && e.to === 'B') || (e.from === 'A' && e.to === 'C') || (e.from === 'B' && e.to === 'C')) {
        return { ...e, isHighlighted: true };
      }
      return e;
    }),
    variables: {
      'Chosen Edge': '(A, B)',
      'Endpoints Added': 'A, B',
      'Current Cover Size': '2',
      'Cover': '{A, B}'
    },
    stats: { comparisons: 1, swaps: 0, operations: 3 }
  });

  // Pick edge (D, E)
  coverNodes.push('D', 'E');
  steps.push({
    stepIndex: 2,
    totalSteps: 4,
    description: "Step 2: Remaining uncovered edges: (C, D), (C, E), (D, E). Pick edge (D, E). Add BOTH endpoints {D, E} to Vertex Cover. Incident edges covered!",
    codeLine: 4,
    graphNodes: nodes.map(n => {
      if (coverNodes.includes(n.id)) return { ...n, status: 'visited' };
      return n;
    }),
    graphEdges: edges.map(e => ({ ...e, isHighlighted: true })),
    variables: {
      'Chosen Edge': '(D, E)',
      'Endpoints Added': 'D, E',
      'Current Cover Size': '4',
      'Cover': '{A, B, D, E}'
    },
    stats: { comparisons: 2, swaps: 0, operations: 5 }
  });

  steps.push({
    stepIndex: 3,
    totalSteps: 4,
    description: "Step 3: All 6 edges covered! Cover C = {A, B, D, E} (|C|=4). Optimal cover OPT = {C, A, D} (|OPT|=3). Ratio = 4/3 <= 2! Guaranteed polynomial-time 2-approximation.",
    codeLine: 6,
    graphNodes: nodes.map(n => {
      if (coverNodes.includes(n.id)) return { ...n, status: 'in_path' };
      return n;
    }),
    graphEdges: edges.map(e => ({ ...e, isInMst: true })),
    variables: {
      'Status': 'Approximation Verified',
      'Calculated Cover Size': '4 vertices',
      'OPT Bound': 'OPT >= 2 (edges selected form a matching)',
      'Proof': '|C| = 2 × |Matching| <= 2 × OPT'
    },
    stats: { comparisons: 3, swaps: 0, operations: 6 }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateTspSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  // 4 Cities: C0, C1, C2, C3
  const nodes: GraphNodeState[] = [
    { id: '0', label: 'City A', x: 25, y: 25, status: 'unvisited' },
    { id: '1', label: 'City B', x: 75, y: 25, status: 'unvisited' },
    { id: '2', label: 'City C', x: 75, y: 75, status: 'unvisited' },
    { id: '3', label: 'City D', x: 25, y: 75, status: 'unvisited' }
  ];

  const edges: GraphEdgeState[] = [
    { from: '0', to: '1', weight: 10 },
    { from: '1', to: '2', weight: 15 },
    { from: '2', to: '3', weight: 20 },
    { from: '3', to: '0', weight: 25 },
    { from: '0', to: '2', weight: 35 },
    { from: '1', to: '3', weight: 30 }
  ];

  steps.push({
    stepIndex: 0,
    totalSteps: 4,
    description: 'Traveling Salesperson Problem (TSP) initialized. Objective: Find minimal-weight Hamiltonian cycle visiting every city exactly once and returning home. NP-Hard problem.',
    codeLine: 1,
    graphNodes: nodes.map(n => ({ ...n })),
    graphEdges: edges.map(e => ({ ...e })),
    variables: {
      'Cities': 'A, B, C, D (4 cities)',
      'Possible Tours': '(4 - 1)! / 2 = 3 unique Hamiltonian cycles',
      'Brute Force': 'O((n - 1)!)',
      'Held-Karp DP': 'O(n² · 2ⁿ)'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  steps.push({
    stepIndex: 1,
    totalSteps: 4,
    description: 'Evaluating Candidate Tour 1: A -> B (10) -> D (30) -> C (20) -> A (35). Total Cost = 10 + 30 + 20 + 35 = 95.',
    codeLine: 3,
    graphNodes: nodes.map(n => ({ ...n, status: 'visited' })),
    graphEdges: edges.map(e => {
      if ((e.from === '0' && e.to === '1') || (e.from === '1' && e.to === '3') || (e.from === '2' && e.to === '3') || (e.from === '0' && e.to === '2')) {
        return { ...e, isHighlighted: true };
      }
      return e;
    }),
    variables: {
      'Candidate Tour 1': 'A -> B -> D -> C -> A',
      'Tour Cost': '95 units',
      'Current Best': '95'
    },
    stats: { comparisons: 1, swaps: 0, operations: 3 }
  });

  steps.push({
    stepIndex: 2,
    totalSteps: 4,
    description: 'Evaluating Candidate Tour 2 (Perimeter): A -> B (10) -> C (15) -> D (20) -> A (25). Total Cost = 10 + 15 + 20 + 25 = 70. NEW BEST!',
    codeLine: 5,
    graphNodes: nodes.map(n => ({ ...n, status: 'in_path' })),
    graphEdges: edges.map(e => {
      if ((e.from === '0' && e.to === '1') || (e.from === '1' && e.to === '2') || (e.from === '2' && e.to === '3') || (e.from === '3' && e.to === '0')) {
        return { ...e, isInMst: true };
      }
      return e;
    }),
    variables: {
      'Candidate Tour 2': 'A -> B -> C -> D -> A',
      'Tour Cost': '70 units (10+15+20+25)',
      'Status': 'New Global Minimum'
    },
    stats: { comparisons: 2, swaps: 0, operations: 5 }
  });

  steps.push({
    stepIndex: 3,
    totalSteps: 4,
    description: 'Optimal TSP Tour verified! Minimum cost Hamiltonian cycle is A -> B -> C -> D -> A with length 70 units.',
    codeLine: 7,
    graphNodes: nodes.map(n => ({ ...n, status: 'in_path' })),
    graphEdges: edges.map(e => {
      if ((e.from === '0' && e.to === '1') || (e.from === '1' && e.to === '2') || (e.from === '2' && e.to === '3') || (e.from === '3' && e.to === '0')) {
        return { ...e, isInMst: true };
      }
      return e;
    }),
    variables: {
      'Optimal Tour': 'A -> B -> C -> D -> A',
      'Minimal Cost': '70 units',
      'Time Complexity': 'Held-Karp: O(n² · 2ⁿ)'
    },
    stats: { comparisons: 3, swaps: 0, operations: 6 }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}
