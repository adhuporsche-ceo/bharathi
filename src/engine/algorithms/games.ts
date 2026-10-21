// Games & Adversarial Search Trace Generator
// Implements: Minimax with Alpha-Beta Pruning, Game of Nim (Bouton's Theorem)
import { AlgorithmStep, MinimaxNode } from '../types';

export function generateMinimaxSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];

  // Tree representation of Depth 2 Game Tree
  // Level 0: Root (MAX)
  // Level 1: Left child (MIN), Right child (MIN)
  // Level 2: Leaves (Left: 3, 5; Right: 6, 9)
  const initialNodes: MinimaxNode[] = [
    { id: 'root', label: 'Root (MAX)', depth: 0, isMax: true, isCurrent: true, alpha: -Infinity, beta: Infinity },
    { id: 'left_min', label: 'L (MIN)', depth: 1, isMax: false, alpha: -Infinity, beta: Infinity },
    { id: 'right_min', label: 'R (MIN)', depth: 1, isMax: false, alpha: -Infinity, beta: Infinity },
    { id: 'leaf_1', label: 'Leaf A (3)', value: 3, depth: 2, isMax: true },
    { id: 'leaf_2', label: 'Leaf B (5)', value: 5, depth: 2, isMax: true },
    { id: 'leaf_3', label: 'Leaf C (6)', value: 6, depth: 2, isMax: true },
    { id: 'leaf_4', label: 'Leaf D (9)', value: 9, depth: 2, isMax: true }
  ];

  steps.push({
    stepIndex: 0,
    totalSteps: 6,
    description: 'Minimax with Alpha-Beta Pruning initialized. MAX aims to maximize payoff; MIN aims to minimize it. Alpha = -∞ (best MAX bound), Beta = +∞ (best MIN bound).',
    codeLine: 1,
    minimaxTreeState: {
      nodes: initialNodes.map(n => ({ ...n })),
      currentId: 'root'
    },
    variables: {
      'Alpha (MAX bound)': '-inf',
      'Beta (MIN bound)': '+inf',
      'Tree Depth': '2',
      'Pruning Condition': 'If alpha >= beta, prune the remaining sibling subtrees'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  steps.push({
    stepIndex: 1,
    totalSteps: 6,
    description: "Evaluating Left Subtree (MIN). Inspect Leaf A (3) and Leaf B (5). MIN chooses min(3, 5) = 3.",
    codeLine: 3,
    minimaxTreeState: {
      nodes: initialNodes.map(n => {
        if (n.id === 'left_min') return { ...n, value: 3, isCurrent: true };
        return n;
      }),
      currentId: 'left_min'
    },
    variables: {
      'Left Subtree Value': '3',
      'MIN Decision': 'min(3, 5) = 3',
      'Alpha Updated': 'max(-inf, 3) = 3'
    },
    stats: { comparisons: 2, swaps: 0, operations: 3 }
  });

  steps.push({
    stepIndex: 2,
    totalSteps: 6,
    description: "Back at Root (MAX): Value updated to 3. New Alpha bound = 3. Now exploring Right Subtree (MIN) with Alpha=3, Beta=+∞.",
    codeLine: 4,
    minimaxTreeState: {
      nodes: initialNodes.map(n => {
        if (n.id === 'root') return { ...n, value: 3, alpha: 3, isCurrent: true };
        if (n.id === 'left_min') return { ...n, value: 3 };
        return n;
      }),
      currentId: 'root'
    },
    variables: {
      'Root Value': '3',
      'Alpha': '3',
      'Beta': '+inf',
      'Target': 'Right Child must produce > 3 for MAX to switch'
    },
    stats: { comparisons: 3, swaps: 0, operations: 4 }
  });

  steps.push({
    stepIndex: 3,
    totalSteps: 6,
    description: "Evaluating Right Subtree (MIN). Inspect Leaf C (6). MIN updates its beta to min(+inf, 6) = 6.",
    codeLine: 5,
    minimaxTreeState: {
      nodes: initialNodes.map(n => {
        if (n.id === 'right_min') return { ...n, isCurrent: true, beta: 6 };
        return n;
      }),
      currentId: 'right_min'
    },
    variables: {
      'Right Min Beta': '6',
      'Alpha': '3',
      'Check': 'alpha (3) < beta (6), proceed to Leaf D'
    },
    stats: { comparisons: 4, swaps: 0, operations: 5 }
  });

  steps.push({
    stepIndex: 4,
    totalSteps: 6,
    description: "Inspect Leaf D (9). MIN chooses min(6, 9) = 6. Right Subtree returns 6 to Root.",
    codeLine: 6,
    minimaxTreeState: {
      nodes: initialNodes.map(n => {
        if (n.id === 'right_min') return { ...n, value: 6 };
        return n;
      }),
      currentId: 'right_min'
    },
    variables: {
      'Right Subtree Value': '6',
      'MIN Decision': 'min(6, 9) = 6'
    },
    stats: { comparisons: 5, swaps: 0, operations: 6 }
  });

  steps.push({
    stepIndex: 5,
    totalSteps: 6,
    description: "Root (MAX) chooses max(Left=3, Right=6) = 6! Optimal strategy: MAX chooses Right branch to guarantee payoff >= 6.",
    codeLine: 7,
    minimaxTreeState: {
      nodes: initialNodes.map(n => {
        if (n.id === 'root') return { ...n, value: 6, isCurrent: true };
        if (n.id === 'left_min') return { ...n, value: 3 };
        if (n.id === 'right_min') return { ...n, value: 6 };
        return n;
      }),
      currentId: 'root'
    },
    variables: {
      'Game Outcome': 'MAX wins with payoff 6',
      'Optimal Move': 'Branch RIGHT &rarr;',
      'Alpha-Beta Speedup': 'Can prune up to O(b^(d/2)) branches in best ordering!'
    },
    stats: { comparisons: 6, swaps: 0, operations: 7 }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}

export function generateGameOfNimSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  // 3 heaps of stones: [3, 4, 5]
  const heaps = [3, 4, 5];

  steps.push({
    stepIndex: 0,
    totalSteps: 4,
    description: "Game of Nim initialized with 3 heaps: [3, 4, 5]. Bouton's Theorem: A game position is WINNING if and only if the XOR Nim-Sum != 0.",
    codeLine: 1,
    arrayState: [...heaps],
    variables: {
      'Heap 1': '3 (binary 011)',
      'Heap 2': '4 (binary 100)',
      'Heap 3': '5 (binary 101)',
      'Theorem': 'Nim-Sum = Heap1 ⊕ Heap2 ⊕ Heap3'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  const nimSum = 3 ^ 4 ^ 5; // 011 ^ 100 ^ 101 = 010 (2)

  steps.push({
    stepIndex: 1,
    totalSteps: 4,
    description: `Compute Nim-Sum: 3 ⊕ 4 ⊕ 5 = ${nimSum} (binary 010). Since Nim-Sum != 0, Player 1 has a GUARANTEED FORCED WIN!`,
    codeLine: 3,
    arrayState: [...heaps],
    variables: {
      'Nim-Sum': `${nimSum}`,
      'Position Type': 'Winning Position (N-position)',
      'Next Move Goal': 'Make move that leaves Nim-Sum = 0 for Player 2'
    },
    stats: { comparisons: 1, swaps: 0, operations: 2 }
  });

  // To reduce to 0: target heap 1: 3 ^ 2 = 1. Reduce Heap 1 from 3 to 1 stone (remove 2 stones)
  const newHeaps = [1, 4, 5];
  const newNimSum = 1 ^ 4 ^ 5; // 001 ^ 100 ^ 101 = 0

  steps.push({
    stepIndex: 2,
    totalSteps: 4,
    description: `Optimal Winning Move: Reduce Heap 1 from 3 stones to 1 stone (take 2 stones). New heaps: [1, 4, 5].`,
    codeLine: 5,
    arrayState: [...newHeaps],
    variables: {
      'Move Taken': 'Heap 1: 3 -> 1',
      'New Heaps': '[1, 4, 5]',
      'New Nim-Sum': `1 ⊕ 4 ⊕ 5 = ${newNimSum} (P-position / Losing for opponent)`
    },
    stats: { comparisons: 2, swaps: 0, operations: 3 }
  });

  steps.push({
    stepIndex: 3,
    totalSteps: 4,
    description: `Opponent is now faced with Nim-Sum = 0. ANY move opponent makes will change Nim-Sum to non-zero, allowing Player 1 to win on every subsequent turn!`,
    codeLine: 7,
    arrayState: [...newHeaps],
    variables: {
      'Status': 'Forced Win Locked',
      'Opponent Fate': 'Zero legal moves can maintain Nim-Sum = 0',
      'Mathematical Class': 'Impartial Game / Sprague-Grundy Theorem'
    },
    stats: { comparisons: 3, swaps: 0, operations: 4 }
  });

  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: steps.length }));
}
