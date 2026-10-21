// Matrix & Grid Algorithms Trace Generator
// Implements: Number of Islands (Flood Fill BFS/DFS) and Spiral Matrix Traversal
import { AlgorithmStep } from '../types';

export function generateFloodFillIslandsSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  // 4x5 Binary Grid (1 = Land, 0 = Water)
  const initialGrid: number[][] = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0]
  ];

  const grid = initialGrid.map(row => [...row]);
  const rows = grid.length;
  const cols = grid[0].length;
  let islandCount = 0;

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: 'Grid Island Counter initialized. Grid 4x5: Land cells (1) vs Water (0). An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.',
    codeLine: 1,
    matrixGridState: {
      grid: grid.map(r => [...r]),
      islandCount: 0,
      mode: 'Ready'
    },
    variables: {
      'Grid Dimension': '4 x 5',
      'Islands Discovered': '0',
      'Traversal Method': 'Breadth-First Flood Fill (replaces 1 with 2 as explored)'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

  function bfs(startR: number, startC: number, currentIslandNum: number) {
    const queue: Array<[number, number]> = [[startR, startC]];
    visited[startR][startC] = true;
    grid[startR][startC] = 2; // Visited land

    steps.push({
      stepIndex: steps.length,
      totalSteps: steps.length + 1,
      description: `Discovered new Island #${currentIslandNum} starting at (${startR}, ${startC})! Enqueue coordinate and begin flood fill.`,
      codeLine: 4,
      matrixGridState: {
        grid: grid.map(r => [...r]),
        activeCell: [startR, startC],
        islandCount: currentIslandNum,
        mode: 'New Island Found'
      },
      variables: {
        'Current Cell': `(${startR}, ${startC})`,
        'Island Count': `${currentIslandNum}`,
        'Queue': `[(${startR}, ${startC})]`
      },
      stats: { comparisons: currentIslandNum, swaps: 0, operations: steps.length + 1 }
    });

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;

      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1 && !visited[nr][nc]) {
          visited[nr][nc] = true;
          grid[nr][nc] = 2;
          queue.push([nr, nc]);

          steps.push({
            stepIndex: steps.length,
            totalSteps: steps.length + 1,
            description: `Flooding connected land cell at (${nr}, ${nc}) into Island #${currentIslandNum}.`,
            codeLine: 6,
            matrixGridState: {
              grid: grid.map(row => [...row]),
              activeCell: [nr, nc],
              islandCount: currentIslandNum,
              mode: 'Flooding Island'
            },
            variables: {
              'Flooded': `(${nr}, ${nc})`,
              'Part of Island': `#${currentIslandNum}`,
              'Remaining in Queue': `${queue.length}`
            },
            stats: { comparisons: currentIslandNum, swaps: 0, operations: steps.length + 1 }
          });
        }
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1 && !visited[r][c]) {
        islandCount++;
        bfs(r, c, islandCount);
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: steps.length + 1,
    description: `Grid traversal complete! Total connected islands discovered = ${islandCount}. Time complexity: O(M × N), Space: O(min(M, N)).`,
    codeLine: 9,
    matrixGridState: {
      grid: grid.map(r => [...r]),
      islandCount,
      mode: 'Complete'
    },
    variables: {
      'Final Island Count': `${islandCount}`,
      'Total Cells Processed': `${rows * cols}`,
      'Time Complexity': 'O(M × N)'
    },
    stats: { comparisons: rows * cols, swaps: 0, operations: steps.length + 1 }
  });

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}

export function generateSpiralMatrixSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const matrix: number[][] = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];

  const n = 4;
  let top = 0;
  let bottom = n - 1;
  let left = 0;
  let right = n - 1;
  const result: number[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 1,
    description: 'Spiral Matrix Traversal initialized on 4x4 matrix. Traverses perimeter in clockwise order: Right -> Down -> Left -> Up.',
    codeLine: 1,
    matrixGridState: {
      grid: matrix.map(r => [...r]),
      mode: 'Initial'
    },
    arrayState: [],
    variables: {
      'Top Boundary': '0',
      'Bottom Boundary': '3',
      'Left Boundary': '0',
      'Right Boundary': '3'
    },
    stats: { comparisons: 0, swaps: 0, operations: 1 }
  });

  while (top <= bottom && left <= right) {
    // Traverse Right
    for (let col = left; col <= right; col++) {
      result.push(matrix[top][col]);
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `Moving RIGHT along top row (${top}): Visit cell [${top}, ${col}] = ${matrix[top][col]}.`,
        codeLine: 3,
        matrixGridState: {
          grid: matrix.map(r => [...r]),
          activeCell: [top, col],
          mode: 'Right'
        },
        arrayState: [...result],
        variables: {
          'Direction': 'RIGHT &rarr;',
          'Visited Cell': `matrix[${top}][${col}] = ${matrix[top][col]}`,
          'Result Count': `${result.length}/16`
        },
        stats: { comparisons: result.length, swaps: 0, operations: result.length }
      });
    }
    top++;

    // Traverse Down
    for (let row = top; row <= bottom; row++) {
      result.push(matrix[row][right]);
      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        description: `Moving DOWN along right column (${right}): Visit cell [${row}, ${right}] = ${matrix[row][right]}.`,
        codeLine: 5,
        matrixGridState: {
          grid: matrix.map(r => [...r]),
          activeCell: [row, right],
          mode: 'Down'
        },
        arrayState: [...result],
        variables: {
          'Direction': 'DOWN &darr;',
          'Visited Cell': `matrix[${row}][${right}] = ${matrix[row][right]}`,
          'Result Count': `${result.length}/16`
        },
        stats: { comparisons: result.length, swaps: 0, operations: result.length }
      });
    }
    right--;

    // Traverse Left
    if (top <= bottom) {
      for (let col = right; col >= left; col--) {
        result.push(matrix[bottom][col]);
        steps.push({
          stepIndex: steps.length,
          totalSteps: steps.length + 1,
          description: `Moving LEFT along bottom row (${bottom}): Visit cell [${bottom}, ${col}] = ${matrix[bottom][col]}.`,
          codeLine: 7,
          matrixGridState: {
            grid: matrix.map(r => [...r]),
            activeCell: [bottom, col],
            mode: 'Left'
          },
          arrayState: [...result],
          variables: {
            'Direction': 'LEFT &larr;',
            'Visited Cell': `matrix[${bottom}][${col}] = ${matrix[bottom][col]}`,
            'Result Count': `${result.length}/16`
          },
          stats: { comparisons: result.length, swaps: 0, operations: result.length }
        });
      }
      bottom--;
    }

    // Traverse Up
    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        result.push(matrix[row][left]);
        steps.push({
          stepIndex: steps.length,
          totalSteps: steps.length + 1,
          description: `Moving UP along left column (${left}): Visit cell [${row}, ${left}] = ${matrix[row][left]}.`,
          codeLine: 9,
          matrixGridState: {
            grid: matrix.map(r => [...r]),
            activeCell: [row, left],
            mode: 'Up'
          },
          arrayState: [...result],
          variables: {
            'Direction': 'UP &uarr;',
            'Visited Cell': `matrix[${row}][${left}] = ${matrix[row][left]}`,
            'Result Count': `${result.length}/16`
          },
          stats: { comparisons: result.length, swaps: 0, operations: result.length }
        });
      }
      left++;
    }
  }

  const total = steps.length;
  return steps.map((s, idx) => ({ ...s, stepIndex: idx, totalSteps: total }));
}
