// Graph Algorithms: BFS, DFS, Dijkstra, Kruskal's MST, and Prim's MST
import { AlgorithmStep, GraphNodeState, GraphEdgeState } from '../types';

export function generateBfsSteps(): AlgorithmStep[] {
  const nodes: GraphNodeState[] = [
    { id: 'A', label: 'A (Src)', x: 18, y: 30, status: 'unvisited', distance: '∞' },
    { id: 'B', label: 'B', x: 45, y: 18, status: 'unvisited', distance: '∞' },
    { id: 'C', label: 'C', x: 28, y: 75, status: 'unvisited', distance: '∞' },
    { id: 'D', label: 'D', x: 55, y: 68, status: 'unvisited', distance: '∞' },
    { id: 'E', label: 'E', x: 80, y: 25, status: 'unvisited', distance: '∞' },
    { id: 'F', label: 'F', x: 82, y: 78, status: 'unvisited', distance: '∞' }
  ];

  const edges: GraphEdgeState[] = [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'D', weight: 5 },
    { from: 'B', to: 'E', weight: 10 },
    { from: 'C', to: 'D', weight: 3 },
    { from: 'D', to: 'F', weight: 1 },
    { from: 'E', to: 'F', weight: 7 }
  ];

  const steps: AlgorithmStep[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 6,
    description: "BFS (Breadth-First Search): Starting from source node 'A'. Initialize Queue = ['A']. Set dist[A] = 0.",
    codeLine: 1,
    graphNodes: nodes.map(n => n.id === 'A' ? { ...n, status: 'visiting', distance: '0' } : n),
    graphEdges: edges,
    queueState: ['A'],
    variables: { queue: "['A']", visited: '{A}', current: 'A' },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  steps.push({
    stepIndex: 1,
    totalSteps: 6,
    description: "Dequeue 'A'. Discover unvisited neighbors: 'B' (dist=1) and 'C' (dist=1). Enqueue both.",
    codeLine: 3,
    graphNodes: nodes.map(n => {
      if (n.id === 'A') return { ...n, status: 'visited', distance: '0' };
      if (n.id === 'B' || n.id === 'C') return { ...n, status: 'visiting', distance: '1', predecessor: 'A' };
      return n;
    }),
    graphEdges: edges.map(e => e.from === 'A' ? { ...e, isHighlighted: true } : e),
    queueState: ['B', 'C'],
    variables: { current: 'A', queue: "['B', 'C']", level: '1' },
    comparisonsCount: 2,
    swapsCount: 0,
    stats: { comparisons: 2, swaps: 0, operations: 3 }
  });

  steps.push({
    stepIndex: 2,
    totalSteps: 6,
    description: "Dequeue 'B'. Explore neighbors: 'D' (dist=2) and 'E' (dist=2). Enqueue both.",
    codeLine: 4,
    graphNodes: nodes.map(n => {
      if (n.id === 'A' || n.id === 'B') return { ...n, status: 'visited' };
      if (n.id === 'C') return { ...n, status: 'visiting', distance: '1' };
      if (n.id === 'D' || n.id === 'E') return { ...n, status: 'visiting', distance: '2', predecessor: 'B' };
      return n;
    }),
    graphEdges: edges.map(e => (e.from === 'B' && (e.to === 'D' || e.to === 'E')) || (e.from === 'A' && e.to === 'C') ? { ...e, isHighlighted: true } : e),
    queueState: ['C', 'D', 'E'],
    variables: { current: 'B', queue: "['C', 'D', 'E']", level: '2' },
    comparisonsCount: 4,
    swapsCount: 0,
    stats: { comparisons: 4, swaps: 0, operations: 5 }
  });

  steps.push({
    stepIndex: 3,
    totalSteps: 6,
    description: "Dequeue 'C'. Neighbor 'D' is already discovered in queue. Mark 'C' as visited.",
    codeLine: 4,
    graphNodes: nodes.map(n => {
      if (n.id === 'A' || n.id === 'B' || n.id === 'C') return { ...n, status: 'visited' };
      if (n.id === 'D' || n.id === 'E') return { ...n, status: 'visiting', distance: '2' };
      return n;
    }),
    graphEdges: edges,
    queueState: ['D', 'E'],
    variables: { current: 'C', queue: "['D', 'E']" },
    comparisonsCount: 5,
    swapsCount: 0,
    stats: { comparisons: 5, swaps: 0, operations: 6 }
  });

  steps.push({
    stepIndex: 4,
    totalSteps: 6,
    description: "Dequeue 'D'. Discover neighbor 'F' at distance 3. Enqueue 'F'.",
    codeLine: 5,
    graphNodes: nodes.map(n => {
      if (n.id === 'F') return { ...n, status: 'visiting', distance: '3', predecessor: 'D' };
      if (n.id === 'E') return { ...n, status: 'visiting' };
      return { ...n, status: 'visited' };
    }),
    graphEdges: edges.map(e => e.from === 'D' && e.to === 'F' ? { ...e, isHighlighted: true } : e),
    queueState: ['E', 'F'],
    variables: { current: 'D', queue: "['E', 'F']" },
    comparisonsCount: 6,
    swapsCount: 0,
    stats: { comparisons: 6, swaps: 0, operations: 8 }
  });

  steps.push({
    stepIndex: 5,
    totalSteps: 6,
    description: "Dequeue 'E' & 'F'. All reachable vertices visited! BFS Order: A -> B -> C -> D -> E -> F. Shortest hops computed.",
    codeLine: 7,
    graphNodes: nodes.map(n => ({ ...n, status: 'in_path' })),
    graphEdges: edges.map(e => ({ ...e, isHighlighted: true })),
    queueState: [],
    variables: { status: 'BFS_COMPLETE', order: 'A, B, C, D, E, F', time: 'O(V + E)', space: 'O(V)' },
    comparisonsCount: 7,
    swapsCount: 0,
    stats: { comparisons: 7, swaps: 0, operations: 10 }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}

export function generateDfsSteps(): AlgorithmStep[] {
  const nodes: GraphNodeState[] = [
    { id: 'A', label: 'A (Src)', x: 18, y: 30, status: 'unvisited' },
    { id: 'B', label: 'B', x: 45, y: 18, status: 'unvisited' },
    { id: 'C', label: 'C', x: 28, y: 75, status: 'unvisited' },
    { id: 'D', label: 'D', x: 55, y: 68, status: 'unvisited' },
    { id: 'E', label: 'E', x: 80, y: 25, status: 'unvisited' },
    { id: 'F', label: 'F', x: 82, y: 78, status: 'unvisited' }
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

  const steps: AlgorithmStep[] = [
    {
      stepIndex: 0,
      totalSteps: 6,
      description: "DFS (Depth-First Search): Recursive / Stack exploration. Start at 'A'. Push to Call Stack.",
      codeLine: 1,
      graphNodes: nodes.map(n => n.id === 'A' ? { ...n, status: 'visiting' } : n),
      graphEdges: edges,
      stackState: ['A'],
      variables: { current: 'A', call_stack: "['A']" },
      comparisonsCount: 0,
      swapsCount: 0,
      stats: { comparisons: 0, swaps: 0, operations: 1 }
    },
    {
      stepIndex: 1,
      totalSteps: 6,
      description: "From 'A', dive deeper into first neighbor 'B'. Push 'B' to Call Stack.",
      codeLine: 2,
      graphNodes: nodes.map(n => n.id === 'A' ? { ...n, status: 'visited' } : n.id === 'B' ? { ...n, status: 'visiting' } : n),
      graphEdges: edges.map(e => e.from === 'A' && e.to === 'B' ? { ...e, isHighlighted: true } : e),
      stackState: ['A', 'B'],
      variables: { current: 'B', depth: '1' },
      comparisonsCount: 1,
      swapsCount: 0,
      stats: { comparisons: 1, swaps: 0, operations: 2 }
    },
    {
      stepIndex: 2,
      totalSteps: 6,
      description: "From 'B', dive deeper into neighbor 'D'. Push 'D' to Call Stack.",
      codeLine: 3,
      graphNodes: nodes.map(n => (n.id === 'A' || n.id === 'B') ? { ...n, status: 'visited' } : n.id === 'D' ? { ...n, status: 'visiting' } : n),
      graphEdges: edges.map(e => (e.from === 'A' && e.to === 'B') || (e.from === 'B' && e.to === 'D') ? { ...e, isHighlighted: true } : e),
      stackState: ['A', 'B', 'D'],
      variables: { current: 'D', depth: '2' },
      comparisonsCount: 2,
      swapsCount: 0,
      stats: { comparisons: 2, swaps: 0, operations: 3 }
    },
    {
      stepIndex: 3,
      totalSteps: 6,
      description: "From 'D', dive deeper into neighbor 'F'. Push 'F' to Call Stack.",
      codeLine: 3,
      graphNodes: nodes.map(n => (n.id === 'A' || n.id === 'B' || n.id === 'D') ? { ...n, status: 'visited' } : n.id === 'F' ? { ...n, status: 'visiting' } : n),
      graphEdges: edges.map(e => (e.from === 'A' && e.to === 'B') || (e.from === 'B' && e.to === 'D') || (e.from === 'D' && e.to === 'F') ? { ...e, isHighlighted: true } : e),
      stackState: ['A', 'B', 'D', 'F'],
      variables: { current: 'F', depth: '3' },
      comparisonsCount: 3,
      swapsCount: 0,
      stats: { comparisons: 3, swaps: 0, operations: 4 }
    },
    {
      stepIndex: 4,
      totalSteps: 6,
      description: "From 'F', reach neighbor 'E'. 'E' has no more unvisited neighbors. Backtrack up the stack.",
      codeLine: 5,
      graphNodes: nodes.map(n => n.id === 'C' ? n : { ...n, status: 'visited' }),
      graphEdges: edges.map(e => (e.from === 'E' && e.to === 'F') || (e.from === 'D' && e.to === 'F') || (e.from === 'B' && e.to === 'D') || (e.from === 'A' && e.to === 'B') ? { ...e, isHighlighted: true } : e),
      stackState: ['A', 'C'],
      variables: { current: 'E -> Backtracking', depth: '2' },
      comparisonsCount: 5,
      swapsCount: 0,
      stats: { comparisons: 5, swaps: 0, operations: 6 }
    },
    {
      stepIndex: 5,
      totalSteps: 6,
      description: "Backtracked to 'A', visit final branch 'C'. All vertices traversed in DFS tree order: A-B-D-F-E-C.",
      codeLine: 6,
      graphNodes: nodes.map(n => ({ ...n, status: 'in_path' })),
      graphEdges: edges.map(e => ({ ...e, isHighlighted: true })),
      stackState: [],
      variables: { status: 'DFS_COMPLETE', order: 'A, B, D, F, E, C', time: 'O(V + E)', space: 'O(V)' },
      comparisonsCount: 7,
      swapsCount: 0,
      stats: { comparisons: 7, swaps: 0, operations: 8 }
    }
  ];

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}

export function generateDijkstraSteps(): AlgorithmStep[] {
  const nodes: GraphNodeState[] = [
    { id: 'A', label: 'A (0)', x: 18, y: 30, status: 'unvisited', distance: '0' },
    { id: 'B', label: 'B (∞)', x: 45, y: 18, status: 'unvisited', distance: '∞' },
    { id: 'C', label: 'C (∞)', x: 28, y: 75, status: 'unvisited', distance: '∞' },
    { id: 'D', label: 'D (∞)', x: 55, y: 68, status: 'unvisited', distance: '∞' },
    { id: 'E', label: 'E (∞)', x: 80, y: 25, status: 'unvisited', distance: '∞' },
    { id: 'F', label: 'F (∞)', x: 82, y: 78, status: 'unvisited', distance: '∞' }
  ];

  const edges: GraphEdgeState[] = [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'D', weight: 5 },
    { from: 'B', to: 'E', weight: 10 },
    { from: 'C', to: 'D', weight: 3 },
    { from: 'D', to: 'F', weight: 1 },
    { from: 'E', to: 'F', weight: 7 }
  ];

  const steps: AlgorithmStep[] = [
    {
      stepIndex: 0,
      totalSteps: 6,
      description: "Dijkstra's Shortest Path: Greedy relaxation of edges. Start at node A with distance dist[A]=0. All others = ∞.",
      codeLine: 1,
      graphNodes: nodes.map(n => n.id === 'A' ? { ...n, status: 'visiting', distance: '0' } : n),
      graphEdges: edges,
      variables: { min_node: 'A', 'dist[A]': '0', settled: '{}' },
      comparisonsCount: 0,
      swapsCount: 0,
      stats: { comparisons: 0, swaps: 0, operations: 1 }
    },
    {
      stepIndex: 1,
      totalSteps: 6,
      description: "Extract min unsettled node 'A' (dist=0). Relax outgoing edges: dist[C]=min(∞, 0+2)=2, dist[B]=min(∞, 0+4)=4.",
      codeLine: 3,
      graphNodes: nodes.map(n => {
        if (n.id === 'A') return { ...n, status: 'visited', distance: '0' };
        if (n.id === 'C') return { ...n, distance: '2', predecessor: 'A' };
        if (n.id === 'B') return { ...n, distance: '4', predecessor: 'A' };
        return n;
      }),
      graphEdges: edges.map(e => e.from === 'A' ? { ...e, isHighlighted: true } : e),
      variables: { settled: '{A}', 'dist[C]': '2', 'dist[B]': '4', next_min: 'C' },
      comparisonsCount: 2,
      swapsCount: 0,
      stats: { comparisons: 2, swaps: 0, operations: 3 }
    },
    {
      stepIndex: 2,
      totalSteps: 6,
      description: "Extract min unsettled node 'C' (dist=2). Relax edge (C,D) weight 3: dist[D] = min(∞, 2+3) = 5.",
      codeLine: 4,
      graphNodes: nodes.map(n => {
        if (n.id === 'A' || n.id === 'C') return { ...n, status: 'visited' };
        if (n.id === 'D') return { ...n, distance: '5', predecessor: 'C' };
        if (n.id === 'B') return { ...n, distance: '4' };
        return n;
      }),
      graphEdges: edges.map(e => (e.from === 'A') || (e.from === 'C' && e.to === 'D') ? { ...e, isHighlighted: true } : e),
      variables: { settled: '{A, C}', 'dist[D]': '5', next_min: 'B' },
      comparisonsCount: 4,
      swapsCount: 0,
      stats: { comparisons: 4, swaps: 0, operations: 5 }
    },
    {
      stepIndex: 3,
      totalSteps: 6,
      description: "Extract min node 'B' (dist=4). Relax (B,D) weight 5: 4+5=9 > current dist[D]=5 (no update). Relax (B,E) weight 10: dist[E]=14.",
      codeLine: 4,
      graphNodes: nodes.map(n => {
        if (n.id === 'A' || n.id === 'B' || n.id === 'C') return { ...n, status: 'visited' };
        if (n.id === 'D') return { ...n, distance: '5' };
        if (n.id === 'E') return { ...n, distance: '14', predecessor: 'B' };
        return n;
      }),
      graphEdges: edges.map(e => e.from === 'B' && e.to === 'E' ? { ...e, isHighlighted: true } : e),
      variables: { settled: '{A, C, B}', 'dist[E]': '14', next_min: 'D' },
      comparisonsCount: 6,
      swapsCount: 0,
      stats: { comparisons: 6, swaps: 0, operations: 7 }
    },
    {
      stepIndex: 4,
      totalSteps: 6,
      description: "Extract min node 'D' (dist=5). Relax (D,F) weight 1: dist[F] = min(∞, 5+1) = 6.",
      codeLine: 4,
      graphNodes: nodes.map(n => {
        if (n.id === 'F') return { ...n, distance: '6', predecessor: 'D' };
        if (n.id === 'E') return { ...n, distance: '14' };
        return { ...n, status: 'visited' };
      }),
      graphEdges: edges.map(e => e.from === 'D' && e.to === 'F' ? { ...e, isHighlighted: true } : e),
      variables: { settled: '{A, C, B, D}', 'dist[F]': '6', next_min: 'F' },
      comparisonsCount: 8,
      swapsCount: 0,
      stats: { comparisons: 8, swaps: 0, operations: 9 }
    },
    {
      stepIndex: 5,
      totalSteps: 6,
      description: "Shortest Paths from A finalized! A->C (2), A->B (4), A->D (5), A->F (6), A->E (13 via F). Time: O((V+E) log V).",
      codeLine: 6,
      graphNodes: nodes.map(n => ({ ...n, status: 'in_path' })),
      graphEdges: edges.map(e => ({ ...e, isHighlighted: true })),
      variables: { status: 'OPTIMAL_SHORTEST_PATHS', 'dist[F]': '6', time: 'O((V+E)log V)' },
      comparisonsCount: 10,
      swapsCount: 0,
      stats: { comparisons: 10, swaps: 0, operations: 11 }
    }
  ];

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}

export function generateKruskalSteps(): AlgorithmStep[] {
  const nodes: GraphNodeState[] = [
    { id: 'A', label: 'A', x: 18, y: 30, status: 'unvisited' },
    { id: 'B', label: 'B', x: 45, y: 18, status: 'unvisited' },
    { id: 'C', label: 'C', x: 28, y: 75, status: 'unvisited' },
    { id: 'D', label: 'D', x: 55, y: 68, status: 'unvisited' },
    { id: 'E', label: 'E', x: 80, y: 25, status: 'unvisited' },
    { id: 'F', label: 'F', x: 82, y: 78, status: 'unvisited' }
  ];

  // Sorted edges by weight
  const edges: GraphEdgeState[] = [
    { from: 'D', to: 'F', weight: 1 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'C', to: 'D', weight: 3 },
    { from: 'A', to: 'B', weight: 4 },
    { from: 'B', to: 'D', weight: 5 },
    { from: 'E', to: 'F', weight: 7 },
    { from: 'B', to: 'E', weight: 10 }
  ];

  const steps: AlgorithmStep[] = [
    {
      stepIndex: 0,
      totalSteps: 6,
      description: "Kruskal's MST: Sort all 7 edges by weight. Use Disjoint Set Union (DSU) to prevent cycles.",
      codeLine: 1,
      graphNodes: nodes,
      graphEdges: edges,
      mstWeight: 0,
      variables: { sorted_edges: '(D,F:1), (A,C:2), (C,D:3), (A,B:4), (B,D:5), (E,F:7), (B,E:10)', mst_weight: '0' },
      comparisonsCount: 0,
      swapsCount: 0,
      stats: { comparisons: 0, swaps: 0, operations: 1 }
    },
    {
      stepIndex: 1,
      totalSteps: 6,
      description: "Edge 1: (D, F) weight 1. find(D) != find(F). ACCEPT into MST. Total weight = 1.",
      codeLine: 3,
      graphNodes: nodes.map(n => (n.id === 'D' || n.id === 'F') ? { ...n, status: 'visited' } : n),
      graphEdges: edges.map(e => e.from === 'D' && e.to === 'F' ? { ...e, isInMst: true } : e),
      mstWeight: 1,
      variables: { accepted_edge: '(D, F, w=1)', sets: '{D,F}, {A}, {B}, {C}, {E}', mst_weight: '1' },
      comparisonsCount: 1,
      swapsCount: 0,
      stats: { comparisons: 1, swaps: 0, operations: 2 }
    },
    {
      stepIndex: 2,
      totalSteps: 6,
      description: "Edge 2: (A, C) weight 2. find(A) != find(C). ACCEPT into MST. Total weight = 3.",
      codeLine: 3,
      graphNodes: nodes.map(n => (n.id === 'A' || n.id === 'C' || n.id === 'D' || n.id === 'F') ? { ...n, status: 'visited' } : n),
      graphEdges: edges.map(e => (e.from === 'D' && e.to === 'F') || (e.from === 'A' && e.to === 'C') ? { ...e, isInMst: true } : e),
      mstWeight: 3,
      variables: { accepted_edge: '(A, C, w=2)', sets: '{A,C}, {D,F}, {B}, {E}', mst_weight: '3' },
      comparisonsCount: 2,
      swapsCount: 0,
      stats: { comparisons: 2, swaps: 0, operations: 3 }
    },
    {
      stepIndex: 3,
      totalSteps: 6,
      description: "Edge 3: (C, D) weight 3. Connects components {A,C} and {D,F}. ACCEPT into MST. Total weight = 6.",
      codeLine: 3,
      graphNodes: nodes.map(n => n.id === 'B' || n.id === 'E' ? n : { ...n, status: 'visited' }),
      graphEdges: edges.map(e => ((e.from === 'D' && e.to === 'F') || (e.from === 'A' && e.to === 'C') || (e.from === 'C' && e.to === 'D')) ? { ...e, isInMst: true } : e),
      mstWeight: 6,
      variables: { accepted_edge: '(C, D, w=3)', sets: '{A,C,D,F}, {B}, {E}', mst_weight: '6' },
      comparisonsCount: 3,
      swapsCount: 0,
      stats: { comparisons: 3, swaps: 0, operations: 4 }
    },
    {
      stepIndex: 4,
      totalSteps: 6,
      description: "Edge 4: (A, B) weight 4. Connects B to {A,C,D,F}. ACCEPT into MST. Total weight = 10.",
      codeLine: 3,
      graphNodes: nodes.map(n => n.id === 'E' ? n : { ...n, status: 'visited' }),
      graphEdges: edges.map(e => ((e.from === 'D' && e.to === 'F') || (e.from === 'A' && e.to === 'C') || (e.from === 'C' && e.to === 'D') || (e.from === 'A' && e.to === 'B')) ? { ...e, isInMst: true } : e),
      mstWeight: 10,
      variables: { accepted_edge: '(A, B, w=4)', sets: '{A,B,C,D,F}, {E}', mst_weight: '10' },
      comparisonsCount: 4,
      swapsCount: 0,
      stats: { comparisons: 4, swaps: 0, operations: 5 }
    },
    {
      stepIndex: 5,
      totalSteps: 6,
      description: "Edge 5 (B,D) weight 5 creates a CYCLE, so REJECT. Edge 6 (E,F) weight 7 is ACCEPTED. MST complete with V-1 = 5 edges! Total weight = 17.",
      codeLine: 5,
      graphNodes: nodes.map(n => ({ ...n, status: 'in_path' })),
      graphEdges: edges.map(e => ((e.from === 'D' && e.to === 'F') || (e.from === 'A' && e.to === 'C') || (e.from === 'C' && e.to === 'D') || (e.from === 'A' && e.to === 'B') || (e.from === 'E' && e.to === 'F')) ? { ...e, isInMst: true } : { ...e, isDiscarded: true }),
      mstWeight: 17,
      variables: { status: 'KRUSKAL_MST_COMPLETE', total_edges: '5', final_mst_weight: '17', time: 'O(E log E)' },
      comparisonsCount: 6,
      swapsCount: 0,
      stats: { comparisons: 6, swaps: 0, operations: 7 }
    }
  ];

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}
