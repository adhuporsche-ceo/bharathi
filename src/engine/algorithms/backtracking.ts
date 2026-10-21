// Backtracking: N-Queens, Rat in a Maze, and Subset Sum
import { AlgorithmStep } from '../types';

export function generateNQueensSteps(n = 4): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const board: number[] = []; // board[row] = col
  let comparisons = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: `${n}-Queens Backtracking: Place ${n} non-attacking queens on an ${n}×${n} chessboard. Constraint: No two queens share a row, column, or diagonal.`,
    codeLine: 1,
    queensPlacement: [],
    variables: { board_size: `${n}x${n}`, current_row: '0', queens_placed: '0' },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  function isSafe(row: number, col: number): boolean {
    for (let r = 0; r < row; r++) {
      comparisons++;
      const c = board[r];
      if (c === col || Math.abs(c - col) === Math.abs(r - row)) {
        return false;
      }
    }
    return true;
  }

  let solutionFound = false;

  function solve(row: number): boolean {
    if (row === n) {
      solutionFound = true;
      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `VALID ${n}-QUEENS SOLUTION FOUND! Placed all ${n} queens without conflicts: [${board.map((c, r) => `(${r},${c})`).join(', ')}].`,
        codeLine: 2,
        queensPlacement: [...board],
        variables: { status: 'SOLUTION_FOUND', row: `${row}`, positions: board.join(', ') },
        comparisonsCount: comparisons,
        swapsCount: 0,
        stats: { comparisons, swaps: 0, operations: steps.length }
      });
      return true;
    }

    for (let col = 0; col < n; col++) {
      const safe = isSafe(row, col);

      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `Row ${row}: Testing Queen placement at Column ${col}. ${safe ? 'SAFE: No column or diagonal threats. Advance to next row.' : 'CONFLICT: Threatened by existing queen. Prune branch.'}`,
        codeLine: 4,
        queensPlacement: [...board, col],
        variables: { row: `${row}`, col: `${col}`, status: safe ? 'SAFE' : 'PRUNED' },
        comparisonsCount: comparisons,
        swapsCount: 0,
        stats: { comparisons, swaps: 0, operations: steps.length }
      });

      if (safe) {
        board.push(col);
        if (solve(row + 1)) return true;
        // Backtrack
        board.pop();
        steps.push({
          stepIndex: steps.length,
          totalSteps: 1,
          description: `BACKTRACK: No valid solution found deeper in subtree. Remove Queen from Row ${row}, Column ${col}.`,
          codeLine: 6,
          queensPlacement: [...board],
          variables: { row: `${row}`, col: `${col}`, status: 'BACKTRACK' },
          comparisonsCount: comparisons,
          swapsCount: 0,
          stats: { comparisons, swaps: 0, operations: steps.length }
        });
      }
    }

    return false;
  }

  solve(0);

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateRatInMazeSteps(): AlgorithmStep[] {
  const maze: number[][] = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1]
  ];
  const n = 4;
  const path: Array<[number, number]> = [];
  const steps: AlgorithmStep[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: 'Rat in a Maze: Find path from Start (0,0) to Exit (3,3). 1 = Open Path, 0 = Wall Barrier.',
    codeLine: 1,
    mazeGrid: maze,
    mazePath: [],
    mazeCurrent: [0, 0],
    variables: { start: '(0,0)', destination: '(3,3)', status: 'Starting search' },
    comparisonsCount: 0,
    swapsCount: 0,
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  const visited: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

  function solve(r: number, c: number): boolean {
    if (r === n - 1 && c === n - 1) {
      path.push([r, c]);
      steps.push({
        stepIndex: steps.length,
        totalSteps: 1,
        description: `GOAL REACHED! Rat safely navigated to Exit (3,3)! Total steps in path: ${path.length}.`,
        codeLine: 3,
        mazeGrid: maze,
        mazePath: [...path],
        mazeCurrent: [r, c],
        variables: { status: 'EXIT_REACHED', path: path.map(p => `(${p[0]},${p[1]})`).join('->') },
        comparisonsCount: steps.length,
        swapsCount: 0,
        stats: { comparisons: steps.length, swaps: 0, operations: steps.length }
      });
      return true;
    }

    visited[r][c] = true;
    path.push([r, c]);

    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Rat moves to cell (${r}, ${c}). Exploring directions: Down, Right, Up, Left.`,
      codeLine: 4,
      mazeGrid: maze,
      mazePath: [...path],
      mazeCurrent: [r, c],
      variables: { current_cell: `(${r}, ${c})`, visited_count: `${path.length}` },
      comparisonsCount: steps.length,
      swapsCount: 0,
      stats: { comparisons: steps.length, swaps: 0, operations: steps.length }
    });

    const moves: Array<[number, number, string]> = [
      [r + 1, c, 'Down'],
      [r, c + 1, 'Right'],
      [r - 1, c, 'Up'],
      [r, c - 1, 'Left']
    ];

    for (const [nr, nc, dir] of moves) {
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && maze[nr][nc] === 1 && !visited[nr][nc]) {
        if (solve(nr, nc)) return true;
      }
    }

    // Backtrack
    path.pop();
    steps.push({
      stepIndex: steps.length,
      totalSteps: 1,
      description: `Dead end at (${r}, ${c}). BACKTRACKING to previous cell.`,
      codeLine: 6,
      mazeGrid: maze,
      mazePath: [...path],
      mazeCurrent: path.length > 0 ? path[path.length - 1] : [0, 0],
      variables: { dead_end: `(${r}, ${c})`, status: 'BACKTRACK' },
      comparisonsCount: steps.length,
      swapsCount: 0,
      stats: { comparisons: steps.length, swaps: 0, operations: steps.length }
    });

    return false;
  }

  solve(0, 0);

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}
